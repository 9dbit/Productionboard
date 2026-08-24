from __future__ import annotations

import base64
import io
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "production-assets"
OUT = PUBLIC / "individual"


def decode_chunks(files: Iterable[Path]) -> Image.Image:
    payload = "".join(path.read_text(encoding="utf-8").replace("\n", "").replace("\r", "") for path in files)
    return Image.open(io.BytesIO(base64.b64decode(payload))).convert("RGB")


def decode_file(source: Path, target: Path) -> None:
    payload = source.read_text(encoding="utf-8").replace("\n", "").replace("\r", "")
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(base64.b64decode(payload))


def atlas_tile(atlas: Image.Image, index: int, cols: int, tile_w: int, tile_h: int) -> Image.Image:
    col, row = index % cols, index // cols
    return atlas.crop((col * tile_w, row * tile_h, (col + 1) * tile_w, (row + 1) * tile_h))


def trim_white(img: Image.Image, threshold: int = 24) -> Image.Image:
    rgb = img.convert("RGB")
    white = Image.new("RGB", rgb.size, "white")
    diff = ImageChops.difference(rgb, white).convert("L")
    mask = diff.point(lambda p: 255 if p > threshold else 0)
    bbox = mask.getbbox()
    if not bbox:
        return rgb
    x0, y0, x1, y1 = bbox
    mx = max(4, int((x1 - x0) * 0.05))
    my = max(4, int((y1 - y0) * 0.05))
    return rgb.crop((max(0, x0 - mx), max(0, y0 - my), min(rgb.width, x1 + mx), min(rgb.height, y1 + my)))


def normalize_character(img: Image.Image) -> Image.Image:
    # Make each locked angle a real standalone image rather than a CSS crop.
    img = trim_white(img)
    img = ImageEnhance.Sharpness(img).enhance(1.35)
    img = ImageEnhance.Contrast(img).enhance(1.04)
    canvas = Image.new("RGB", (600, 800), "white")
    fitted = ImageOps.contain(img, (540, 720), Image.Resampling.LANCZOS)
    x = (canvas.width - fitted.width) // 2
    y = canvas.height - fitted.height - 28
    canvas.paste(fitted, (x, max(18, y)))
    return canvas


def build_characters() -> dict[str, dict[str, Path]]:
    atlas = decode_chunks([PUBLIC / "v4" / f"characters.{i:02d}.b64" for i in range(3)])
    character_slugs = ["arga", "sari", "pak-harun", "bowo", "dimas", "penumpang-tanpa-wajah"]
    # The first six 640x416 atlas tiles are the locked character contact sheets.
    angle_windows = {
        "front": (0.115, 0.265),
        "three-quarter-right": (0.255, 0.395),
        "right-profile": (0.385, 0.525),
        "back": (0.515, 0.655),
        "three-quarter-left": (0.645, 0.785),
        "left-profile": (0.775, 0.915),
    }
    generated: dict[str, dict[str, Path]] = {}
    for idx, slug in enumerate(character_slugs):
        sheet = atlas_tile(atlas, idx, 3, 640, 416)
        generated[slug] = {}
        for angle, (rx0, rx1) in angle_windows.items():
            # Exclude title/labels and keep only the portrait band before trimming.
            crop = sheet.crop((int(sheet.width * rx0), int(sheet.height * 0.18), int(sheet.width * rx1), int(sheet.height * 0.76)))
            final = normalize_character(crop)
            target = OUT / "characters" / slug / f"{angle}.webp"
            target.parent.mkdir(parents=True, exist_ok=True)
            final.save(target, "WEBP", quality=88, method=6)
            generated[slug][angle] = target
    return generated


def transparent_person(path: Path, max_size=(400, 650)) -> Image.Image:
    img = Image.open(path).convert("RGBA")
    img.thumbnail(max_size, Image.Resampling.LANCZOS)
    px = img.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = px[x, y]
            whiteness = min(r, g, b)
            if whiteness > 242:
                px[x, y] = (r, g, b, 0)
            elif whiteness > 220:
                px[x, y] = (r, g, b, int(a * (242 - whiteness) / 22))
    return img


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
        Path("/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


def vertical_base(source: Image.Image) -> Image.Image:
    source = source.convert("RGB")
    background = ImageOps.fit(source, (720, 1280), Image.Resampling.LANCZOS)
    background = background.filter(ImageFilter.GaussianBlur(16))
    background = ImageEnhance.Brightness(background).enhance(0.50)
    foreground = ImageOps.contain(source, (680, 690), Image.Resampling.LANCZOS)
    canvas = background.copy()
    y = (canvas.height - foreground.height) // 2
    canvas.paste(foreground, ((canvas.width - foreground.width) // 2, y))
    # cinematic vignette
    shade = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(shade)
    draw.rectangle((0, 0, 720, 190), fill=(0, 0, 0, 75))
    draw.rectangle((0, 1050, 720, 1280), fill=(0, 0, 0, 95))
    return Image.alpha_composite(canvas.convert("RGBA"), shade).convert("RGB")


def bubble(canvas: Image.Image, text: str, y: int, accent=(214, 45, 55)) -> None:
    draw = ImageDraw.Draw(canvas)
    f = font(36, True)
    box = draw.textbbox((0, 0), text, font=f)
    w = box[2] - box[0] + 54
    h = 76
    x = (canvas.width - w) // 2
    draw.rounded_rectangle((x, y, x + w, y + h), 22, fill=(8, 13, 18), outline=accent, width=3)
    draw.text((x + 27, y + 16), text, font=f, fill="white")


def paste_person(canvas: Image.Image, person_path: Path, x: int, y: int, max_size=(410, 660), opacity=255) -> None:
    person = transparent_person(person_path, max_size=max_size)
    if opacity != 255:
        alpha = person.getchannel("A").point(lambda p: int(p * opacity / 255))
        person.putalpha(alpha)
    canvas_rgba = canvas.convert("RGBA")
    canvas_rgba.alpha_composite(person, (x, y))
    canvas.paste(canvas_rgba.convert("RGB"))


def build_storyboards(chars: dict[str, dict[str, Path]]) -> None:
    sites = decode_chunks([PUBLIC / "v4" / f"sites.{i:02d}.b64" for i in range(6)])
    site = lambda i: atlas_tile(sites, i, 5, 600, 350)
    bases = {
        "city": site(24),
        "car": site(25),
        "pickup": site(15),
        "approach": site(1),
        "core": site(0),
    }
    arga = chars["arga"]["front"]
    arga3 = chars["arga"]["three-quarter-right"]
    sari = chars["sari"]["three-quarter-left"]

    defs = [
        ("SH01", "city", None),
        ("SH02", "car", "arga"),
        ("SH03", "car", "mama"),
        ("SH04", "car", "arga-close"),
        ("SH05", "pickup", None),
        ("SH06", "pickup", "order"),
        ("SH07", "car", "no-address"),
        ("SH08", "car", "accept"),
        ("SH09", "approach", None),
        ("SH10", "approach", "zero-meter"),
        ("SH11", "core", "clock"),
        ("SH12", "car", "mirror-empty"),
        ("SH13", "car", "in-car"),
        ("SH14", "car", "rear-empty"),
        ("SH15", "core", "arga-tense"),
        ("SH16", "car", "sari-mirror"),
    ]
    for shot, base_key, overlay in defs:
        frame = vertical_base(bases[base_key])
        draw = ImageDraw.Draw(frame)
        if overlay == "arga":
            paste_person(frame, arga3, 315, 470, (360, 610))
        elif overlay == "mama":
            bubble(frame, "MAMA • CALLING", 160, (88, 152, 255))
        elif overlay == "arga-close":
            paste_person(frame, arga, 170, 420, (430, 720))
        elif overlay == "order":
            bubble(frame, "SARI  •  Rp287.000", 185)
        elif overlay == "no-address":
            bubble(frame, "DESTINATION  —", 190, (235, 158, 57))
        elif overlay == "accept":
            paste_person(frame, arga3, 310, 475, (350, 590))
            bubble(frame, "ACCEPT ORDER?  03", 170, (235, 158, 57))
        elif overlay == "zero-meter":
            bubble(frame, "PICKUP  0 m", 175, (235, 158, 57))
        elif overlay == "clock":
            bubble(frame, "03:12:58  →  03:13:00", 170)
        elif overlay == "mirror-empty":
            draw.rounded_rectangle((100, 240, 620, 520), 44, outline=(170, 180, 190), width=5, fill=(10, 14, 18))
            draw.text((210, 345), "REAR SEAT • EMPTY", font=font(30, True), fill=(210, 215, 220))
        elif overlay == "in-car":
            bubble(frame, "SARI: Saya sudah di mobil.", 180)
        elif overlay == "rear-empty":
            draw.rounded_rectangle((90, 220, 630, 560), 54, outline=(95, 105, 115), width=4, fill=(7, 10, 13))
            draw.text((218, 370), "EMPTY REAR SEAT", font=font(28, True), fill=(180, 188, 196))
        elif overlay == "arga-tense":
            paste_person(frame, arga, 170, 430, (430, 700))
            bubble(frame, "BANG…", 175)
        elif overlay == "sari-mirror":
            paste_person(frame, sari, 360, 500, (310, 560), opacity=220)
            draw.rounded_rectangle((85, 205, 635, 480), 48, outline=(160, 165, 172), width=5, fill=(5, 7, 10))
            # faint second Sari inside mirror to make the reveal readable
            mirror_sari = transparent_person(sari, (180, 300))
            frame_rgba = frame.convert("RGBA")
            frame_rgba.alpha_composite(mirror_sari, (390, 215))
            frame = frame_rgba.convert("RGB")
        target = OUT / "storyboards" / "EP001" / f"{shot}.webp"
        target.parent.mkdir(parents=True, exist_ok=True)
        frame.save(target, "WEBP", quality=87, method=6)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    # Ensure cover is a normal binary file, never the 11-byte placeholder.
    cover_source = PUBLIC / "real" / "casablanca-cover.webp.b64"
    if cover_source.exists():
        decode_file(cover_source, OUT / "cover" / "casablanca-cover.webp")
    chars = build_characters()
    build_storyboards(chars)
    print("Generated individual production media in", OUT)


if __name__ == "__main__":
    main()

import Link from 'next/link';

export function AssetVisual({ src, alt, downloadable=true, className='' }: { src:string; alt:string; downloadable?:boolean; className?:string }) {
  return (
    <div className={`assetVisual ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" />
      {downloadable && <Link className="assetDownload" href={src} download>Download</Link>}
    </div>
  );
}

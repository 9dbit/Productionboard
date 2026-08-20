import type { Asset, Episode, Scene, Shot } from './types';

export const episodeTitles = [
  'Order Terakhir','Penumpang Bernama Sari','Tujuan Tanpa Alamat','Lewat Terowongan','Jangan Lihat Spion','Klakson Pertama','Klakson Kedua','Klakson Ketiga','Kursi Belakang Kosong','Order yang Tidak Pernah Ada',
  'Bekas Tangan Basah','Foto dari Masa Lalu','03:13','Sari Menelepon Lagi','Penjemputan: 0 Meter','Seseorang di Belakang Mobil','Jangan Menoleh','Pantulan yang Bergerak','Dia Sudah Tahu Rumahmu','Perempuan Berbaju Merah',
  'Foto Tahun 1987','Wajah yang Tidak Menua','Sopir yang Menghilang','Penumpang Terakhirnya','Tiga Kali Klakson','Jangan Berhenti di Casablanca','Kamera 13','Sosok di CCTV','Yang Terlihat Hanya di Pantulan','Sari Bukan Hantunya',
  'Ada Sesuatu di Bawah Jalan','Pintu yang Sudah Ditutup','Lorong di Bawah Casablanca','Nama Pertama','Dua Belas Orang Hilang','Nama Ketiga Belas','ARGA PRATAMA','Tulisan 03:13','Siapa yang Menulis Namaku?','Suara dari Balik Beton',
  'Sari Menangis','Aku Tidak Ingat Mati','Perempuan yang Menjaga Pintu','Jangan Biarkan Dia Keluar','Yang Naik Bukan Sari','Penumpang Tanpa Wajah','Kursi yang Tertekan Sendiri','Ada Napas di Belakang','Jangan Matikan Mesin','Dia Sudah Duduk di Sana',
  'Mobil yang Pulang Sendiri','Arga yang Lain','Dua Wajah dalam Satu Rekaman','Siapa yang Sedang Mengemudi?','Aku Melihat Diriku Sendiri','Rekaman dari Besok','Kecelakaan yang Belum Terjadi','Tanggal Kematian Arga','Tiga Hari Lagi','03:13 Semakin Dekat',
  'Malam Sebelum Hilang','Sari Tidak Mau Keluar','Jangan Buka Pintu Belakang','Suara dari Bagasi','Sesuatu Mengetuk dari Dalam','Tidak Ada Tubuh di Bagasi','Tapi Ada Rambut','Casablanca Memanggil','Pintu Bawah Tanah Terbuka','Yang Selama Ini Dikunci',
  'Sari Mengingat Semuanya','Malam Pertama','Sebelum Terowongan Dibangun','Yang Terkubur di Bawah Casablanca','Bukan Satu Arwah','Klakson dari Dalam Terowongan','Jangan Biarkan Mereka Bersandar','Order Terakhir Arga','Penumpang: ARGA','Jangan Terima Order Pukul 03:13'
];

export const assets: Asset[] = [
  { id:'CHR-ARGA-01', name:'Arga Pratama', kind:'CHARACTER', url:'/seed/characters/arga.svg', description:'Face lock Arga, 29 tahun, driver online.', status:'LOCKED' },
  { id:'CHR-SARI-01', name:'Sari', kind:'CHARACTER', url:'/seed/characters/sari.svg', description:'Face lock Sari, ±27 tahun, maroon wardrobe.', status:'LOCKED' },
  { id:'VEH-ARGA-01', name:'Mobil Arga', kind:'VEHICLE', url:'/seed/environments/car-interior.svg', description:'Hero vehicle + interior lock.', status:'LOCKED' },
  { id:'ENV-025-A', name:'Kuningan / City Transition', kind:'ENVIRONMENT', siteId:'SITE-025', url:'/seed/environments/kuningan.svg', description:'Jakarta night transition corridor.', status:'LOCKED' },
  { id:'ENV-016-A', name:'Lobby / Pickup Zone', kind:'ENVIRONMENT', siteId:'SITE-016', url:'/seed/environments/pickup-zone.svg', description:'Late-night office pickup zone.', status:'LOCKED' },
  { id:'ENV-001-A', name:'Casablanca Approach', kind:'ENVIRONMENT', siteId:'SITE-001', url:'/seed/environments/casablanca-approach.svg', description:'Approach menuju core Casablanca.', status:'LOCKED' },
  { id:'ENV-001-B', name:'Casablanca Night Core', kind:'ENVIRONMENT', siteId:'SITE-001', url:'/seed/environments/casablanca-core.svg', description:'Underpass / tunnel night reference.', status:'LOCKED' },
  { id:'PROP-PHONE-01', name:'Phone UI Arga', kind:'PROP', url:'/seed/props/phone.svg', description:'Ride-hailing phone UI reference.', status:'LOCKED' },
  { id:'PROP-MIRROR-01', name:'Rear-view Mirror', kind:'PROP', url:'/seed/props/mirror.svg', description:'Mirror geometry reference.', status:'LOCKED' },
];

const rawShots: Omit<Shot,'thumbnailUrl'|'prompt'|'continuity'>[] = [
  {id:'EP001-SC01-SH01',sceneId:'EP001-SC01',timecode:'00:00–00:04',storyClock:'02:46:04',duration:4,camera:'WS / tracking',action:'Jakarta malam; mobil Arga bergerak di Kuningan.',audio:'Traffic + drizzle',horror:'H0',status:'LOCKED',locationId:'SITE-025',environmentId:'ENV-025-A',characterIds:['CHR-ARGA-01'],assetIds:['ENV-025-A','VEH-ARGA-01']},
  {id:'EP001-SC01-SH02',sceneId:'EP001-SC01',timecode:'00:04–00:08',storyClock:'02:46:08',duration:4,camera:'MCU / interior',action:'Arga menyetir santai; kehidupan masih normal.',audio:'Radio ringan',horror:'H0',status:'LOCKED',locationId:'SET-CAR',environmentId:'VEH-ARGA-01',characterIds:['CHR-ARGA-01'],assetIds:['CHR-ARGA-01','VEH-ARGA-01']},
  {id:'EP001-SC02-SH01',sceneId:'EP001-SC02',timecode:'00:08–00:15',storyClock:'02:47:02',duration:7,camera:'OTS dashboard',action:'Panggilan Mama masuk lewat speaker.',audio:'Phone ring + dialog',horror:'H0',status:'REVIEW',locationId:'SET-CAR',environmentId:'VEH-ARGA-01',characterIds:['CHR-ARGA-01'],assetIds:['CHR-ARGA-01','VEH-ARGA-01','PROP-PHONE-01']},
  {id:'EP001-SC02-SH02',sceneId:'EP001-SC02',timecode:'00:15–00:22',storyClock:'02:47:09',duration:7,camera:'CU Arga',action:'Arga bereaksi pada kalimat “jangan pulang terlalu pagi”.',audio:'Dialog',horror:'H0',status:'REVIEW',locationId:'SET-CAR',environmentId:'VEH-ARGA-01',characterIds:['CHR-ARGA-01'],assetIds:['CHR-ARGA-01','VEH-ARGA-01']},
  {id:'EP001-SC03-SH01',sceneId:'EP001-SC03',timecode:'00:22–00:28',storyClock:'03:11:41',duration:6,camera:'MS / static',action:'Arga berhenti di pickup zone lalu menekan OFFLINE.',audio:'City ambience',horror:'H0',status:'REVIEW',locationId:'SITE-016',environmentId:'ENV-016-A',characterIds:['CHR-ARGA-01'],assetIds:['ENV-016-A','VEH-ARGA-01']},
  {id:'EP001-SC03-SH02',sceneId:'EP001-SC03',timecode:'00:28–00:35',storyClock:'03:11:48',duration:7,camera:'Insert / phone',action:'Aplikasi aktif sendiri; order SARI Rp287.000 muncul.',audio:'TING',horror:'H1',status:'GENERATED',locationId:'SET-CAR',environmentId:'VEH-ARGA-01',characterIds:['CHR-ARGA-01'],assetIds:['PROP-PHONE-01','VEH-ARGA-01']},
  {id:'EP001-SC04-SH01',sceneId:'EP001-SC04',timecode:'00:35–00:41',storyClock:'03:12:08',duration:6,camera:'OTS phone',action:'Detail destination kosong.',audio:'UI click',horror:'H1',status:'GENERATED',locationId:'SET-CAR',environmentId:'VEH-ARGA-01',characterIds:['CHR-ARGA-01'],assetIds:['PROP-PHONE-01','VEH-ARGA-01']},
  {id:'EP001-SC04-SH02',sceneId:'EP001-SC04',timecode:'00:41–00:48',storyClock:'03:12:15',duration:7,camera:'MCU Arga',action:'Countdown hampir habis; Arga menerima order.',audio:'Accept click',horror:'H1',status:'DRAFT',locationId:'SET-CAR',environmentId:'VEH-ARGA-01',characterIds:['CHR-ARGA-01'],assetIds:['CHR-ARGA-01','VEH-ARGA-01','PROP-PHONE-01']},
  {id:'EP001-SC05-SH01',sceneId:'EP001-SC05',timecode:'00:48–00:55',storyClock:'03:12:34',duration:7,camera:'Vehicle tracking',action:'Mobil masuk approach Casablanca.',audio:'GPS guidance',horror:'H1',status:'DRAFT',locationId:'SITE-001',environmentId:'ENV-001-A',characterIds:['CHR-ARGA-01'],assetIds:['ENV-001-A','VEH-ARGA-01']},
  {id:'EP001-SC05-SH02',sceneId:'EP001-SC05',timecode:'00:55–01:02',storyClock:'03:12:48',duration:7,camera:'WS / stop',action:'GPS menunjukkan 0 meter; jalan kosong.',audio:'GPS arrived',horror:'H2',status:'DRAFT',locationId:'SITE-001',environmentId:'ENV-001-A',characterIds:['CHR-ARGA-01'],assetIds:['ENV-001-A','VEH-ARGA-01']},
  {id:'EP001-SC06-SH01',sceneId:'EP001-SC06',timecode:'01:02–01:07',storyClock:'03:12:58',duration:5,camera:'ECU clock',action:'Jam dashboard berubah tepat ke 03:13:00.',audio:'City fade',horror:'H2',status:'DRAFT',locationId:'SITE-001',environmentId:'ENV-001-B',characterIds:['CHR-ARGA-01'],assetIds:['ENV-001-B','VEH-ARGA-01']},
  {id:'EP001-SC06-SH02',sceneId:'EP001-SC06',timecode:'01:07–01:12',storyClock:'03:13:03',duration:5,camera:'Mirror + CU',action:'Arga memanggil “Mbak Sari?”; spion kosong.',audio:'Silence',horror:'H2',status:'DRAFT',locationId:'SET-CAR',environmentId:'VEH-ARGA-01',characterIds:['CHR-ARGA-01'],assetIds:['CHR-ARGA-01','PROP-MIRROR-01','VEH-ARGA-01']},
  {id:'EP001-SC07-SH01',sceneId:'EP001-SC07',timecode:'01:12–01:16',storyClock:'03:13:05',duration:4,camera:'Insert / phone',action:'Pesan SARI: “Saya sudah di mobil.”',audio:'TING',horror:'H2',status:'DRAFT',locationId:'SET-CAR',environmentId:'VEH-ARGA-01',characterIds:['CHR-ARGA-01'],assetIds:['PROP-PHONE-01','VEH-ARGA-01']},
  {id:'EP001-SC07-SH02',sceneId:'EP001-SC07',timecode:'01:16–01:20',storyClock:'03:13:09',duration:4,camera:'Rear-view mirror',action:'Kursi belakang terlihat kosong tetapi terasa terisi.',audio:'Breathing',horror:'H2',status:'DRAFT',locationId:'SET-CAR',environmentId:'VEH-ARGA-01',characterIds:['CHR-ARGA-01'],assetIds:['PROP-MIRROR-01','VEH-ARGA-01']},
  {id:'EP001-SC08-SH01',sceneId:'EP001-SC08',timecode:'01:20–01:24',storyClock:'03:13:12',duration:4,camera:'CU Arga / O.S.',action:'Suara Sari terdengar dari belakang: “Bang…”.',audio:'Sari voice',horror:'H3',status:'DRAFT',locationId:'SET-CAR',environmentId:'VEH-ARGA-01',characterIds:['CHR-ARGA-01','CHR-SARI-01'],assetIds:['CHR-ARGA-01','VEH-ARGA-01']},
  {id:'EP001-SC08-SH02',sceneId:'EP001-SC08',timecode:'01:24–01:28',storyClock:'03:13:16',duration:4,camera:'Slow push mirror',action:'Sari muncul sesaat di spion lalu cut black.',audio:'Whisper + sting',horror:'H3',status:'DRAFT',locationId:'SITE-001',environmentId:'ENV-001-B',characterIds:['CHR-ARGA-01','CHR-SARI-01'],assetIds:['CHR-SARI-01','PROP-MIRROR-01','VEH-ARGA-01','ENV-001-B']},
];

const promptByIndex = [
  'Realistic Kuningan Jakarta night after light rain; wet asphalt, office towers, Indonesian traffic; ride-hailing car moves through frame; vertical 9:16 wide tracking; normal city mood; no supernatural elements.',
  'Locked Arga inside locked car interior; tired but relaxed Indonesian driver in black jacket; medium close shot, dashboard glow and wet Jakarta reflections; H0.',
  'Same locked car and Arga; incoming call from Mama on speaker; over-shoulder dashboard composition; warm natural dialogue scene; no horror.',
  'Close-up locked Arga face; subtle smile fades after Mama says jangan pulang terlalu pagi; realistic dashboard light; no ghost.',
  'Locked car stopped at modern Kuningan office pickup zone; wet pavement and glass lobby; Arga taps OFFLINE; H0.',
  'Mounted phone insert; app activates by itself and displays SARI, 5.0, Rp287.000; rack focus from Arga to screen; restrained anomaly; H1.',
  'Locked car interior; destination field is blank; Arga is confused, not frightened; same dashboard and phone holder; H1.',
  'Locked Arga hesitates while countdown nearly expires, then accepts high-fare order; dashboard and wardrobe remain identical; H1.',
  'Same locked car approaching realistic Casablanca underpass at night; damp Jakarta road, concrete walls, traffic thinning; vehicle-mounted tracking; H1.',
  'Car stops near Casablanca; pickup distance shows 0 meters; environment empty but realistic; no ghost; H2.',
  'Extreme close-up dashboard clock changing 03:12:58 to 03:13:00; city ambience disappears exactly at 03:13; static camera; H2.',
  'Locked Arga and rear-view mirror; Arga softly asks Mbak Sari?; mirror shows empty rear seat; tunnel reflections and absolute silence; H2.',
  'Phone insert; message from SARI reads Saya sudah di mobil.; Arga freezes before cancel button; subtle screen glow; H2.',
  'Rear-view mirror hero shot; locked empty rear seat; slow micro push; rain reflections; space feels occupied although nothing is visible; H2.',
  'Locked Arga face, frozen and facing forward; unseen female voice from rear says Bang…; do not show Sari; restrained dread; H3.',
  'Same locked car at Casablanca 03:13; slow push to rear-view mirror; Sari appears only in mirror for a fraction, long black hair, dark maroon clothing, mostly human-looking face obscured by shadow; cut black; H3.'
];

const continuity = 'Use locked Arga face, locked vehicle interior, Indonesian right-hand-drive layout, wet-road continuity, and preserve previous/next shot state.';
const shots: Shot[] = rawShots.map((s, i) => ({...s, thumbnailUrl:`/seed/ep001/sh${String(i+1).padStart(2,'0')}.svg`, prompt:promptByIndex[i], continuity}));

const sceneMeta = [
  ['EP001-SC01','Jakarta Masih Hidup','00:00–00:08','02:46','SITE-025','ENV-025-A','Establish Jakarta malam dan Arga sebagai driver normal.','H0'],
  ['EP001-SC02','Telepon dari Rumah','00:08–00:22','02:47','SET-CAR','VEH-ARGA-01','Normal life, Mama, dan janji Arga akan pulang.','H0'],
  ['EP001-SC03','Order Terakhir','00:22–00:35','03:11','SITE-016','ENV-016-A','Order Sari muncul setelah aplikasi dimatikan.','H1'],
  ['EP001-SC04','Tujuan Kosong','00:35–00:48','03:12:10','SET-CAR','VEH-ARGA-01','Destination kosong; Arga menerima order karena tarif tinggi.','H1'],
  ['EP001-SC05','Pickup 0 Meter','00:48–01:02','03:12:35','SITE-001','ENV-001-A','GPS menyatakan Arga tiba tetapi tidak ada siapa-siapa.','H2'],
  ['EP001-SC06','Jam 03:13','01:02–01:12','03:12:58→03:13','SITE-001','ENV-001-B','Signature time aktif; suara kota hilang.','H2'],
  ['EP001-SC07','Saya Sudah di Mobil','01:12–01:20','03:13:05','SET-CAR','VEH-ARGA-01','Pesan Sari membalik asumsi penumpang sudah di dalam.','H2'],
  ['EP001-SC08','Jangan Lihat Spion','01:20–01:28','03:13:12','SITE-001','ENV-001-B','Sari terdengar lalu muncul singkat di spion.','H3'],
] as const;

export const ep001Scenes: Scene[] = sceneMeta.map(([id,title,timecode,storyClock,locationId,environmentId,objective,horror]) => ({
  id,title,timecode,storyClock,locationId,environmentId,objective,characters:id==='EP001-SC08'?['Arga','Sari']:['Arga'],horror,shots:shots.filter(s=>s.sceneId===id)
}));

export const episodes: Episode[] = episodeTitles.map((title,index) => {
  const number=index+1;
  const id=`EP${String(number).padStart(3,'0')}`;
  if(number===1) return { id, number, title, duration:88, status:'PRODUCTION', progress:44, mysteryQuestion:'Siapa Sari dan mengapa pickup distance 0 meter?', reveal:'Ada suara perempuan di kursi belakang.', cliffhanger:'Sari muncul sepersekian detik di spion.', scenes:ep001Scenes };
  return { id, number, title, duration:90, status:number<=10?'SCRIPT':'PLANNING', progress:0, scenes:[] };
});

export const ep001 = episodes[0];
export const allShots = ep001Scenes.flatMap(scene=>scene.shots);
export const getEpisode = (id:string) => episodes.find(e=>e.id===id);
export const getShot = (id:string) => allShots.find(s=>s.id===id);
export const getAsset = (id:string) => assets.find(a=>a.id===id);

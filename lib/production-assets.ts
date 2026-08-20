export type AtlasTile = {
  source:string;
  mime:'image/avif';
  col:number;
  row:number;
  cols:number;
  rows:number;
  tileWidth:number;
  tileHeight:number;
  downloadName?:string;
};

export type ProductionAsset = {
  id:string;
  name:string;
  kind:'CHARACTER'|'ENVIRONMENT'|'VEHICLE'|'REFERENCE';
  status:'LOCKED'|'REFERENCE'|'REVIEW';
  description:string;
  atlas:AtlasTile;
  siteId?:string;
  episodeIds?:string[];
  sceneIds?:string[];
  shotIds?:string[];
  angleCoverage?:string[];
  storyUse?:string;
};

const CHAR_SOURCE='/production-assets/characters-atlas.avif.b64';
const SITE_SOURCE='/production-assets/sites-atlas.avif.b64';
const STORY_SOURCE='/production-assets/storyboards-atlas.avif.b64';

const charTile=(index:number,name:string):AtlasTile=>({source:CHAR_SOURCE,mime:'image/avif',col:index%3,row:Math.floor(index/3),cols:3,rows:3,tileWidth:800,tileHeight:520,downloadName:name});
const siteTile=(index:number,name:string):AtlasTile=>({source:SITE_SOURCE,mime:'image/avif',col:index%4,row:Math.floor(index/4),cols:4,rows:6,tileWidth:720,tileHeight:420,downloadName:name});
const sixAngles=['FRONT','BACK','LEFT PROFILE','RIGHT PROFILE','3/4 LEFT','3/4 RIGHT'];

export const productionAssets:ProductionAsset[]=[
  {id:'CHR-ARGA-01',name:'Arga Pratama',kind:'CHARACTER',status:'LOCKED',description:'Master character lock Arga, driver online Jakarta berusia 29 tahun. Sheet memuat front, profile, 3/4 dan back reference.',atlas:charTile(0,'CHR-ARGA-01.png'),episodeIds:['EP001'],sceneIds:['EP001-SC01','EP001-SC02','EP001-SC03','EP001-SC04','EP001-SC05','EP001-SC06','EP001-SC07','EP001-SC08'],angleCoverage:sixAngles,storyUse:'Tokoh utama; wajib menjadi face lock untuk seluruh shot yang menampilkan Arga.'},
  {id:'CHR-SARI-01',name:'Sari',kind:'CHARACTER',status:'LOCKED',description:'Master character lock Sari, perempuan misterius ±27 tahun dengan wardrobe maroon dan rambut hitam panjang.',atlas:charTile(1,'CHR-SARI-01.png'),episodeIds:['EP001'],sceneIds:['EP001-SC07','EP001-SC08'],shotIds:['EP001-SC08-SH01','EP001-SC08-SH02'],angleCoverage:sixAngles,storyUse:'Reveal supernatural harus tetap memakai identitas wajah dan silhouette yang sama.'},
  {id:'CHR-HARUN-01',name:'Pak Harun',kind:'CHARACTER',status:'LOCKED',description:'Mantan sopir taksi dan sumber sejarah lama Casablanca.',atlas:charTile(2,'CHR-HARUN-01.png'),episodeIds:['EP021–EP040'],angleCoverage:sixAngles,storyUse:'Archive interview, sejarah Santoso, dan origin clues.'},
  {id:'CHR-BOWO-01',name:'Bowo',kind:'CHARACTER',status:'LOCKED',description:'Teman sesama driver Arga dan anchor kehidupan normal.',atlas:charTile(3,'CHR-BOWO-01.png'),episodeIds:['EP001–EP020'],angleCoverage:sixAngles,storyUse:'Warung driver, rumor Casablanca, dan investigasi awal.'},
  {id:'CHR-DIMAS-01',name:'Dimas',kind:'CHARACTER',status:'LOCKED',description:'Teknisi CCTV / security yang membuka bukti rekaman 03:13.',atlas:charTile(4,'CHR-DIMAS-01.png'),episodeIds:['EP021–EP040'],angleCoverage:sixAngles,storyUse:'CCTV room, freeze frame, blueprint dan evidence chain.'},
  {id:'CHR-ENTITY-01',name:'Penumpang Tanpa Wajah',kind:'CHARACTER',status:'LOCKED',description:'Entitas supernatural antagonistik. Dipisahkan dari identitas Sari agar AI tidak mencampur keduanya.',atlas:charTile(5,'CHR-ENTITY-01.png'),episodeIds:['EP031–EP080'],angleCoverage:sixAngles,storyUse:'Myth arc, lorong bawah Casablanca dan late-series threat.'},
  {id:'CHR-SANTOSO-REF',name:'Santoso — Historical Reference',kind:'REFERENCE',status:'REFERENCE',description:'Character sheet Santoso, ayah Pak Harun dan pengemudi dari sejarah lama kasus Casablanca.',atlas:charTile(6,'CHR-SANTOSO-REF.png'),episodeIds:['EP021–EP040'],storyUse:'Flashback, foto lama dan origin investigation.'},
  {id:'CHR-SARI-TURN',name:'Sari Turnaround Sheet',kind:'REFERENCE',status:'REFERENCE',description:'Turnaround tambahan Sari untuk memperkuat silhouette dan continuity antar angle.',atlas:charTile(7,'CHR-SARI-TURN.png'),episodeIds:['EP001–EP080'],storyUse:'Reference tambahan untuk AI generation ketika sudut tubuh berubah.'},
  {id:'CHR-MASTER-SHEET',name:'Casablanca Character Master Sheet',kind:'REFERENCE',status:'REFERENCE',description:'Master contact sheet seluruh karakter utama 03:13 Casablanca.',atlas:charTile(8,'CHR-MASTER-SHEET.png'),episodeIds:['EP001–EP080'],storyUse:'Quick visual bible untuk editor dan AI operator.'},

  {id:'ENV-001-A',name:'Casablanca Approach',kind:'ENVIRONMENT',status:'LOCKED',siteId:'SITE-001',description:'Approach menuju core Casablanca; underpass kota realistis, jalan basah dan traffic mulai menipis.',atlas:siteTile(0,'ENV-001-A.png'),episodeIds:['EP001–EP010'],sceneIds:['EP001-SC05'],shotIds:['EP001-SC05-SH01','EP001-SC05-SH02'],storyUse:'Order terakhir, pickup 0 meter dan entry menuju signature location.'},
  {id:'ENV-001-B',name:'Casablanca Night Core — Warm',kind:'ENVIRONMENT',status:'LOCKED',siteId:'SITE-001',description:'Night core dengan sodium light dan depth claustrophobic; tetap Jakarta nyata, bukan tunnel fantasi.',atlas:siteTile(1,'ENV-001-B.png'),episodeIds:['EP001–EP080'],sceneIds:['EP001-SC06','EP001-SC08'],shotIds:['EP001-SC06-SH01','EP001-SC08-SH02'],storyUse:'03:13 event, mirror motif dan recurring Casablanca core.'},
  {id:'ENV-001-C',name:'Casablanca Tunnel Mood — Cold',kind:'ENVIRONMENT',status:'REFERENCE',siteId:'SITE-001',description:'Cold monochrome tunnel mood untuk alternatif visual continuity dan episode escalation.',atlas:siteTile(2,'ENV-001-C.png'),episodeIds:['EP005–EP040'],storyUse:'Mood reference, bukan klaim dokumentasi lokasi spesifik.'},
  {id:'ENV-002-A',name:'Kuningan Business District',kind:'ENVIRONMENT',status:'LOCKED',siteId:'SITE-002',description:'Modern Jakarta business district; zona normal life Arga sebelum masuk Casablanca.',atlas:siteTile(3,'ENV-002-A.png'),episodeIds:['EP001–EP010','EP041–EP050'],storyUse:'Waiting order, office district, city orientation.'},
  {id:'ENV-003-A',name:'Rasuna Said / Setiabudi',kind:'ENVIRONMENT',status:'REFERENCE',siteId:'SITE-003',description:'Koridor perkantoran, kedutaan dan late-night city traffic sebagai jembatan ke Casablanca.',atlas:siteTile(4,'ENV-003-A.png'),episodeIds:['EP001–EP010'],storyUse:'Driving montage, normal life dan geographic continuity.'},
  {id:'ENV-004-A',name:'Bundaran HI',kind:'ENVIRONMENT',status:'REFERENCE',siteId:'SITE-004',description:'Anchor Jakarta paling cepat dikenali: fountain, skyline, billboard dan traffic kota.',atlas:siteTile(5,'ENV-004-A.png'),episodeIds:['EP001–EP003','EP018–EP025','EP071–EP080'],storyUse:'Normal city pulse dan later public-space anomalies.'},
  {id:'ENV-005-A',name:'M.H. Thamrin',kind:'ENVIRONMENT',status:'REFERENCE',siteId:'SITE-005',description:'Urban night anchor untuk menunjukkan teror mulai mengikuti Arga keluar dari Casablanca.',atlas:siteTile(6,'ENV-005-A.png'),episodeIds:['EP011–EP020','EP051–EP060'],storyUse:'Reflections, city billboards dan identity fracture.'},
  {id:'ENV-006-A',name:'Stasiun Manggarai',kind:'ENVIRONMENT',status:'REFERENCE',siteId:'SITE-006',description:'Transit node ramai untuk crowd horror, CCTV grid dan pencarian sosok dalam kerumunan.',atlas:siteTile(7,'ENV-006-A.png'),episodeIds:['EP021–EP030','EP061–EP070'],storyUse:'Crowd anxiety, CCTV dan pursuit without monster reveal.'},
  {id:'ENV-007-A',name:'Menteng / Taman Menteng',kind:'ENVIRONMENT',status:'REFERENCE',siteId:'SITE-007',description:'Zona lebih tenang dan residential untuk interview Pak Harun serta archive clues.',atlas:siteTile(8,'ENV-007-A.png'),episodeIds:['EP021–EP030'],storyUse:'Investigation, old Jakarta texture dan calm-before-horror beats.'},
  {id:'ENV-008-A',name:'Monas / Medan Merdeka',kind:'ENVIRONMENT',status:'REFERENCE',siteId:'SITE-008',description:'Landmark establishing untuk orientasi kota, flashback berita dan final city-wide omen.',atlas:siteTile(9,'ENV-008-A.png'),episodeIds:['EP001–EP003','EP071–EP080'],storyUse:'Gunakan singkat sebagai city anchor, bukan pusat mitologi.'},
  {id:'ENV-009-A',name:'Dukuh Atas / Sudirman',kind:'ENVIRONMENT',status:'REFERENCE',siteId:'SITE-009',description:'Connector visual pusat kota menuju Kuningan dan Casablanca.',atlas:siteTile(10,'ENV-009-A.png'),episodeIds:['EP051–EP060'],storyUse:'Driving transition, phone call dan proof that Arga is far from Casablanca.'},
  {id:'ENV-015-A',name:'Parkiran Gedung Kuningan',kind:'ENVIRONMENT',status:'LOCKED',siteId:'SITE-015',description:'Parkiran gedung malam hari untuk Arga menunggu order, ngobrol dengan Bowo dan kehidupan normal.',atlas:siteTile(11,'ENV-015-A.png'),episodeIds:['EP001–EP010'],storyUse:'Support normal-life location.'},
  {id:'ENV-016-A',name:'Lobby / Pickup Zone Gedung',kind:'ENVIRONMENT',status:'LOCKED',siteId:'SITE-016',description:'Pickup zone gedung Kuningan; keluar-masuk penumpang, smartphone notification dan titik order terakhir.',atlas:siteTile(12,'ENV-016-A.png'),episodeIds:['EP001'],sceneIds:['EP001-SC03'],shotIds:['EP001-SC03-SH01'],storyUse:'Trigger order Sari.'},
  {id:'ENV-017-A',name:'SPBU 24 Jam',kind:'ENVIRONMENT',status:'REFERENCE',siteId:'SITE-017',description:'Isi bensin, rehat dan telepon rumah; normal life tepat sebelum gangguan.',atlas:siteTile(13,'ENV-017-A.png'),episodeIds:['EP001–EP010'],storyUse:'Normal-life support site.'},
  {id:'ENV-018-A',name:'Minimarket 24 Jam',kind:'ENVIRONMENT',status:'REFERENCE',siteId:'SITE-018',description:'Tempat beli kopi / air mineral dan peluang melihat anomali pantulan pertama.',atlas:siteTile(14,'ENV-018-A.png'),episodeIds:['EP001–EP020'],storyUse:'Reflection motif in an everyday Jakarta location.'},
  {id:'ENV-019-A',name:'Rumah / Kos / Apartemen Arga',kind:'ENVIRONMENT',status:'REFERENCE',siteId:'SITE-019',description:'Safe-space Arga: telepon Mama, pantulan layar dan rasa aman yang perlahan pecah.',atlas:siteTile(15,'ENV-019-A.png'),episodeIds:['EP041–EP050'],storyUse:'Home-route horror dan private-space escalation.'},
  {id:'ENV-020-A',name:'Meeting Point Driver / Warung Kopi',kind:'ENVIRONMENT',status:'REFERENCE',siteId:'SITE-020',description:'Interaksi Arga–Bowo, gosip driver dan rumor kasus Casablanca.',atlas:siteTile(16,'ENV-020-A.png'),episodeIds:['EP001–EP020'],storyUse:'Exposition harus terasa seperti obrolan driver biasa.'},
  {id:'ENV-021-A',name:'Rumah / Warung Pak Harun',kind:'ENVIRONMENT',status:'REFERENCE',siteId:'SITE-021',description:'Lokasi sejarah lama Casablanca, foto, arsip dan cerita tentang Santoso.',atlas:siteTile(17,'ENV-021-A.png'),episodeIds:['EP021–EP030'],storyUse:'Primary investigation location for Pak Harun.'},
  {id:'ENV-022-A',name:'Ruang CCTV / Security Dimas',kind:'ENVIRONMENT',status:'REFERENCE',siteId:'SITE-022',description:'Ruang monitoring untuk freeze frame, timecode 03:13 dan bukti visual.',atlas:siteTile(18,'ENV-022-A.png'),episodeIds:['EP021–EP040'],storyUse:'Evidence and surveillance scenes.'},
  {id:'ENV-023-A',name:'Basement / Loading Dock',kind:'ENVIRONMENT',status:'REFERENCE',siteId:'SITE-023',description:'Transisi gelap gedung; cocok untuk kemunculan Sari singkat di belakang Arga.',atlas:siteTile(19,'ENV-023-A.png'),episodeIds:['EP021–EP050'],storyUse:'Thriller transition site.'},
  {id:'ENV-024-A',name:'Lorong Servis / Pintu Beton Bawah Casablanca',kind:'ENVIRONMENT',status:'REFERENCE',siteId:'SITE-024',description:'Akses mitologi utama: origin reveal, 13 nama dan Penumpang Tanpa Wajah.',atlas:siteTile(20,'ENV-024-A.png'),episodeIds:['EP031–EP080'],storyUse:'Myth / origin location; supernatural details are fictional.'},
  {id:'ENV-025-A',name:'Jalan Servis / Flyover / Skyline Transition',kind:'ENVIRONMENT',status:'LOCKED',siteId:'SITE-025',description:'Transition road Jakarta untuk menjaga geography antara Kuningan, Sudirman dan Casablanca.',atlas:siteTile(21,'ENV-025-A.png'),episodeIds:['EP001–EP080'],sceneIds:['EP001-SC01'],shotIds:['EP001-SC01-SH01'],storyUse:'Driving montage and scene transitions.'},
  {id:'VEH-ARGA-01',name:'Interior Mobil Arga',kind:'VEHICLE',status:'LOCKED',siteId:'SET-CAR',description:'Hero vehicle / recurring set: dashboard, phone holder, rear-view mirror, jok dan steering wheel harus konsisten.',atlas:siteTile(22,'VEH-ARGA-01.png'),episodeIds:['EP001–EP080'],sceneIds:['EP001-SC02','EP001-SC04','EP001-SC06','EP001-SC07','EP001-SC08'],storyUse:'Recurring production set dan motif rear-view mirror.'}
];

export const productionAssetById=(id:string)=>productionAssets.find(asset=>asset.id===id);

const storyboardOrder=[
  'EP001-SC01-SH01','EP001-SC01-SH02','EP001-SC02-SH01','EP001-SC02-SH02',
  'EP001-SC03-SH01','EP001-SC03-SH02','EP001-SC04-SH01','EP001-SC04-SH02',
  'EP001-SC05-SH01','EP001-SC05-SH02','EP001-SC06-SH01','EP001-SC06-SH02',
  'EP001-SC07-SH01','EP001-SC07-SH02','EP001-SC08-SH01','EP001-SC08-SH02'
];

export function storyboardTileForShot(shotId:string):AtlasTile|undefined{
  const index=storyboardOrder.indexOf(shotId);
  if(index<0) return undefined;
  return {source:STORY_SOURCE,mime:'image/avif',col:index%4,row:Math.floor(index/4),cols:4,rows:4,tileWidth:760,tileHeight:400,downloadName:`${shotId}.png`};
}

export const productionAssetStats={
  characters:productionAssets.filter(a=>a.kind==='CHARACTER').length,
  environments:productionAssets.filter(a=>a.kind==='ENVIRONMENT').length,
  vehicles:productionAssets.filter(a=>a.kind==='VEHICLE').length,
  references:productionAssets.filter(a=>a.kind==='REFERENCE').length,
  total:productionAssets.length
};

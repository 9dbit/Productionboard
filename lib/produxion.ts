export const platformMovies = [
  {
    slug:'casablanca',
    title:'03:13 CASABLANCA',
    kicker:'AI HORROR VERTICAL SERIES',
    cover:'/api/production-media/cover',
    status:'IN PRODUCTION',
    episodes:80,
    synopsis:'Arga, seorang driver online Jakarta, menerima order terakhir dari penumpang bernama Sari. Order itu membawanya ke koridor Casablanca pada pukul 03:13, ketika GPS, pantulan, rekaman CCTV, dan ruang kota mulai berhenti mengikuti logika. Semakin Arga berusaha menjauh, semakin jelas bahwa Sari bukan satu-satunya sesuatu yang menunggu di balik kursi belakang.',
    href:'/movies/casablanca'
  },
  {slug:'potret',title:'POTRET',kicker:'SUPERNATURAL THRILLER',cover:'/seed/movies/potret.svg',status:'DEVELOPMENT',episodes:80,synopsis:'Sebuah kamera menangkap sosok yang tidak dapat dilihat mata biasa.',href:'#'},
  {slug:'purnama',title:'PURNAMA',kicker:'SELAT SUNDA HORROR',cover:'/seed/movies/purnama.svg',status:'DEVELOPMENT',episodes:80,synopsis:'Kapal yang pernah karam muncul kembali ketika purnama, membawa sesuatu yang seharusnya tetap tenggelam.',href:'#'},
  {slug:'manggarai',title:'KERETA HANTU MANGGARAI',kicker:'URBAN HORROR',cover:'/seed/movies/manggarai.svg',status:'CONCEPT',episodes:80,synopsis:'Kereta misterius melintas setelah jadwal terakhir dan membawa penumpang yang tidak tercatat.',href:'#'}
] as const;

export const casablancaMovie = platformMovies[0];

export const movieTabs = [
  ['Dashboard','/movies/casablanca'],
  ['Script','/movies/casablanca/script'],
  ['Episodes','/movies/casablanca/episodes'],
  ['Assets','/movies/casablanca/assets']
] as const;

export type ScriptScene = {
  sceneId:string; title:string; timecode:string; storyClock:string; siteId:string; siteName:string; environmentId:string;
  characters:string[]; purpose:string; action:string; dialogue:{speaker:string;text:string;note?:string}[];
  camera:string; audio:string; props:string[]; continuity:string; horror:string; productionNote:string;
};

export const ep001Script: ScriptScene[] = [
  {sceneId:'EP001-SC01',title:'Jakarta Masih Hidup',timecode:'00:00–00:08',storyClock:'02:46 WIB',siteId:'SITE-025',siteName:'Kuningan / City Transition',environmentId:'ENV-025-A',characters:['Arga'],purpose:'Membangun kehidupan normal Arga dan memastikan penonton langsung mengenali Jakarta.',action:'Mobil Arga bergerak melewati koridor kota setelah hujan. Arga masih bekerja seperti malam biasa.',dialogue:[],camera:'Wide establishing → MCU interior',audio:'Traffic Jakarta, drizzle, radio ringan',props:['VEH-ARGA-01'],continuity:'Aspal basah, malam, wardrobe Arga hitam, kendaraan sama di seluruh episode.',horror:'H0',productionNote:'Tidak ada unsur supernatural. Jakarta harus terasa hidup dan realistis.'},
  {sceneId:'EP001-SC02',title:'Telepon dari Rumah',timecode:'00:08–00:22',storyClock:'02:47 WIB',siteId:'SET-CAR',siteName:'Interior Mobil Arga',environmentId:'VEH-ARGA-01',characters:['Arga','Mama (VO)'],purpose:'Memberikan emotional anchor dan foreshadowing kecil sebelum order misterius masuk.',action:'Mama menelepon. Arga berjanji satu order lagi lalu pulang.',dialogue:[{speaker:'MAMA',text:'Belum pulang?'},{speaker:'ARGA',text:'Ini satu order lagi paling.'},{speaker:'MAMA',text:'Dari tadi satu order lagi terus.'},{speaker:'ARGA',text:'Serius. Habis ini pulang.'},{speaker:'MAMA',text:'Besok jangan lupa makan siang di rumah.'},{speaker:'ARGA',text:'Iya.'},{speaker:'MAMA',text:'Jangan pulang terlalu pagi.'},{speaker:'ARGA',text:'Terlalu malam maksudnya?'},{speaker:'MAMA',text:'Iya... terlalu malam.',note:'Ada jeda kecil sebelum jawaban.'}],camera:'OTS dashboard → CU Arga',audio:'Phone ring, speaker call, ambience kabin',props:['PROP-PHONE-01','VEH-ARGA-01'],continuity:'Posisi phone holder, dashboard, rear-view mirror, dan steering wheel harus identik.',horror:'H0',productionNote:'Foreshadowing harus terasa ganjil, bukan seram terang-terangan.'},
  {sceneId:'EP001-SC03',title:'Order Terakhir',timecode:'00:22–00:35',storyClock:'03:11 WIB',siteId:'SITE-016',siteName:'Lobby / Pickup Zone Kuningan',environmentId:'ENV-016-A',characters:['Arga'],purpose:'Trigger utama episode: sistem aplikasi berperilaku sendiri.',action:'Arga berhenti, menekan OFFLINE, lalu aplikasi aktif sendiri dan menawarkan order Sari Rp287.000.',dialogue:[{speaker:'ARGA',text:'Udah. Pulang.'},{speaker:'ARGA',text:'Lho?'},{speaker:'ARGA',text:'Dua ratus delapan puluh tujuh?'}],camera:'Medium static → phone insert',audio:'City ambience → notification TING',props:['PROP-PHONE-01','VEH-ARGA-01'],continuity:'Pickup zone dan pantulan hujan konsisten dengan shot sebelumnya.',horror:'H1',productionNote:'UI order harus jelas terbaca: SARI, rating 5.0, Rp287.000.'},
  {sceneId:'EP001-SC04',title:'Tujuan Kosong',timecode:'00:35–00:48',storyClock:'03:12:10 WIB',siteId:'SET-CAR',siteName:'Interior Mobil Arga',environmentId:'VEH-ARGA-01',characters:['Arga'],purpose:'Menaikkan rasa tidak masuk akal tanpa memperlihatkan hantu.',action:'Destination order kosong. Countdown hampir habis dan Arga tetap menerima order karena tarif tinggi.',dialogue:[{speaker:'ARGA',text:'Tujuannya mana?'},{speaker:'ARGA',text:'Ya udah. Duit segini sayang.'}],camera:'OTS phone → MCU reaction',audio:'UI click, accept click',props:['PROP-PHONE-01'],continuity:'UI, pencahayaan dashboard, dan angle phone holder harus sama.',horror:'H1',productionNote:'Anomali berasal dari sistem, bukan visual horor.'},
  {sceneId:'EP001-SC05',title:'Pickup 0 Meter',timecode:'00:48–01:02',storyClock:'03:12:35 WIB',siteId:'SITE-001',siteName:'Casablanca Approach',environmentId:'ENV-001-A',characters:['Arga'],purpose:'Memindahkan cerita dari dunia normal ke geography Casablanca.',action:'GPS mengarahkan Arga ke Casablanca. Sistem berkata telah tiba, tetapi jalan tampak kosong dan pickup menunjukkan 0 meter.',dialogue:[{speaker:'GPS',text:'Menuju lokasi penjemputan.'},{speaker:'GPS',text:'Anda telah tiba.'},{speaker:'ARGA',text:'Hah?'}],camera:'Vehicle tracking → wide stop',audio:'GPS guidance, tyre noise, ambience kota mulai menurun',props:['VEH-ARGA-01','PROP-PHONE-01'],continuity:'Road wet, traffic thinning, belum ada fog tebal.',horror:'H2',productionNote:'Lokasi harus tetap realistis sebagai Jakarta, bukan tunnel fantasi.'},
  {sceneId:'EP001-SC06',title:'Jam 03:13',timecode:'01:02–01:12',storyClock:'03:12:58 → 03:13:03 WIB',siteId:'SITE-001',siteName:'Casablanca Night Core',environmentId:'ENV-001-B',characters:['Arga'],purpose:'Menetapkan 03:13 sebagai signature event series.',action:'Jam dashboard berubah ke 03:13. Suara kota menghilang. Arga memanggil Sari tetapi spion masih kosong.',dialogue:[{speaker:'ARGA',text:'Mbak Sari?'}],camera:'ECU clock → mirror + CU',audio:'City ambience fade → silence',props:['PROP-MIRROR-01','VEH-ARGA-01'],continuity:'Jam harus berubah tepat 03:13. Sari belum boleh terlihat.',horror:'H2',productionNote:'Silence adalah cue utama. Jangan memakai jump scare.'},
  {sceneId:'EP001-SC07',title:'Saya Sudah di Mobil',timecode:'01:12–01:20',storyClock:'03:13:05 WIB',siteId:'SET-CAR',siteName:'Interior Mobil Arga',environmentId:'VEH-ARGA-01',characters:['Arga','Sari (text)'],purpose:'Membalik asumsi ruang: penumpang mengaku sudah berada di kabin.',action:'Pesan Sari masuk: “Saya sudah di mobil.” Arga melihat spion. Kursi belakang tetap terlihat kosong.',dialogue:[{speaker:'SARI / TEXT',text:'Saya sudah di mobil.'},{speaker:'ARGA',text:'Apaan sih...'}],camera:'Phone insert → rear-view mirror hero shot',audio:'TING, napas Arga',props:['PROP-PHONE-01','PROP-MIRROR-01'],continuity:'Rear seat masih kosong secara visual. Tidak boleh ada sosok samar sebelum beat berikutnya.',horror:'H2',productionNote:'Pertahankan ambiguity. Penonton harus sempat memeriksa kursi belakang bersama Arga.'},
  {sceneId:'EP001-SC08',title:'Jangan Lihat Spion',timecode:'01:20–01:28',storyClock:'03:13:12 WIB',siteId:'SITE-001',siteName:'Casablanca / Interior Mobil',environmentId:'ENV-001-B',characters:['Arga','Sari'],purpose:'Cliffhanger: reveal Sari hanya sepersekian detik.',action:'Suara perempuan terdengar dari belakang. Sari muncul hanya di rear-view mirror lalu cut to black.',dialogue:[{speaker:'SARI (O.S.)',text:'Bang...'},{speaker:'SARI',text:'Lewat Casablanca, ya.'},{speaker:'SARI / WHISPER',text:'Jangan lihat spion...'}],camera:'CU Arga → slow push rear-view mirror',audio:'Sari voice, light flicker, horror sting, whisper',props:['PROP-MIRROR-01','VEH-ARGA-01'],continuity:'Sari memakai maroon, rambut panjang hitam, wajah sebagian tertutup. Jangan full monster reveal.',horror:'H3',productionNote:'Reveal maksimal 4 detik dan langsung cut sebelum wajah terekspos penuh.'}
];

export const characterAngleRequirements = [
  'FRONT','BACK','LEFT PROFILE','RIGHT PROFILE','3/4 LEFT','3/4 RIGHT','TOP','BOTTOM','HIGH 3/4 LEFT','HIGH 3/4 RIGHT','LOW 3/4 LEFT','LOW 3/4 RIGHT'
] as const;

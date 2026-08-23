export type MediaState='LOCKED'|'INTERIM'|'SOURCE_REQUIRED';
export type MediaRatio='3:4'|'9:16'|'native';
export type MediaItem={id:string;src:string;ratio:MediaRatio;width:number;height:number;state:MediaState;downloadName:string;notes?:string};

const shotIds=['EP001-SC01-SH01','EP001-SC01-SH02','EP001-SC02-SH01','EP001-SC02-SH02','EP001-SC03-SH01','EP001-SC03-SH02','EP001-SC04-SH01','EP001-SC04-SH02','EP001-SC05-SH01','EP001-SC05-SH02','EP001-SC06-SH01','EP001-SC06-SH02','EP001-SC07-SH01','EP001-SC07-SH02','EP001-SC08-SH01','EP001-SC08-SH02'] as const;

function character(slug:string,label:string){
  const base=`/production-assets/individual/characters/${slug}`;
  const item=(angle:string,file:string):MediaItem=>({id:`${label}-${angle}`,src:`${base}/${file}.webp`,ratio:'3:4',width:1200,height:1600,state:'LOCKED',downloadName:`${label}-${file}.webp`,notes:'Approved V5 standalone character lock promoted from native 1200x1600 source. Stable runtime path and Asset ID must not change.'});
  return {
    FRONT:item('FRONT','front'),
    BACK:item('BACK','back'),
    'LEFT PROFILE':item('LEFT PROFILE','left-profile'),
    'RIGHT PROFILE':item('RIGHT PROFILE','right-profile'),
    '3/4 LEFT':item('3/4 LEFT','three-quarter-left'),
    '3/4 RIGHT':item('3/4 RIGHT','three-quarter-right'),
  };
}

function entityCharacter(){
  const base='/production-assets/individual/characters/penumpang-tanpa-wajah';
  const front:MediaItem={
    id:'Penumpang-Tanpa-Wajah-FRONT',
    src:`${base}/front.webp`,
    ratio:'3:4',
    width:1200,
    height:1600,
    state:'LOCKED',
    downloadName:'Penumpang-Tanpa-Wajah-front.webp',
    notes:'Human-approved CHR-ENTITY-01 identity master. Adobe provenance is recorded in the V5 character manifest. Other angles remain SOURCE REQUIRED.'
  };
  return {
    FRONT:front,
    BACK:null,
    'LEFT PROFILE':null,
    'RIGHT PROFILE':null,
    '3/4 LEFT':null,
    '3/4 RIGHT':null,
  };
}

function storyboards(){
  return Object.fromEntries(shotIds.map((shotId,index)=>{
    const file=`SH${String(index+1).padStart(2,'0')}`;
    const item:MediaItem={id:shotId,src:`/production-assets/individual/storyboards/EP001/${file}.webp`,ratio:'9:16',width:720,height:1280,state:'INTERIM',downloadName:`${shotId}.webp`,notes:'Standalone vertical storyboard. Replace in-place with native approved 1080x1920+ storyboard; UI path must not change.'};
    return [shotId,item];
  })) as Record<(typeof shotIds)[number],MediaItem>;
}

export const mediaManifest={
  movie:{
    casablanca:{
      cover:{id:'MOV-CASABLANCA-COVER',src:'/production-assets/individual/cover/casablanca-cover.webp',ratio:'9:16',width:720,height:1280,state:'INTERIM',downloadName:'03-13-casablanca-cover.webp',notes:'Standalone cover path is stable; replace in-place with approved 1080x1920+ source before LOCKED.'} satisfies MediaItem
    }
  },
  characters:{
    'CHR-ARGA-01':character('arga','Arga'),
    'CHR-SARI-01':character('sari','Sari'),
    'CHR-HARUN-01':character('pak-harun','Pak-Harun'),
    'CHR-BOWO-01':character('bowo','Bowo'),
    'CHR-DIMAS-01':character('dimas','Dimas'),
    'CHR-ENTITY-01':entityCharacter(),
  },
  storyboards:storyboards(),
} as const;

export const lockedCharacterAngles=['FRONT','BACK','LEFT PROFILE','RIGHT PROFILE','3/4 LEFT','3/4 RIGHT'] as const;
export type LockedCharacterAngle=(typeof lockedCharacterAngles)[number];
export function characterMedia(characterId:string,angle:LockedCharacterAngle):MediaItem|null{
  const character=mediaManifest.characters[characterId as keyof typeof mediaManifest.characters] as Partial<Record<LockedCharacterAngle,MediaItem|null>>|undefined;
  return character?.[angle]??null;
}
export function storyboardMedia(shotId:string){return mediaManifest.storyboards[shotId as keyof typeof mediaManifest.storyboards]??null;}
export const casablancaCover=mediaManifest.movie.casablanca.cover;

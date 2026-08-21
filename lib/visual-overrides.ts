import { productionAssetById } from './production-assets';

export const actualCharacterAngles=['FRONT','BACK','LEFT PROFILE','RIGHT PROFILE','3/4 LEFT','3/4 RIGHT'] as const;

const angleCrop:Record<string,{x:number;y:number;width:number;height:number}>={
  'FRONT':{x:0.13,y:0.02,width:0.17,height:0.94},
  '3/4 RIGHT':{x:0.27,y:0.02,width:0.16,height:0.94},
  'RIGHT PROFILE':{x:0.40,y:0.02,width:0.15,height:0.94},
  'BACK':{x:0.52,y:0.02,width:0.17,height:0.94},
  '3/4 LEFT':{x:0.65,y:0.02,width:0.16,height:0.94},
  'LEFT PROFILE':{x:0.77,y:0.02,width:0.14,height:0.94},
};

export function characterAngleTile(assetId:string,angle:string){
  const asset=productionAssetById(assetId);
  if(!asset||!angleCrop[angle]) return null;
  return {...asset.atlas,crop:angleCrop[angle],downloadName:`${assetId}-${angle.replaceAll(' ','-')}.png`};
}

const shotVisualAsset:Record<string,string>={
  'EP001-SC01-SH01':'ENV-025-A',
  'EP001-SC01-SH02':'VEH-ARGA-01',
  'EP001-SC02-SH01':'VEH-ARGA-01',
  'EP001-SC02-SH02':'CHR-ARGA-01',
  'EP001-SC03-SH01':'ENV-016-A',
  'EP001-SC03-SH02':'VEH-ARGA-01',
  'EP001-SC04-SH01':'VEH-ARGA-01',
  'EP001-SC04-SH02':'CHR-ARGA-01',
  'EP001-SC05-SH01':'ENV-001-A',
  'EP001-SC05-SH02':'ENV-001-A',
  'EP001-SC06-SH01':'VEH-ARGA-01',
  'EP001-SC06-SH02':'VEH-ARGA-01',
  'EP001-SC07-SH01':'VEH-ARGA-01',
  'EP001-SC07-SH02':'VEH-ARGA-01',
  'EP001-SC08-SH01':'CHR-ARGA-01',
  'EP001-SC08-SH02':'CHR-SARI-01',
};

export function storyboardReferenceForShot(shotId:string){
  const id=shotVisualAsset[shotId];
  return id?productionAssetById(id)?.atlas??null:null;
}

import { productionAssetById, storyboardTileForShot } from './production-assets';

export const actualCharacterAngles=['FRONT','BACK','LEFT PROFILE','RIGHT PROFILE','3/4 LEFT','3/4 RIGHT'] as const;

// Master sheets place the usable character row around the center band.
// These crops intentionally remove the large white margins/title areas so the
// character fills the portrait lock card instead of floating at the bottom.
const angleCrop:Record<string,{x:number;y:number;width:number;height:number}>={
  'FRONT':{x:0.12,y:0.29,width:0.15,height:0.47},
  '3/4 RIGHT':{x:0.26,y:0.29,width:0.15,height:0.47},
  'RIGHT PROFILE':{x:0.39,y:0.29,width:0.14,height:0.47},
  'BACK':{x:0.52,y:0.29,width:0.15,height:0.47},
  '3/4 LEFT':{x:0.65,y:0.29,width:0.15,height:0.47},
  'LEFT PROFILE':{x:0.78,y:0.29,width:0.14,height:0.47},
};

export function characterAngleTile(assetId:string,angle:string){
  const asset=productionAssetById(assetId);
  if(!asset||!angleCrop[angle]) return null;
  return {...asset.atlas,crop:angleCrop[angle],downloadName:`${assetId}-${angle.replaceAll(' ','-')}.png`};
}

// Storyboard is its own source of truth. Environment/character assets remain
// references, but the editor canvas always reads the dedicated SH01–SH16 tile.
export function storyboardReferenceForShot(shotId:string){
  return storyboardTileForShot(shotId);
}

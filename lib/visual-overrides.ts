import { productionAssetById, storyboardTileForShot } from './production-assets';

export const actualCharacterAngles=['FRONT','BACK','LEFT PROFILE','RIGHT PROFILE','3/4 LEFT','3/4 RIGHT'] as const;

// The locked master sheets place the six usable portrait views in a narrow
// horizontal band. These crops intentionally focus on head/shoulders and remove
// most title/label whitespace so the character fills a 3:4 portrait card.
const angleCrop:Record<string,{x:number;y:number;width:number;height:number}>={
  'FRONT':{x:0.145,y:0.46,width:0.105,height:0.34},
  '3/4 RIGHT':{x:0.285,y:0.46,width:0.105,height:0.34},
  'RIGHT PROFILE':{x:0.425,y:0.46,width:0.10,height:0.34},
  'BACK':{x:0.565,y:0.46,width:0.10,height:0.34},
  '3/4 LEFT':{x:0.695,y:0.46,width:0.105,height:0.34},
  'LEFT PROFILE':{x:0.825,y:0.46,width:0.10,height:0.34},
};

export function characterAngleTile(assetId:string,angle:string){
  const asset=productionAssetById(assetId);
  if(!asset||!angleCrop[angle]) return null;
  return {...asset.atlas,crop:angleCrop[angle],downloadName:`${assetId}-${angle.replaceAll(' ','-')}.png`};
}

export function storyboardReferenceForShot(shotId:string){
  return storyboardTileForShot(shotId);
}

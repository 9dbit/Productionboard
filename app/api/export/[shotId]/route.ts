import { getAsset, getShot } from '@/lib/data';

export async function GET(_request:Request,{params}:{params:Promise<{shotId:string}>}){
  const {shotId}=await params; const shot=getShot(shotId);
  if(!shot) return Response.json({error:'Shot not found'},{status:404});
  const references=shot.assetIds.map(getAsset).filter(Boolean).map(a=>({id:a!.id,name:a!.name,url:a!.url,kind:a!.kind}));
  return Response.json({project:'03:13 CASABLANCA',episode:'EP001',shot,references,negativePrompt:'no cartoon, no anime, no fantasy architecture, no face changes, no wardrobe changes, no vehicle changes, no incorrect Indonesian traffic direction, no random ghost appearance',workflow:['download references','copy prompt','generate video','upload result','review','approve or revision','lock']},{headers:{'Content-Disposition':`attachment; filename="${shotId}.json"`}});
}

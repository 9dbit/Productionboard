import { promises as fs } from 'node:fs';
import path from 'node:path';

export const runtime='nodejs';
export const dynamic='force-dynamic';

const bundleMap:Record<string,{files:string[];mime:string}>={
  characters:{files:['public/production-assets/v4/characters.00.b64','public/production-assets/v4/characters.01.b64','public/production-assets/v4/characters.02.b64'],mime:'image/webp'},
  sites:{files:['public/production-assets/v4/sites.00.b64','public/production-assets/v4/sites.01.b64','public/production-assets/v4/sites.02.b64','public/production-assets/v4/sites.03.b64','public/production-assets/v4/sites.04.b64','public/production-assets/v4/sites.05.b64'],mime:'image/webp'},
  storyboards:{files:['public/production-assets/v4/storyboards.00.b64'],mime:'image/webp'},
  cover:{files:['public/production-assets/real/casablanca-cover.webp.b64'],mime:'image/webp'},
};

export async function GET(_request:Request,{params}:{params:Promise<{bundle:string}>}){
  const {bundle}=await params;
  const config=bundleMap[bundle];
  if(!config) return new Response('Unknown production media bundle',{status:404});
  try{
    const chunks=await Promise.all(config.files.map(async file=>{
      const text=await fs.readFile(path.join(process.cwd(),file),'utf8');
      return text.replace(/\s+/g,'');
    }));
    const bytes=Buffer.from(chunks.join(''),'base64');
    return new Response(bytes,{status:200,headers:{'Content-Type':config.mime,'Cache-Control':'public, max-age=31536000, immutable','Content-Length':String(bytes.length)}});
  }catch(error){
    console.error('production-media decode failed',bundle,error);
    return new Response('Production media unavailable',{status:500});
  }
}

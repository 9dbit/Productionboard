'use client';

import { useEffect, useMemo, useState } from 'react';

export type AtlasTile={
  sources:string[];
  mime:'image/webp'|'image/avif';
  col:number;
  row:number;
  cols:number;
  rows:number;
  tileWidth:number;
  tileHeight:number;
  downloadName?:string;
};

const atlasCache=new Map<string,Promise<string>>();

function loadAtlas(sources:string[],mime:string){
  const key=`${mime}:${sources.join('|')}`;
  if(!atlasCache.has(key)){
    atlasCache.set(key,Promise.all(sources.map(source=>fetch(source).then(response=>{
      if(!response.ok) throw new Error(`Atlas load failed: ${source}`);
      return response.text();
    }))).then(parts=>`data:${mime};base64,${parts.join('').replace(/\s+/g,'')}`));
  }
  return atlasCache.get(key)!;
}

async function cropBlob(uri:string,tile:AtlasTile){
  const image=new Image();
  image.src=uri;
  await image.decode();
  const canvas=document.createElement('canvas');
  canvas.width=tile.tileWidth;
  canvas.height=tile.tileHeight;
  const ctx=canvas.getContext('2d');
  if(!ctx) return null;
  ctx.drawImage(
    image,
    tile.col*tile.tileWidth,
    tile.row*tile.tileHeight,
    tile.tileWidth,
    tile.tileHeight,
    0,0,tile.tileWidth,tile.tileHeight
  );
  return await new Promise<Blob|null>(resolve=>canvas.toBlob(resolve,'image/png',1));
}

export function AtlasVisual({tile,alt,downloadable=true,className=''}:{tile:AtlasTile;alt:string;downloadable?:boolean;className?:string}){
  const [uri,setUri]=useState('');
  const [error,setError]=useState(false);
  const key=useMemo(()=>tile.sources.join('|'),[tile.sources]);

  useEffect(()=>{
    let active=true;
    setError(false);
    loadAtlas(tile.sources,tile.mime)
      .then(value=>active&&setUri(value))
      .catch(()=>active&&setError(true));
    return()=>{active=false};
  },[key,tile.mime,tile.sources]);

  async function downloadCrop(){
    if(!uri) return;
    const blob=await cropBlob(uri,tile);
    if(!blob) return;
    const url=URL.createObjectURL(blob);
    const anchor=document.createElement('a');
    anchor.href=url;
    anchor.download=tile.downloadName||`${alt}.png`;
    anchor.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  async function viewCrop(){
    if(!uri) return;
    const blob=await cropBlob(uri,tile);
    if(!blob) return;
    const url=URL.createObjectURL(blob);
    window.open(url,'_blank','noopener,noreferrer');
    setTimeout(()=>URL.revokeObjectURL(url),60000);
  }

  return <div className={`assetVisual atlasVisual ${className}`}>
    <div style={{position:'relative',overflow:'hidden',width:'100%',aspectRatio:`${tile.tileWidth}/${tile.tileHeight}`,background:'#0b1116'}}>
      {uri&&<img
        src={uri}
        alt={alt}
        loading="lazy"
        style={{
          position:'absolute',
          width:`${tile.cols*100}%`,
          height:`${tile.rows*100}%`,
          maxWidth:'none',
          left:`-${tile.col*100}%`,
          top:`-${tile.row*100}%`,
          objectFit:'fill'
        }}
      />}
      {!uri&&!error&&<div className="assetLoading">Loading production asset…</div>}
      {error&&<div className="assetLoading">Asset unavailable</div>}
    </div>
    {uri&&<div className="atlasActions">
      <button type="button" className="assetDownload" onClick={viewCrop}>View HD</button>
      {downloadable&&<button type="button" className="assetDownload" onClick={downloadCrop}>Download</button>}
    </div>}
  </div>;
}

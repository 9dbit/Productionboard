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
  crop?:{x:number;y:number;width:number;height:number};
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

async function renderCrop(uri:string,tile:AtlasTile){
  const image=new Image();
  image.src=uri;
  await image.decode();
  const inner=tile.crop??{x:0,y:0,width:1,height:1};
  const sx=tile.col*tile.tileWidth+inner.x*tile.tileWidth;
  const sy=tile.row*tile.tileHeight+inner.y*tile.tileHeight;
  const sw=inner.width*tile.tileWidth;
  const sh=inner.height*tile.tileHeight;
  const canvas=document.createElement('canvas');
  canvas.width=Math.max(1,Math.round(sw));
  canvas.height=Math.max(1,Math.round(sh));
  const ctx=canvas.getContext('2d');
  if(!ctx) return null;
  ctx.drawImage(image,sx,sy,sw,sh,0,0,canvas.width,canvas.height);
  return canvas.toDataURL('image/png',1);
}

export function AtlasVisual({tile,alt,downloadable=true,className=''}:{tile:AtlasTile;alt:string;downloadable?:boolean;className?:string}){
  const [uri,setUri]=useState('');
  const [displayUri,setDisplayUri]=useState('');
  const [error,setError]=useState(false);
  const key=useMemo(()=>`${tile.sources.join('|')}:${tile.col}:${tile.row}:${JSON.stringify(tile.crop??{})}`,[tile.sources,tile.col,tile.row,tile.crop]);

  useEffect(()=>{
    let active=true;
    setError(false);
    setDisplayUri('');
    loadAtlas(tile.sources,tile.mime)
      .then(async value=>{
        if(!active) return;
        setUri(value);
        const rendered=await renderCrop(value,tile);
        if(active&&rendered) setDisplayUri(rendered);
      })
      .catch(()=>active&&setError(true));
    return()=>{active=false};
  },[key,tile.mime]);

  function downloadCrop(){
    if(!displayUri) return;
    const anchor=document.createElement('a');
    anchor.href=displayUri;
    anchor.download=tile.downloadName||`${alt}.png`;
    anchor.click();
  }

  function viewCrop(){
    if(!displayUri) return;
    const win=window.open();
    if(win){
      win.document.write(`<html><body style="margin:0;background:#070b0f;display:grid;place-items:center;min-height:100vh"><img src="${displayUri}" style="max-width:100%;height:auto"/></body></html>`);
      win.document.close();
    }
  }

  return <div className={`assetVisual atlasVisual ${className}`}>
    <div style={{position:'relative',overflow:'hidden',width:'100%',aspectRatio:tile.crop?`${tile.crop.width*tile.tileWidth}/${tile.crop.height*tile.tileHeight}`:`${tile.tileWidth}/${tile.tileHeight}`,background:'#0b1116'}}>
      {displayUri&&<img src={displayUri} alt={alt} loading="lazy" style={{width:'100%',height:'100%',objectFit:'contain',display:'block'}} />}
      {!displayUri&&!error&&<div className="assetLoading">Loading production asset…</div>}
      {error&&<div className="assetLoading">Asset unavailable</div>}
    </div>
    {displayUri&&<div className="atlasActions">
      <button type="button" className="assetDownload" onClick={viewCrop}>View HD</button>
      {downloadable&&<button type="button" className="assetDownload" onClick={downloadCrop}>Download</button>}
    </div>}
  </div>;
}

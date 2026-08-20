'use client';

import { useEffect, useState } from 'react';

type AtlasTile={source:string;mime:string;col:number;row:number;cols:number;rows:number;tileWidth:number;tileHeight:number;downloadName?:string};
const atlasCache=new Map<string,Promise<string>>();

function loadAtlas(source:string,mime:string){
  if(!atlasCache.has(source)) atlasCache.set(source,fetch(source).then(r=>{if(!r.ok) throw new Error(`Atlas load failed: ${source}`);return r.text();}).then(text=>`data:${mime};base64,${text.trim()}`));
  return atlasCache.get(source)!;
}

export function AtlasVisual({tile,alt,downloadable=true,className=''}:{tile:AtlasTile;alt:string;downloadable?:boolean;className?:string}){
  const [uri,setUri]=useState('');
  const [error,setError]=useState(false);
  useEffect(()=>{let active=true;loadAtlas(tile.source,tile.mime).then(v=>active&&setUri(v)).catch(()=>active&&setError(true));return()=>{active=false};},[tile.source,tile.mime]);

  async function downloadCrop(){
    if(!uri) return;
    const img=new Image(); img.src=uri;
    await img.decode();
    const canvas=document.createElement('canvas'); canvas.width=tile.tileWidth; canvas.height=tile.tileHeight;
    const ctx=canvas.getContext('2d'); if(!ctx) return;
    ctx.drawImage(img,tile.col*tile.tileWidth,tile.row*tile.tileHeight,tile.tileWidth,tile.tileHeight,0,0,tile.tileWidth,tile.tileHeight);
    const blob=await new Promise<Blob|null>(resolve=>canvas.toBlob(resolve,'image/png',1)); if(!blob) return;
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=tile.downloadName||`${alt}.png`; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  }

  return <div className={`assetVisual atlasVisual ${className}`}>
    <div style={{position:'relative',overflow:'hidden',width:'100%',aspectRatio:`${tile.tileWidth}/${tile.tileHeight}`,background:'#0b1116'}}>
      {!uri&&!error&&<div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',color:'#83909a',fontSize:12}}>Loading HD asset…</div>}
      {error&&<div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',color:'#c75b62',fontSize:12}}>Asset unavailable</div>}
      {uri&&<img src={uri} alt={alt} style={{position:'absolute',maxWidth:'none',width:`${tile.cols*100}%`,height:'auto',left:`-${tile.col*100}%`,top:`-${tile.row*100}%`}}/>}
    </div>
    {downloadable&&<button type="button" className="assetDownload" onClick={downloadCrop} disabled={!uri}>Download HD</button>}
  </div>;
}

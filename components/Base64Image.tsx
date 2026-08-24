'use client';

import { useEffect, useState } from 'react';

export function Base64Image({source,mime='image/webp',alt,className='',fit='cover'}:{source:string;mime?:string;alt:string;className?:string;fit?:'cover'|'contain'}){
  const [uri,setUri]=useState('');
  const [error,setError]=useState(false);
  useEffect(()=>{
    let active=true;
    setUri('');
    setError(false);
    fetch(source)
      .then(response=>{if(!response.ok) throw new Error('image source unavailable');return response.text()})
      .then(text=>{if(active)setUri(`data:${mime};base64,${text.replace(/\s+/g,'')}`)})
      .catch(()=>active&&setError(true));
    return()=>{active=false};
  },[source,mime]);
  if(error) return <div className={`${className} assetLoading`}>Cover unavailable</div>;
  if(!uri) return <div className={`${className} assetLoading`}>Loading cover…</div>;
  return <img src={uri} alt={alt} className={className} style={{objectFit:fit}}/>;
}

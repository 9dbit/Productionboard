import Link from 'next/link';

export function AssetVisual({ src, alt, downloadable=true, className='', ratio='native', fit='contain', label }: { src:string; alt:string; downloadable?:boolean; className?:string; ratio?:'3:4'|'9:16'|'native'; fit?:'contain'|'cover'; label?:string }) {
  const aspectRatio=ratio==='3:4'?'3 / 4':ratio==='9:16'?'9 / 16':undefined;
  return (
    <div className={`assetVisual ${className}`} style={aspectRatio?{aspectRatio}:undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" style={{width:'100%',height:aspectRatio?'100%':'auto',objectFit:fit,objectPosition:'center'}} />
      {label && <span className="mediaStateLabel">{label}</span>}
      {downloadable && <Link className="assetDownload" href={src} download>Download</Link>}
    </div>
  );
}

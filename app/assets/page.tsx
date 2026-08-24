import { assets, allShots } from '@/lib/data';
import { AssetVisual } from '@/components/AssetVisual';
import { StatusBadge } from '@/components/StatusBadge';

export default function AssetsPage(){
  return <div className="page"><header className="hero compact"><div><span className="eyebrow accent">ASSET LIBRARY</span><h1>Characters, environments & production locks</h1><p>Original files remain downloadable and can later be backed by R2 / S3 / Supabase Storage.</p></div></header><section className="assetGrid">{assets.map(asset=>{const used=allShots.filter(s=>s.assetIds.includes(asset.id)||s.environmentId===asset.id).length;return <article className="assetCard" key={asset.id}><AssetVisual src={asset.url} alt={asset.name}/><div><div className="assetCardHead"><span className="eyebrow">{asset.kind}</span><StatusBadge status={asset.status}/></div><h3>{asset.name}</h3><strong>{asset.id}</strong><p>{asset.description}</p><small>{used} pilot shots use this asset</small></div></article>})}</section></div>;
}

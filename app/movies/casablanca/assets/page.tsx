import { MovieWorkspaceHeader } from '@/components/MovieWorkspaceHeader';
import { AssetVisual } from '@/components/AssetVisual';
import { StatusBadge } from '@/components/StatusBadge';
import { assets, allShots } from '@/lib/data';
import { characterAngleRequirements } from '@/lib/produxion';

export default function MovieAssetsPage(){
  const characters=assets.filter(a=>a.kind==='CHARACTER');
  const environments=assets.filter(a=>a.kind==='ENVIRONMENT');
  const support=assets.filter(a=>!['CHARACTER','ENVIRONMENT'].includes(a.kind));
  return <div className="movieWorkspace page">
    <MovieWorkspaceHeader active="Assets"/>
    <section className="workspaceIntro"><div><span className="eyebrow accent">ASSET LIBRARY</span><h2>Character locks, sites & environments</h2></div><p>Asset dianggap production-ready hanya jika punya ID, source image, status, dan hubungan jelas ke script / episode / scene / shot.</p></section>

    <section className="assetSection"><div className="sectionHead"><div><span className="eyebrow">CHARACTER ASSETS</span><h2>Character lock matrix</h2></div><span className="muted">12 angle requirements per character</span></div>
      <div className="characterAssetStack">{characters.map(character=>{const uses=allShots.filter(s=>s.characterIds.includes(character.id));return <article className="characterLockCard" key={character.id}><div className="characterLockIntro"><AssetVisual src={character.url} alt={character.name}/><div><div className="assetCardHead"><span className="eyebrow">{character.id}</span><StatusBadge status={character.status}/></div><h3>{character.name}</h3><p>{character.description}</p><div className="assetUsageSummary"><span>{uses.length} shot uses</span><span>EP001</span><span>{uses.length?uses[0].sceneId:'No scene mapped'}</span></div></div></div><div className="angleGrid">{characterAngleRequirements.map((angle,index)=><div className={index===0?'angleSlot lockedAngle':'angleSlot'} key={angle}>{index===0?<><div className="angleImage">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={character.url} alt={`${character.name} ${angle}`}/></div><span>{angle}</span><small>LOCKED</small></>:<><div className="anglePlaceholder"><b>+</b><small>UPLOAD</small></div><span>{angle}</span><small>Required for full lock</small></>}</div>)}</div></article>})}</div>
    </section>

    <section className="assetSection"><div className="sectionHead"><div><span className="eyebrow">SITE & ENVIRONMENT ASSETS</span><h2>Location references mapped to story</h2></div><span className="muted">HD source • downloadable • traceable</span></div>
      <div className="environmentAssetGrid">{environments.map(asset=>{const uses=allShots.filter(s=>s.environmentId===asset.id||s.assetIds.includes(asset.id));const sceneIds=[...new Set(uses.map(s=>s.sceneId))];return <article className="environmentAssetCard" key={asset.id}><AssetVisual src={asset.url} alt={asset.name}/><div className="environmentAssetBody"><div className="assetCardHead"><div><span className="eyebrow">{asset.siteId||'SITE'}</span><h3>{asset.name}</h3></div><StatusBadge status={asset.status}/></div><strong>{asset.id}</strong><p>{asset.description}</p><div className="mappingBlock"><span className="eyebrow">SCRIPT / EPISODE MAPPING</span><div><b>Episode</b><span>EP001</span></div><div><b>Scenes</b><span>{sceneIds.length?sceneIds.join(', '):'Not used in EP001'}</span></div><div><b>Shots</b><span>{uses.length?uses.map(s=>s.id.split('-').at(-1)).join(', '):'—'}</span></div></div></div></article>})}</div>
    </section>

    <section className="assetSection"><div className="sectionHead"><div><span className="eyebrow">SUPPORT ASSETS</span><h2>Vehicle & props</h2></div></div><div className="assetGrid">{support.map(asset=>{const uses=allShots.filter(s=>s.assetIds.includes(asset.id)||s.environmentId===asset.id);return <article className="assetCard" key={asset.id}><AssetVisual src={asset.url} alt={asset.name}/><div><div className="assetCardHead"><span className="eyebrow">{asset.kind}</span><StatusBadge status={asset.status}/></div><h3>{asset.name}</h3><strong>{asset.id}</strong><p>{asset.description}</p><small>{uses.length} shots use this asset</small></div></article>})}</div></section>
  </div>;
}

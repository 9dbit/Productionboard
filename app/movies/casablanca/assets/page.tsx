import { MovieWorkspaceHeader } from '@/components/MovieWorkspaceHeader';
import { AtlasVisual } from '@/components/AtlasVisual';
import { StatusBadge } from '@/components/StatusBadge';
import { characterAngleRequirements } from '@/lib/produxion';
import { productionAssets } from '@/lib/production-assets';

export default function MovieAssetsPage(){
  const characters=productionAssets.filter(a=>a.kind==='CHARACTER');
  const environments=productionAssets.filter(a=>a.kind==='ENVIRONMENT');
  const support=productionAssets.filter(a=>a.kind==='VEHICLE'||a.kind==='REFERENCE');
  return <div className="movieWorkspace page">
    <MovieWorkspaceHeader active="Assets"/>
    <section className="workspaceIntro"><div><span className="eyebrow accent">ASSET LIBRARY</span><h2>Character locks, sites & environments</h2></div><p>Semua media di bawah memakai source produksi nyata. Setiap asset punya ID, status, hubungan cerita, dan crop HD yang dapat di-download.</p></section>

    <section className="assetSection"><div className="sectionHead"><div><span className="eyebrow">CHARACTER ASSETS</span><h2>Character lock library</h2></div><span className="muted">Actual lock sheets • no fake duplicate angles</span></div>
      <div className="characterAssetStack">{characters.map(character=>{const coverage=character.angleCoverage||[];return <article className="characterLockCard" key={character.id}><div className="characterLockIntro"><AtlasVisual tile={character.atlas} alt={character.name}/><div><div className="assetCardHead"><span className="eyebrow">{character.id}</span><StatusBadge status={character.status}/></div><h3>{character.name}</h3><p>{character.description}</p><div className="assetUsageSummary"><span>{character.episodeIds?.join(', ')||'Future arc'}</span><span>{coverage.length}/12 angle targets available</span></div><p className="muted">{character.storyUse}</p></div></div><div className="angleGrid">{characterAngleRequirements.map(angle=>{const ready=coverage.includes(angle);return <div className={ready?'angleSlot lockedAngle':'angleSlot'} key={angle}><div className="anglePlaceholder"><b>{ready?'✓':'+'}</b><small>{ready?'IN MASTER SHEET':'NEEDED'}</small></div><span>{angle}</span><small>{ready?'Reference available':'Required for full 12-angle lock'}</small></div>})}</div></article>})}</div>
    </section>

    <section className="assetSection"><div className="sectionHead"><div><span className="eyebrow">SITE & ENVIRONMENT ASSETS</span><h2>All mapped locations</h2></div><span className="muted">Jakarta anchors + support sites 15–25 + Casablanca core</span></div>
      <div className="environmentAssetGrid">{environments.map(asset=><article className="environmentAssetCard" key={asset.id}><AtlasVisual tile={asset.atlas} alt={asset.name}/><div className="environmentAssetBody"><div className="assetCardHead"><div><span className="eyebrow">{asset.siteId||'SITE'}</span><h3>{asset.name}</h3></div><StatusBadge status={asset.status}/></div><strong>{asset.id}</strong><p>{asset.description}</p><div className="mappingBlock"><span className="eyebrow">SCRIPT / EPISODE MAPPING</span><div><b>Episode</b><span>{asset.episodeIds?.join(', ')||'—'}</span></div><div><b>Scenes</b><span>{asset.sceneIds?.join(', ')||'Planned / recurring'}</span></div><div><b>Shots</b><span>{asset.shotIds?.join(', ')||'—'}</span></div></div><p className="muted">{asset.storyUse}</p></div></article>)}</div>
    </section>

    <section className="assetSection"><div className="sectionHead"><div><span className="eyebrow">PRODUCTION SETS & REFERENCES</span><h2>Vehicle, turnaround & master sheets</h2></div></div><div className="assetGrid">{support.map(asset=><article className="assetCard" key={asset.id}><AtlasVisual tile={asset.atlas} alt={asset.name}/><div><div className="assetCardHead"><span className="eyebrow">{asset.kind}</span><StatusBadge status={asset.status}/></div><h3>{asset.name}</h3><strong>{asset.id}</strong><p>{asset.description}</p><small>{asset.episodeIds?.join(', ')||'Series reference'}</small><p className="muted">{asset.storyUse}</p></div></article>)}</div></section>
  </div>;
}

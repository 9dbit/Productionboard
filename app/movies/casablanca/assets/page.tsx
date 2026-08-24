import { MovieWorkspaceHeader } from '@/components/MovieWorkspaceHeader';
import { AtlasVisual } from '@/components/AtlasVisual';
import { AssetVisual } from '@/components/AssetVisual';
import { StatusBadge } from '@/components/StatusBadge';
import { productionAssets } from '@/lib/production-assets';
import { characterMedia, lockedCharacterAngles } from '@/lib/media-manifest';

const missingAngles=['TOP','BOTTOM','HIGH 3/4 LEFT','HIGH 3/4 RIGHT','LOW 3/4 LEFT','LOW 3/4 RIGHT'];

export default function MovieAssetsPage(){
  const characters=productionAssets.filter(a=>a.kind==='CHARACTER');
  const environments=productionAssets.filter(a=>a.kind==='ENVIRONMENT');
  const support=productionAssets.filter(a=>a.kind==='VEHICLE'||a.kind==='REFERENCE');
  return <div className="movieWorkspace page">
    <MovieWorkspaceHeader active="Assets"/>
    <section className="workspaceIntro"><div><span className="eyebrow accent">ASSET LIBRARY</span><h2>Character locks, sites & environments</h2></div><p>Character lock dan storyboard master sekarang membaca satu media manifest. Atlas/contact sheet hanya boleh dipakai sebagai supporting reference, bukan final lock.</p></section>

    <section className="assetSection"><div className="sectionHead"><div><span className="eyebrow">CHARACTER ASSETS</span><h2>Character lock library</h2></div><span className="muted">1 slot = 1 physical image file • target native 1200×1600+</span></div>
      <div className="characterAssetStack">{characters.map(character=>{const preview=characterMedia(character.id,'FRONT');return <article className="characterLockCard" key={character.id}>
        <div className="characterLockIntro">{preview&&<AssetVisual src={preview.src} alt={`${character.name} front`} ratio="3:4" fit="contain" className="characterHeroVisual" label={preview.state}/>}<div><div className="assetCardHead"><span className="eyebrow">{character.id}</span><StatusBadge status={character.status}/></div><h3>{character.name}</h3><p>{character.description}</p><div className="assetUsageSummary"><span>{character.episodeIds?.join(', ')||'Future arc'}</span><span>6 standalone paths</span></div><p className="muted">{character.storyUse}</p><p className="muted">INTERIM berarti file sudah standalone tetapi belum memenuhi source-quality final. Replace file in-place; jangan ubah Asset ID/path.</p></div></div>
        <div className="angleGrid">{lockedCharacterAngles.map(angle=>{const media=characterMedia(character.id,angle);return <div className="angleSlot lockedAngle" key={angle}>{media?<AssetVisual src={media.src} alt={`${character.name} ${angle}`} ratio="3:4" fit="contain" className="characterAngleVisual" label={media.state}/>:<div className="emptyState">SOURCE REQUIRED</div>}<span>{angle}</span><small>{media?`${media.width}×${media.height} contract • ${media.state}`:'Source required'}</small></div>})}</div>
        <div className="missingAngleStrip"><span className="eyebrow">REMAINING ANGLES TO GENERATE</span><div className="tagRow">{missingAngles.map(angle=><span className="metaChip" key={angle}>{angle}</span>)}</div><p className="muted">Tidak ditampilkan sebagai gambar palsu. Enam angle tambahan harus dibuat dari face lock yang sama sebelum status full 12-angle dapat LOCKED.</p></div>
      </article>})}</div>
    </section>

    <section className="assetSection"><div className="sectionHead"><div><span className="eyebrow">SITE & ENVIRONMENT ASSETS</span><h2>All mapped locations</h2></div><span className="muted">Legacy atlas sementara diperbolehkan hanya untuk supporting environment/reference</span></div>
      <div className="environmentAssetGrid">{environments.map(asset=><article className="environmentAssetCard" key={asset.id}><AtlasVisual tile={asset.atlas} alt={asset.name}/><div className="environmentAssetBody"><div className="assetCardHead"><div><span className="eyebrow">{asset.siteId||'SITE'}</span><h3>{asset.name}</h3></div><StatusBadge status={asset.status}/></div><strong>{asset.id}</strong><p>{asset.description}</p><div className="mappingBlock"><span className="eyebrow">SCRIPT / EPISODE MAPPING</span><div><b>Episode</b><span>{asset.episodeIds?.join(', ')||'—'}</span></div><div><b>Scenes</b><span>{asset.sceneIds?.join(', ')||'Planned / recurring'}</span></div><div><b>Shots</b><span>{asset.shotIds?.join(', ')||'—'}</span></div></div><p className="muted">{asset.storyUse}</p></div></article>)}</div>
    </section>

    <section className="assetSection"><div className="sectionHead"><div><span className="eyebrow">PRODUCTION SETS & REFERENCES</span><h2>Vehicle, turnaround & master sheets</h2></div></div><div className="assetGrid">{support.map(asset=><article className="assetCard" key={asset.id}><AtlasVisual tile={asset.atlas} alt={asset.name}/><div><div className="assetCardHead"><span className="eyebrow">{asset.kind}</span><StatusBadge status={asset.status}/></div><h3>{asset.name}</h3><strong>{asset.id}</strong><p>{asset.description}</p><small>{asset.episodeIds?.join(', ')||'Series reference'}</small><p className="muted">{asset.storyUse}</p></div></article>)}</div></section>
  </div>;
}

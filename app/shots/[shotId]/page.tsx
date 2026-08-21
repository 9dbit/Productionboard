import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAsset, getShot } from '@/lib/data';
import { AssetVisual } from '@/components/AssetVisual';
import { AtlasVisual } from '@/components/AtlasVisual';
import { CopyButton } from '@/components/CopyButton';
import { ReviewControls } from '@/components/ReviewControls';
import { StatusBadge } from '@/components/StatusBadge';
import { productionAssetById } from '@/lib/production-assets';
import { storyboardReferenceForShot } from '@/lib/visual-overrides';

export default async function ShotPage({ params }:{ params:Promise<{shotId:string}> }){
  const { shotId }=await params; const shot=getShot(shotId); if(!shot) notFound();
  const storyTile=storyboardReferenceForShot(shot.id);
  const refs=shot.assetIds.map(id=>({id,production:productionAssetById(id),fallback:getAsset(id)}));
  return <div className="page"><header className="hero compact"><div><span className="eyebrow accent">VERTICAL SHOT DETAIL</span><h1>{shot.id}</h1><p>{shot.timecode} • Story clock {shot.storyClock} • {shot.duration}s • master frame 9:16</p></div><StatusBadge status={shot.status}/></header><div className="shotDetail"><section className="shotCanvas verticalShotCanvas">{storyTile?<AtlasVisual tile={{...storyTile,downloadName:`${shot.id}-vertical-reference.png`}} alt={shot.id} aspect="portrait-9-16" fit="contain" badge="MASTER 9:16"/>:<AssetVisual src={shot.thumbnailUrl} alt={shot.id}/>}<div className="shotFacts"><span>{shot.camera}</span><span>{shot.locationId}</span><span>{shot.environmentId}</span><span>{shot.horror}</span><span>9:16</span></div><h2>{shot.action}</h2><p className="muted">Audio: {shot.audio}</p></section><aside className="inspector"><span className="eyebrow">REFERENCE ASSETS</span><p className="muted inspectorHint">Reference assets may have their native ratio. Only the storyboard/master shot frame is locked to 9:16.</p><div className="referenceGrid">{refs.map(ref=><div key={ref.id}>{ref.production?<AtlasVisual tile={ref.production.atlas} alt={ref.production.name}/>:ref.fallback?<AssetVisual src={ref.fallback.url} alt={ref.fallback.name}/>:null}<strong>{ref.id}</strong><small>{ref.production?.name||ref.fallback?.name||'Reference'}</small></div>)}</div></aside></div><section className="promptPanel"><div className="sectionHead"><div><span className="eyebrow">AI VIDEO PROMPT</span><h2>Vertical 9:16 generation prompt</h2></div><CopyButton value={`${shot.prompt}\nOUTPUT FORMAT: vertical 9:16 composition. Preserve full subject and required environment inside safe frame. Do not crop face, hands, or story-critical props.`}/></div><pre>{shot.prompt}{'\n\n'}OUTPUT FORMAT: vertical 9:16 composition. Preserve full subject and required environment inside safe frame. Do not crop face, hands, or story-critical props.</pre><div className="continuity"><strong>Continuity:</strong> {shot.continuity}</div><div className="cardActions"><Link className="button button-secondary" href={`/api/export/${shot.id}`}>Download shot JSON</Link></div></section><section className="reviewPanel"><span className="eyebrow">REVIEW</span><ReviewControls initial={shot.status}/><p className="muted">MVP: status control is local UI state. Phase 2 persists approvals, comments, and version history in PostgreSQL.</p></section></div>;
}

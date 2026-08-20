import { notFound } from 'next/navigation';
import Link from 'next/link';
import { assets, getAsset, getShot } from '@/lib/data';
import { AssetVisual } from '@/components/AssetVisual';
import { CopyButton } from '@/components/CopyButton';
import { ReviewControls } from '@/components/ReviewControls';
import { StatusBadge } from '@/components/StatusBadge';

export default async function ShotPage({ params }:{ params:Promise<{shotId:string}> }){
  const { shotId }=await params; const shot=getShot(shotId); if(!shot) notFound();
  const refs=shot.assetIds.map(getAsset).filter(Boolean);
  return <div className="page"><header className="hero compact"><div><span className="eyebrow accent">SHOT DETAIL</span><h1>{shot.id}</h1><p>{shot.timecode} • Story clock {shot.storyClock} • {shot.duration}s</p></div><StatusBadge status={shot.status}/></header><div className="shotDetail"><section className="shotCanvas"><AssetVisual src={shot.thumbnailUrl} alt={shot.id}/><div className="shotFacts"><span>{shot.camera}</span><span>{shot.locationId}</span><span>{shot.environmentId}</span><span>{shot.horror}</span></div><h2>{shot.action}</h2><p className="muted">Audio: {shot.audio}</p></section><aside className="inspector"><span className="eyebrow">REFERENCE ASSETS</span><div className="referenceGrid">{refs.map(asset=><div key={asset!.id}><AssetVisual src={asset!.url} alt={asset!.name}/><strong>{asset!.id}</strong><small>{asset!.name}</small></div>)}</div></aside></div><section className="promptPanel"><div className="sectionHead"><div><span className="eyebrow">AI VIDEO PROMPT</span><h2>BytePlus-ready prompt core</h2></div><CopyButton value={shot.prompt}/></div><pre>{shot.prompt}</pre><div className="continuity"><strong>Continuity:</strong> {shot.continuity}</div><div className="cardActions"><Link className="button button-secondary" href={`/api/export/${shot.id}`}>Download shot JSON</Link></div></section><section className="reviewPanel"><span className="eyebrow">REVIEW</span><ReviewControls initial={shot.status}/><p className="muted">MVP: status control is local UI state. Phase 2 persists approvals, comments, and version history in PostgreSQL.</p></section></div>;
}

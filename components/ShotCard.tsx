import Link from 'next/link';
import type { Shot } from '@/lib/types';
import { AssetVisual } from './AssetVisual';
import { StatusBadge } from './StatusBadge';

export function ShotCard({ shot }: { shot:Shot }){
  return <article className="shotCard"><AssetVisual src={shot.thumbnailUrl} alt={shot.id} downloadable={false}/><div className="shotBody"><div className="shotTitle"><div><span className="eyebrow">{shot.id}</span><h3>{shot.camera}</h3></div><StatusBadge status={shot.status}/></div><div className="metaRow"><span>{shot.timecode}</span><span>{shot.storyClock}</span><span>{shot.horror}</span></div><p>{shot.action}</p><div className="cardActions"><Link className="button button-secondary" href={`/shots/${shot.id}`}>Open shot</Link></div></div></article>;
}

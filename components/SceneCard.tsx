import Link from 'next/link';
import type { Scene } from '@/lib/types';
import { AssetVisual } from './AssetVisual';

export function SceneCard({ scene }: { scene:Scene }){
  const hero=scene.shots[0];
  return <article className="sceneCard"><div className="sceneHead"><div><span className="eyebrow">{scene.id}</span><h3>{scene.title}</h3></div><span className={`horror horror-${scene.horror.toLowerCase()}`}>{scene.horror}</span></div>{hero&&<AssetVisual src={hero.thumbnailUrl} alt={scene.title} downloadable={false}/>}<div className="metaRow"><span>{scene.timecode}</span><span>Story {scene.storyClock}</span><span>{scene.locationId}</span></div><p>{scene.objective}</p><div className="shotMiniGrid">{scene.shots.map(shot=><Link key={shot.id} href={`/shots/${shot.id}`} className="shotMini"><span>{shot.id.split('-').at(-1)}</span><strong>{shot.camera}</strong><small>{shot.timecode}</small></Link>)}</div></article>;
}

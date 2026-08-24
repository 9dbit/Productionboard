import Link from 'next/link';
import { allShots } from '@/lib/data';
import { StatusBadge } from '@/components/StatusBadge';

export default function ReviewPage(){const shots=allShots.filter(s=>['GENERATED','REVIEW','REVISION'].includes(s.status));return <div className="page"><header className="hero compact"><div><span className="eyebrow accent">EDITOR REVIEW</span><h1>Shot review queue</h1><p>Review face, environment, wardrobe, vehicle, timecode, camera, audio, and continuity before lock.</p></div></header><div className="queue">{shots.map(s=><Link href={`/shots/${s.id}`} className="queueItem" key={s.id}><div><span className="eyebrow">{s.id}</span><strong>{s.action}</strong></div><span>{s.storyClock}</span><span>{s.horror}</span><StatusBadge status={s.status}/></Link>)}</div></div>}

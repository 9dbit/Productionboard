import Link from 'next/link';
import { allShots } from '@/lib/data';
import { StatusBadge } from '@/components/StatusBadge';

export default function GenerationPage(){const queue=allShots.filter(s=>['DRAFT','REVISION'].includes(s.status));return <div className="page"><header className="hero compact"><div><span className="eyebrow accent">GENERATION QUEUE</span><h1>{queue.length} shots ready / pending</h1><p>Operator membuka shot, download references + JSON, lalu generate di AI video platform.</p></div></header><div className="queue">{queue.map(s=><Link href={`/shots/${s.id}`} className="queueItem" key={s.id}><div><span className="eyebrow">{s.id}</span><strong>{s.action}</strong></div><span>{s.timecode}</span><span>{s.camera}</span><StatusBadge status={s.status}/></Link>)}</div></div>}

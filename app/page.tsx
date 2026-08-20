import Link from 'next/link';
import { episodes, allShots } from '@/lib/data';
import { MetricCard } from '@/components/MetricCard';
import { StatusBadge } from '@/components/StatusBadge';

export default function Dashboard(){
  const approved=allShots.filter(s=>['APPROVED','LOCKED'].includes(s.status)).length;
  const generated=allShots.filter(s=>['GENERATED','REVIEW','APPROVED','LOCKED'].includes(s.status)).length;
  return <div className="page"><header className="hero"><div><span className="eyebrow accent">PROJECT DASHBOARD</span><h1>03:13 CASABLANCA</h1><p>Single source of truth untuk episode, scene, shot, asset, prompt, generation, review, dan lock.</p></div><Link href="/episodes/EP001" className="button">Open EP001</Link></header><section className="metrics"><MetricCard label="Episodes" value={80} hint="story arc locked"/><MetricCard label="Pilot shots" value={allShots.length} hint="EP001"/><MetricCard label="Generated / review" value={generated}/><MetricCard label="Approved / locked" value={approved}/></section><section className="section"><div className="sectionHead"><div><span className="eyebrow">PRODUCTION OVERVIEW</span><h2>Episodes</h2></div><span className="muted">80 episode master list</span></div><div className="episodeTable"><div className="tableRow tableHeader"><span>Episode</span><span>Title</span><span>Status</span><span>Progress</span><span></span></div>{episodes.map(ep=><div className="tableRow" key={ep.id}><strong>{ep.id}</strong><span>{ep.title}</span><StatusBadge status={ep.status}/><div className="progress"><i style={{width:`${ep.progress}%`}}/><span>{ep.progress}%</span></div><Link href={ep.number===1?`/episodes/${ep.id}`:'#'} className={ep.number===1?'textLink':'textLink disabled'}>{ep.number===1?'Open':'Queued'}</Link></div>)}</div></section></div>;
}

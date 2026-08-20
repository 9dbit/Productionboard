import { notFound } from 'next/navigation';
import { getEpisode } from '@/lib/data';
import { SceneCard } from '@/components/SceneCard';
import { StatusBadge } from '@/components/StatusBadge';

export default async function EpisodePage({ params }:{ params:Promise<{episodeId:string}> }){
  const { episodeId }=await params; const ep=getEpisode(episodeId); if(!ep) notFound();
  return <div className="page"><header className="hero compact"><div><span className="eyebrow accent">{ep.id}</span><h1>{ep.title}</h1><p>{ep.duration}s • {ep.scenes.length} scenes • {ep.scenes.reduce((n,s)=>n+s.shots.length,0)} shots</p></div><StatusBadge status={ep.status}/></header>{ep.scenes.length===0?<div className="emptyState"><h2>Episode belum di-breakdown.</h2><p>Gunakan EP001 sebagai template production workflow sebelum import episode berikutnya.</p></div>:<><section className="timeline"><span>00:00</span><div className="timelineTrack">{ep.scenes.map(scene=><div key={scene.id} className={`timelineSegment horror-bg-${scene.horror.toLowerCase()}`} style={{flex:scene.shots.reduce((n,s)=>n+s.duration,0)}} title={`${scene.id} ${scene.title}`}>{scene.id.replace(`${ep.id}-`,'')}</div>)}</div><span>01:28</span></section><section className="storyFacts"><div><span className="eyebrow">MYSTERY QUESTION</span><strong>{ep.mysteryQuestion}</strong></div><div><span className="eyebrow">REVEAL</span><strong>{ep.reveal}</strong></div><div><span className="eyebrow">CLIFFHANGER</span><strong>{ep.cliffhanger}</strong></div></section><section className="sceneGrid">{ep.scenes.map(scene=><SceneCard key={scene.id} scene={scene}/>)}</section></>}</div>;
}

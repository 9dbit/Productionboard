import Link from 'next/link';
import { MovieWorkspaceHeader } from '@/components/MovieWorkspaceHeader';
import { episodes } from '@/lib/data';
import { StatusBadge } from '@/components/StatusBadge';

export default function EpisodesPage(){
  return <div className="movieWorkspace page">
    <MovieWorkspaceHeader active="Episodes"/>
    <section className="workspaceIntro"><div><span className="eyebrow accent">EPISODE LIBRARY</span><h2>80 episode story arc</h2></div><p>Pilih episode untuk membuka storyboard, script mapping, image references, shot metadata, timecode, dan downloadable production assets.</p></section>
    <div className="episodeLibrary">
      {episodes.map(ep=>{const enabled=ep.number===1;return enabled?<Link key={ep.id} href={`/movies/casablanca/episodes/${ep.id}`} className="episodeLibraryCard activeEpisodeCard"><div className="episodeIndex">{String(ep.number).padStart(2,'0')}</div><div className="episodeLibraryCopy"><div className="episodeCardTop"><span className="eyebrow">{ep.id}</span><StatusBadge status={ep.status}/></div><h3>{ep.title}</h3><p>{ep.number===1?'8 scenes • 16 shots • 88 sec • full storyboard mapped':'Episode breakdown pending'}</p><div className="progress"><i style={{width:`${ep.progress}%`}}/><span>{ep.progress}% mapped</span></div></div><b>Open →</b></Link>:<article key={ep.id} className="episodeLibraryCard queuedEpisodeCard"><div className="episodeIndex">{String(ep.number).padStart(2,'0')}</div><div className="episodeLibraryCopy"><div className="episodeCardTop"><span className="eyebrow">{ep.id}</span><StatusBadge status={ep.status}/></div><h3>{ep.title}</h3><p>Script / storyboard breakdown pending.</p></div><b>Queued</b></article>})}
    </div>
  </div>;
}

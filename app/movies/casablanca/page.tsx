import Link from 'next/link';
import { assets, allShots, ep001 } from '@/lib/data';
import { MetricCard } from '@/components/MetricCard';
import { MovieWorkspaceHeader } from '@/components/MovieWorkspaceHeader';
import { StatusBadge } from '@/components/StatusBadge';

export default function MovieDashboard(){
  const characters=assets.filter(a=>a.kind==='CHARACTER').length;
  const environments=assets.filter(a=>a.kind==='ENVIRONMENT').length;
  const review=allShots.filter(s=>s.status==='REVIEW').length;
  const generated=allShots.filter(s=>['GENERATED','REVIEW','APPROVED','LOCKED'].includes(s.status)).length;
  return <div className="movieWorkspace page">
    <MovieWorkspaceHeader active="Dashboard"/>
    <section className="workspaceIntro"><div><span className="eyebrow accent">MOVIE DASHBOARD</span><h2>Production summary</h2></div><p>Ringkasan ini hanya menghitung data yang sudah dimapping ke production database. EP001 menjadi pilot sebelum breakdown 79 episode berikutnya.</p></section>
    <section className="metrics movieMetrics">
      <MetricCard label="Episodes" value={80} hint="master story arc"/>
      <MetricCard label="Scenes mapped" value={ep001.scenes.length} hint="EP001 pilot"/>
      <MetricCard label="Characters" value={characters} hint="locked character assets"/>
      <MetricCard label="Assets" value={assets.length} hint={`${environments} site/environment`}/>
    </section>
    <section className="movieDashboardGrid">
      <article className="dashboardModule primaryModule">
        <div className="moduleHead"><div><span className="eyebrow">ACTIVE EPISODE</span><h3>EP001 • {ep001.title}</h3></div><StatusBadge status={ep001.status}/></div>
        <p>{ep001.scenes.length} scenes • {allShots.length} shots • {ep001.duration} sec • story clock 02:46 → 03:13 WIB.</p>
        <div className="productionSteps"><div><span>Generated / Review</span><strong>{generated}/{allShots.length}</strong></div><div><span>Waiting Review</span><strong>{review}</strong></div><div><span>Scene Coverage</span><strong>8/8</strong></div><div><span>Script Mapping</span><strong>100%</strong></div></div>
        <div className="cardActions"><Link href="/movies/casablanca/episodes/EP001" className="button">Open EP001 Storyboard</Link><Link href="/movies/casablanca/script" className="button button-secondary">Open Script</Link></div>
      </article>
      <article className="dashboardModule"><span className="eyebrow">PRODUCTION TOOLS</span><h3>Editor & AI operator</h3><div className="workspaceLinkList"><Link href="/generation"><div><strong>Generation Queue</strong><small>Shots ready for AI video generation.</small></div><b>→</b></Link><Link href="/review"><div><strong>Review Queue</strong><small>Generated shots waiting for continuity review.</small></div><b>→</b></Link><Link href="/movies/casablanca/assets"><div><strong>Asset Locks</strong><small>Character angles, environments, vehicle, props.</small></div><b>→</b></Link></div></article>
      <article className="dashboardModule wideModule"><span className="eyebrow">PRODUCTION RULE</span><h3>Nothing is an orphan asset.</h3><p>Setiap image, dialogue, location, character reference, dan generated clip harus terhubung ke Episode → Scene → Shot → Timecode. Jika hubungan itu belum ada, asset belum siap digunakan dalam production.</p></article>
    </section>
  </div>;
}

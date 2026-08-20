import Link from 'next/link';
import { episodes, allShots } from '@/lib/data';
import { MetricCard } from '@/components/MetricCard';
import { StatusBadge } from '@/components/StatusBadge';

export default function Dashboard(){
  const approved=allShots.filter(s=>['APPROVED','LOCKED'].includes(s.status)).length;
  const generated=allShots.filter(s=>['GENERATED','REVIEW','APPROVED','LOCKED'].includes(s.status)).length;
  const review=allShots.filter(s=>s.status==='REVIEW').length;
  const draft=allShots.filter(s=>s.status==='DRAFT').length;
  const generationProgress=Math.round((generated/allShots.length)*100);
  const approvalProgress=Math.round((approved/allShots.length)*100);
  const visibleEpisodes=episodes.slice(0,8);
  const queuedEpisodes=episodes.slice(8);

  const episodeRow=(ep:(typeof episodes)[number])=><div className="tableRow" key={ep.id}>
    <strong>{ep.id}</strong>
    <div className="episodeTitleCell"><span>{ep.title}</span><small>{ep.number===1?'Pilot production':'Story arc queued'}</small></div>
    <StatusBadge status={ep.status}/>
    <div className="progress"><i style={{width:`${ep.progress}%`}}/><span>{ep.progress}%</span></div>
    <Link href={ep.number===1?`/episodes/${ep.id}`:'#'} className={ep.number===1?'textLink':'textLink disabled'}>{ep.number===1?'Open':'Queued'}</Link>
  </div>;

  return <div className="page dashboardPage">
    <header className="hero heroDashboard">
      <div className="heroCopy">
        <span className="eyebrow accent">PROJECT DASHBOARD</span>
        <h1>03:13 CASABLANCA</h1>
        <p>Single source of truth untuk episode, scene, shot, asset, prompt, generation, review, dan lock.</p>
      </div>
      <div className="heroActions">
        <Link href="/episodes/EP001" className="button">Open EP001</Link>
        <Link href="/review" className="button button-secondary">Review queue <span className="buttonCount">{review}</span></Link>
      </div>
    </header>

    <section className="productionPulse">
      <div className="pulseCopy">
        <span className="eyebrow">PILOT PRODUCTION PULSE</span>
        <strong>EP001 • Order Terakhir</strong>
        <span className="muted">16 shots • 8 scenes • 88 sec</span>
      </div>
      <div className="pulseBars">
        <div className="pulseRow"><span>Generated / review</span><div className="progress progressWide"><i style={{width:`${generationProgress}%`}}/><span>{generationProgress}%</span></div></div>
        <div className="pulseRow"><span>Approved / locked</span><div className="progress progressWide success"><i style={{width:`${approvalProgress}%`}}/><span>{approvalProgress}%</span></div></div>
      </div>
    </section>

    <section className="metrics">
      <MetricCard label="Episodes" value={80} hint="master story arc"/>
      <MetricCard label="Pilot shots" value={allShots.length} hint="EP001"/>
      <MetricCard label="Generated / review" value={generated} hint={`${review} waiting review`}/>
      <MetricCard label="Approved / locked" value={approved} hint={`${draft} draft shots left`}/>
    </section>

    <section className="dashboardSplit">
      <article className="activeEpisodePanel">
        <div className="sectionHead compactHead">
          <div><span className="eyebrow accent">ACTIVE PRODUCTION</span><h2>EP001 • Order Terakhir</h2></div>
          <StatusBadge status={episodes[0].status}/>
        </div>
        <p className="muted">Pilot workflow untuk memvalidasi scene → shot → asset → prompt → generation → review → lock sebelum scale ke 80 episode.</p>
        <div className="quickFacts">
          <div><span>Scenes</span><strong>8</strong></div>
          <div><span>Shots</span><strong>16</strong></div>
          <div><span>Review</span><strong>{review}</strong></div>
          <div><span>Draft</span><strong>{draft}</strong></div>
        </div>
        <div className="cardActions"><Link href="/episodes/EP001" className="button">Open storyboard</Link><Link href="/generation" className="button button-secondary">Generation queue</Link></div>
      </article>

      <aside className="attentionPanel">
        <span className="eyebrow">NEEDS ATTENTION</span>
        <h2>Editor focus</h2>
        <div className="attentionList">
          <Link href="/review"><span className="attentionDot reviewDot"/><div><strong>{review} shots waiting review</strong><small>Resolve before locking continuity.</small></div><b>→</b></Link>
          <Link href="/generation"><span className="attentionDot draftDot"/><div><strong>{draft} draft shots</strong><small>Ready for generation preparation.</small></div><b>→</b></Link>
          <Link href="/assets"><span className="attentionDot assetDot"/><div><strong>Reference assets locked</strong><small>Characters, environment, vehicle, props.</small></div><b>→</b></Link>
        </div>
      </aside>
    </section>

    <section className="section">
      <div className="sectionHead">
        <div><span className="eyebrow">PRODUCTION OVERVIEW</span><h2>Episode master list</h2></div>
        <span className="muted">80 episode story arc</span>
      </div>
      <div className="episodeTable">
        <div className="tableRow tableHeader"><span>Episode</span><span>Title</span><span>Status</span><span>Progress</span><span></span></div>
        {visibleEpisodes.map(episodeRow)}
        <details className="episodeMore">
          <summary>Show remaining {queuedEpisodes.length} episodes</summary>
          <div className="episodeMoreRows">{queuedEpisodes.map(episodeRow)}</div>
        </details>
      </div>
    </section>
  </div>;
}

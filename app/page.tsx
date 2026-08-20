import Link from 'next/link';
import { platformMovies } from '@/lib/produxion';

export default function Home(){
  return <div className="homePage">
    <section className="platformHero">
      <div className="platformHeroCopy">
        <span className="eyebrow accent">AI MOVIE PRODUCTION OPERATING SYSTEM</span>
        <h1>From script to locked shot.<br/><span>One production truth.</span></h1>
        <p>Produxion menghubungkan script, dialogue, episode, storyboard, character lock, site & environment, timecode, prompt AI, review, dan asset download dalam satu workspace film.</p>
        <div className="heroActions"><Link href="#movies" className="button">Explore Movies</Link><Link href="/movies/casablanca" className="button button-secondary">Open Active Production</Link></div>
      </div>
      <div className="platformHeroPanel">
        <div><span>01</span><strong>Script → Scene</strong><small>Dialogue, action, site, story clock, props.</small></div>
        <div><span>02</span><strong>Scene → Storyboard</strong><small>HD references, timecode, camera, download.</small></div>
        <div><span>03</span><strong>Assets → Continuity</strong><small>Character angles, environment, vehicle, props.</small></div>
        <div><span>04</span><strong>Review → Lock</strong><small>Generation, revision, approval, final lock.</small></div>
      </div>
    </section>

    <section className="platformIntro">
      <div><span className="eyebrow">WHY PRODUXION</span><h2>Production board yang tidak berhenti sebagai storyboard.</h2></div>
      <p>Setiap image dan asset harus tahu ia berada di film mana, episode mana, scene mana, shot mana, timecode berapa, karakter siapa, lokasi apa, dan fungsi dramatisnya. Produxion membuat semua hubungan itu terlihat dan bisa ditelusuri editor.</p>
    </section>

    <section id="movies" className="movieLibrarySection">
      <div className="sectionHead"><div><span className="eyebrow accent">MOVIE LIBRARY</span><h2>Productions</h2></div><span className="muted">Cover ratio 3:4 • click a movie to enter its workspace</span></div>
      <div className="movieCoverGrid">
        {platformMovies.map(movie=>{
          const active=movie.href!=='#';
          const card=<article className={active?'movieCoverCard':'movieCoverCard disabledMovie'}>
            <div className="movieCoverImage">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={movie.cover} alt={`${movie.title} cover`}/><span className="movieStatus">{movie.status}</span></div>
            <div className="movieCoverInfo"><span className="eyebrow">{movie.kicker}</span><h3>{movie.title}</h3><p>{movie.synopsis}</p><div className="movieCoverMeta"><span>{movie.episodes} episodes</span><b>{active?'Open workspace →':'Coming soon'}</b></div></div>
          </article>;
          return active?<Link href={movie.href} key={movie.slug}>{card}</Link>:<div key={movie.slug}>{card}</div>;
        })}
      </div>
    </section>
  </div>;
}

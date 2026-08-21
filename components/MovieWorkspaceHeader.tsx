import Link from 'next/link';
import { casablancaMovie, movieTabs } from '@/lib/produxion';
import { AssetVisual } from '@/components/AssetVisual';
import { casablancaCover } from '@/lib/media-manifest';

export function MovieWorkspaceHeader({ active }: { active:'Dashboard'|'Script'|'Episodes'|'Assets' }){
  return <>
    <section className="movieHero">
      <div className="moviePosterWrap">
        <AssetVisual src={casablancaCover.src} alt={`${casablancaMovie.title} cover`} ratio="9:16" fit="cover" className="moviePoster" downloadable={false}/>
      </div>
      <div className="movieHeroCopy">
        <span className="eyebrow accent">{casablancaMovie.kicker}</span>
        <h1>{casablancaMovie.title}</h1>
        <div className="movieMeta"><span>{casablancaMovie.status}</span><span>{casablancaMovie.episodes} EPISODES</span><span>VERTICAL 9:16</span><span>JAKARTA</span></div>
        <h3>Synopsis</h3>
        <p>{casablancaMovie.synopsis}</p>
        <div className="movieQuickLinks"><Link href="/review" className="button button-secondary">Review queue</Link><Link href="/generation" className="button button-secondary">Generation queue</Link></div>
      </div>
    </section>
    <nav className="movieTabs" aria-label="Movie production workspace">
      {movieTabs.map(([label,href])=><Link key={label} href={href} className={active===label?'movieTab active':'movieTab'}>{label}</Link>)}
    </nav>
  </>;
}

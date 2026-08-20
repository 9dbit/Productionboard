import Link from 'next/link';
import type { ReactNode } from 'react';

const nav=[
  ['Dashboard','/'],
  ['Episodes','/episodes/EP001'],
  ['Assets','/assets'],
  ['Generation','/generation'],
  ['Review','/review']
];

export function AppShell({ children }: { children:ReactNode }){
  return <div className="appShell">
    <aside className="sidebar">
      <div className="sidebarTop">
        <Link href="/" className="brand" aria-label="Productionboard dashboard">
          <span className="brandMark">03:13</span>
          <span>Productionboard</span>
          <span className="brandBadge">MVP</span>
        </Link>
        <nav aria-label="Production navigation">
          {nav.map(([label,href])=><Link key={href} href={href} className="navItem">{label}</Link>)}
        </nav>
      </div>
      <div className="sidebarFooter">
        <div className="eyebrow">PILOT PROJECT</div>
        <strong>03:13 CASABLANCA</strong>
        <span>80 episodes • EP001 in production</span>
      </div>
    </aside>
    <main className="workspace">{children}</main>
  </div>;
}

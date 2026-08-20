import Link from 'next/link';
import type { ReactNode } from 'react';

const nav=[
  ['Dashboard','/'],['Episodes','/episodes/EP001'],['Assets','/assets'],['Generation Queue','/generation'],['Review','/review']
];

export function AppShell({ children }: { children:ReactNode }){
  return <div className="appShell"><aside className="sidebar"><Link href="/" className="brand"><span className="brandMark">03:13</span><span>Productionboard</span></Link><nav>{nav.map(([label,href])=><Link key={href} href={href} className="navItem">{label}</Link>)}</nav><div className="sidebarFooter"><div className="eyebrow">PILOT PROJECT</div><strong>03:13 CASABLANCA</strong><span>80 episodes</span></div></aside><main className="workspace">{children}</main></div>;
}

import Link from 'next/link';
import type { ReactNode } from 'react';

export function AppShell({ children }: { children:ReactNode }){
  return <div className="produxionShell">
    <header className="platformBar">
      <Link href="/" className="produxionBrand" aria-label="Produxion home"><span className="brandGlyph">PX</span><strong>produxion</strong><span className="brandBadge">MVP</span></Link>
      <nav className="platformNav" aria-label="Platform navigation">
        <Link href="/">Home</Link>
        <Link href="/#movies">Movies</Link>
        <Link href="/movies/casablanca">Active production</Link>
      </nav>
    </header>
    <main className="workspace">{children}</main>
  </div>;
}

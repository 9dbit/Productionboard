import type { Metadata, Viewport } from 'next';
import './globals.css';
import './ui-polish.css';
import './produxion.css';
import './vertical-production.css';
import './mobile-production.css';
import './media-v2.css';
import { AppShell } from '@/components/AppShell';

export const metadata:Metadata={title:'Produxion — AI Movie Production OS',description:'Web-based production operating system for scripts, episodes, vertical 9:16 storyboards, characters, sites, environments, AI generation and editorial review.'};
export const viewport:Viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#070a0d'};

export default function RootLayout({ children }:{ children:React.ReactNode }){
  return <html lang="id"><body><AppShell>{children}</AppShell></body></html>;
}

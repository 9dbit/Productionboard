import type { Metadata, Viewport } from 'next';
import './globals.css';
import './ui-polish.css';
import { AppShell } from '@/components/AppShell';

export const metadata:Metadata={title:'Productionboard',description:'Web-based AI movie production operating system'};
export const viewport:Viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#080c11'};

export default function RootLayout({ children }:{ children:React.ReactNode }){
  return <html lang="id"><body><AppShell>{children}</AppShell></body></html>;
}

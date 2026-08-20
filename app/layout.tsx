import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/AppShell';

export const metadata:Metadata={title:'Productionboard',description:'Web-based AI movie production operating system'};

export default function RootLayout({ children }:{ children:React.ReactNode }){
  return <html lang="id"><body><AppShell>{children}</AppShell></body></html>;
}

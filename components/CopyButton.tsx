'use client';

import { useState } from 'react';

export function CopyButton({ value, label='Copy prompt' }: { value:string; label?:string }) {
  const [copied,setCopied]=useState(false);
  async function copy(){ await navigator.clipboard.writeText(value); setCopied(true); setTimeout(()=>setCopied(false),1200); }
  return <button className="button button-secondary" onClick={copy}>{copied?'Copied ✓':label}</button>;
}

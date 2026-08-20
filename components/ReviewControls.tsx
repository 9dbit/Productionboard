'use client';

import { useState } from 'react';

export function ReviewControls({ initial='REVIEW' }: { initial?:string }) {
  const [status,setStatus]=useState(initial);
  return <div className="reviewControls"><span className="muted">Local MVP state:</span><button onClick={()=>setStatus('REVISION')} className="button button-danger">Revision</button><button onClick={()=>setStatus('APPROVED')} className="button button-secondary">Approve</button><button onClick={()=>setStatus('LOCKED')} className="button">Lock</button><strong>{status}</strong></div>;
}

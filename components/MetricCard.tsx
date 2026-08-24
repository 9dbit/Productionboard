export function MetricCard({ label, value, hint }: { label:string; value:string|number; hint?:string }){
  return <div className="metricCard"><span className="eyebrow">{label}</span><strong>{value}</strong>{hint&&<small>{hint}</small>}</div>;
}

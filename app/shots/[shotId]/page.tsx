import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAsset, getShot } from '@/lib/data';
import { AssetVisual } from '@/components/AssetVisual';
import { AtlasVisual } from '@/components/AtlasVisual';
import { CopyButton } from '@/components/CopyButton';
import { ReviewControls } from '@/components/ReviewControls';
import { StatusBadge } from '@/components/StatusBadge';
import { productionAssetById } from '@/lib/production-assets';
import { storyboardMedia } from '@/lib/media-manifest';
import { ep001StoryboardV5, storyboardV5Candidate, storyboardV5Shot } from '@/lib/storyboard-v5';

export default async function ShotPage({ params }: { params: Promise<{ shotId: string }> }) {
  const { shotId } = await params;
  const shot = getShot(shotId);
  if (!shot) notFound();

  const storyMedia = storyboardMedia(shot.id);
  const v5Shot = shot.id.startsWith('EP001-') ? storyboardV5Shot(shot.id) : null;
  const candidate = shot.id.startsWith('EP001-') ? storyboardV5Candidate(shot.id) : null;
  const reviewSrc = candidate?.src ?? storyMedia?.src;
  const refs = shot.assetIds.map((id) => ({ id, production: productionAssetById(id), fallback: getAsset(id) }));

  return (
    <div className="page">
      <header className="hero compact">
        <div>
          <span className="eyebrow accent">VERTICAL SHOT DETAIL</span>
          <h1>{shot.id}</h1>
          <p>{shot.timecode} • Story clock {shot.storyClock} • {shot.duration}s • master frame 9:16</p>
        </div>
        <StatusBadge status={shot.status} />
      </header>

      <div className="shotDetail">
        <section className="shotCanvas verticalShotCanvas">
          {reviewSrc ? (
            <AssetVisual
              src={reviewSrc}
              alt={`${shot.id} vertical review master`}
              ratio="9:16"
              fit="contain"
              downloadable
              className="storyboardVerticalMedia"
              label={candidate ? 'V5 CANDIDATE' : storyMedia?.state}
            />
          ) : (
            <div className="emptyState">SOURCE REQUIRED • {shot.id}</div>
          )}

          <div className="shotFacts">
            <span>{shot.camera}</span><span>{shot.locationId}</span><span>{shot.environmentId}</span><span>{shot.horror}</span>
            <span>{candidate ? `${ep001StoryboardV5.width}×${ep001StoryboardV5.height} • review CANDIDATE` : storyMedia ? `${storyMedia.width}×${storyMedia.height} • runtime ${storyMedia.state}` : 'review SOURCE REQUIRED'}</span>
            {storyMedia ? <span>runtime {storyMedia.state}</span> : null}
            {v5Shot ? <span>V5 {v5Shot.sourceState} • {v5Shot.approvalState}</span> : null}
          </div>

          {v5Shot ? (
            <div className="continuity">
              <strong>V5 Master Gate:</strong> {v5Shot.file} • target {ep001StoryboardV5.width}×{ep001StoryboardV5.height} • package {ep001StoryboardV5.status}. {candidate ? 'HD candidate is displayed for review; runtime remains untouched.' : 'No V5 candidate has been registered yet.'}
            </div>
          ) : null}

          <h2>{shot.action}</h2>
          <p className="muted">Audio: {shot.audio}</p>
        </section>

        <aside className="inspector">
          <span className="eyebrow">REFERENCE ASSETS</span>
          <p className="muted inspectorHint">Environment/reference assets may temporarily retain native ratio/legacy atlas. The storyboard review master is standalone; promotion to runtime requires explicit V5 approval.</p>
          <div className="referenceGrid">
            {refs.map((ref) => (
              <div key={ref.id}>
                {ref.production ? <AtlasVisual tile={ref.production.atlas} alt={ref.production.name} /> : ref.fallback ? <AssetVisual src={ref.fallback.url} alt={ref.fallback.name} /> : null}
                <strong>{ref.id}</strong><small>{ref.production?.name || ref.fallback?.name || 'Reference'}</small>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="promptPanel">
        <div className="sectionHead">
          <div><span className="eyebrow">AI VIDEO PROMPT</span><h2>Vertical 9:16 generation prompt</h2></div>
          <CopyButton value={`${shot.prompt}\nOUTPUT FORMAT: vertical 9:16 composition. Preserve full subject and required environment inside safe frame. Do not crop face, hands, or story-critical props.`} />
        </div>
        <pre>{shot.prompt}{'\n\n'}OUTPUT FORMAT: vertical 9:16 composition. Preserve full subject and required environment inside safe frame. Do not crop face, hands, or story-critical props.</pre>
        <div className="continuity"><strong>Continuity:</strong> {shot.continuity}</div>
        {v5Shot ? <div className="continuity"><strong>V5 approval:</strong> source {v5Shot.sourceState}; review {v5Shot.approvalState}; runtime replacement allowed only after approval.</div> : null}
        <div className="cardActions"><Link className="button button-secondary" href={`/api/export/${shot.id}`}>Download shot JSON</Link></div>
      </section>

      <section className="reviewPanel">
        <span className="eyebrow">REVIEW</span>
        {v5Shot ? <p><strong>V5 master:</strong> {v5Shot.approvalState} • {v5Shot.sourceState} • {ep001StoryboardV5.width}×{ep001StoryboardV5.height}</p> : null}
        <ReviewControls initial={shot.status} />
        <p className="muted">MVP: status control is local UI state. V5 source approval is governed by the EP001 storyboard manifest and promotion gate; persistent per-user review history remains a later database phase.</p>
      </section>
    </div>
  );
}

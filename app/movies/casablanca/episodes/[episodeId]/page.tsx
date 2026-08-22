import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEpisode } from '@/lib/data';
import { MovieWorkspaceHeader } from '@/components/MovieWorkspaceHeader';
import { AssetVisual } from '@/components/AssetVisual';
import { StatusBadge } from '@/components/StatusBadge';
import { storyboardMedia } from '@/lib/media-manifest';
import {
  ep001StoryboardV5,
  storyboardV5ApprovalProgress,
  storyboardV5Candidate,
  storyboardV5CandidateProgress,
  storyboardV5Shot,
} from '@/lib/storyboard-v5';

export default async function EpisodeStoryboardPage({ params }: { params: Promise<{ episodeId: string }> }) {
  const { episodeId } = await params;
  const ep = getEpisode(episodeId);
  if (!ep) notFound();

  const v5 = episodeId === 'EP001' ? ep001StoryboardV5 : null;
  const v5Progress = episodeId === 'EP001' ? storyboardV5ApprovalProgress() : null;
  const v5Candidates = episodeId === 'EP001' ? storyboardV5CandidateProgress() : null;

  return (
    <div className="movieWorkspace page">
      <MovieWorkspaceHeader active="Episodes" />

      <section className="episodeStoryboardHeader">
        <div>
          <span className="eyebrow accent">VERTICAL STORYBOARD • {ep.id}</span>
          <h2>{ep.title}</h2>
          <p>{ep.duration}s • {ep.scenes.length} scenes • {ep.scenes.reduce((n, s) => n + s.shots.length, 0)} shots • master frame 9:16</p>
        </div>
        <div className="episodeHeaderActions">
          <StatusBadge status={ep.status} />
          <Link href="/movies/casablanca/script" className="button button-secondary">Open mapped script</Link>
        </div>
      </section>

      {v5 && v5Progress && v5Candidates ? (
        <section className="storyFacts">
          <div><span className="eyebrow">V5 MASTER GATE</span><strong>{v5.status}</strong></div>
          <div><span className="eyebrow">V5 CANDIDATES</span><strong>{v5Candidates.candidates}/{v5Candidates.total} • {v5.width}×{v5.height}</strong></div>
          <div><span className="eyebrow">V5 APPROVAL</span><strong>{v5Progress.approved}/{v5Progress.total} shots approved</strong></div>
        </section>
      ) : null}

      {ep.scenes.length === 0 ? (
        <div className="emptyState">Storyboard belum dibuat untuk episode ini.</div>
      ) : (
        <>
          <section className="timeline">
            <span>00:00</span>
            <div className="timelineTrack">
              {ep.scenes.map((scene) => (
                <div
                  key={scene.id}
                  className={`timelineSegment horror-bg-${scene.horror.toLowerCase()}`}
                  style={{ flex: scene.shots.reduce((n, s) => n + s.duration, 0) }}
                >
                  {scene.id.split('-').at(-1)}
                </div>
              ))}
            </div>
            <span>01:28</span>
          </section>

          <section className="storyFacts">
            <div><span className="eyebrow">MYSTERY QUESTION</span><strong>{ep.mysteryQuestion}</strong></div>
            <div><span className="eyebrow">REVEAL</span><strong>{ep.reveal}</strong></div>
            <div><span className="eyebrow">CLIFFHANGER</span><strong>{ep.cliffhanger}</strong></div>
          </section>

          <div className="storyboardSceneStack">
            {ep.scenes.map((scene) => (
              <section className="storyboardScene" key={scene.id}>
                <header>
                  <div>
                    <span className="eyebrow">{scene.id}</span>
                    <h3>{scene.title}</h3>
                    <p>{scene.objective}</p>
                  </div>
                  <span className={`horror horror-${scene.horror.toLowerCase()}`}>{scene.horror}</span>
                </header>

                <div className="sceneProductionMeta">
                  <span>{scene.timecode}</span><span>Story {scene.storyClock}</span><span>{scene.locationId}</span>
                  <span>{scene.environmentId}</span><span>{scene.characters.join(', ')}</span><span>FRAME 9:16</span>
                </div>

                <div className="storyboardShotGrid">
                  {scene.shots.map((shot) => {
                    const media = storyboardMedia(shot.id);
                    const v5Shot = episodeId === 'EP001' ? storyboardV5Shot(shot.id) : null;
                    const candidate = episodeId === 'EP001' ? storyboardV5Candidate(shot.id) : null;
                    const reviewSrc = candidate?.src ?? media?.src;
                    const reviewLabel = candidate ? 'V5 CANDIDATE' : media?.state;

                    return (
                      <article className="storyboardShot" key={shot.id}>
                        {reviewSrc ? (
                          <AssetVisual
                            src={reviewSrc}
                            alt={`${shot.id} vertical storyboard review`}
                            ratio="9:16"
                            fit="contain"
                            downloadable
                            className="storyboardVerticalMedia"
                            label={reviewLabel}
                          />
                        ) : (
                          <div className="emptyState">SOURCE REQUIRED • {shot.id}</div>
                        )}

                        <div className="storyboardShotBody">
                          <div className="shotTitle">
                            <div><span className="eyebrow">{shot.id}</span><h4>{shot.camera}</h4></div>
                            <StatusBadge status={shot.status} />
                          </div>
                          <div className="shotTimeRow">
                            <strong>{shot.timecode}</strong><span>{shot.storyClock} WIB</span><span>{shot.horror}</span>
                            <span>{candidate && v5 ? `${v5.width}×${v5.height} • review CANDIDATE` : media ? `${media.width}×${media.height} • runtime ${media.state}` : 'review SOURCE REQUIRED'}</span>
                            {media ? <span>runtime {media.state}</span> : null}
                            {v5Shot ? <span>V5 {v5Shot.sourceState} • {v5Shot.approvalState}</span> : null}
                          </div>
                          <p>{shot.action}</p>
                          <dl>
                            <div><dt>Site</dt><dd>{shot.locationId}</dd></div>
                            <div><dt>Environment</dt><dd>{shot.environmentId}</dd></div>
                            <div><dt>Audio</dt><dd>{shot.audio}</dd></div>
                            <div><dt>Characters</dt><dd>{shot.characterIds.join(', ')}</dd></div>
                            {v5Shot ? <div><dt>V5 Master</dt><dd>{v5Shot.file} • {v5?.width}×{v5?.height}</dd></div> : null}
                          </dl>
                          <details className="shotPrompt">
                            <summary>AI prompt & continuity</summary>
                            <p>{shot.prompt}</p><small>{shot.continuity}</small>
                          </details>
                          <div className="cardActions"><Link href={`/shots/${shot.id}`} className="button button-secondary">Open shot inspector</Link></div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

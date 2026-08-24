import manifest from '@/public/production-assets/v5/storyboards/EP001/manifest.json';
import candidateSources from '@/public/production-assets/v5/storyboards/EP001/candidate-sources.json';

export type StoryboardV5Shot = (typeof manifest.shots)[number];
export type StoryboardV5Candidate = (typeof candidateSources.items)[number] & { src: string };

export const ep001StoryboardV5 = manifest;

const candidateByShot = new Map(candidateSources.items.map((item) => [item.shot, item]));

function shotNameFor(shot: StoryboardV5Shot) {
  return shot.file.replace('.png', '');
}

export function storyboardV5Candidate(shotId: string): StoryboardV5Candidate | null {
  const shot = manifest.shots.find((item) => item.id === shotId);
  if (!shot) return null;
  const candidate = candidateByShot.get(shotNameFor(shot));
  return candidate ? { ...candidate, src: `/production-assets/v5/storyboards/EP001/${candidate.file}` } : null;
}

export function storyboardV5Shot(shotId: string): StoryboardV5Shot | null {
  const shot = manifest.shots.find((item) => item.id === shotId);
  if (!shot) return null;
  return candidateByShot.has(shotNameFor(shot)) ? { ...shot, sourceState: 'CANDIDATE' } : shot;
}

export function storyboardV5CandidateProgress() {
  return { candidates: candidateSources.items.length, total: manifest.shotCount };
}

export function storyboardV5ApprovalProgress() {
  const approved = manifest.shots.filter((shot) => shot.approvalState === 'APPROVED').length;
  return { approved, total: manifest.shotCount };
}

export function storyboardV5PromotionReady() {
  const progress = storyboardV5ApprovalProgress();
  return manifest.status === 'LOCKED' && progress.approved === progress.total;
}

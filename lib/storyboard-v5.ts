import manifest from '@/public/production-assets/v5/storyboards/EP001/manifest.json';
import candidateSources from '@/public/production-assets/v5/storyboards/EP001/candidate-sources.json';

export type StoryboardV5Shot = (typeof manifest.shots)[number];

export const ep001StoryboardV5 = manifest;

const candidateShots = new Set(candidateSources.items.map((item) => item.shot));

export function storyboardV5Shot(shotId: string): StoryboardV5Shot | null {
  const shot = manifest.shots.find((item) => item.id === shotId);
  if (!shot) return null;
  const shotName = shot.file.replace('.png', '');
  return candidateShots.has(shotName) ? { ...shot, sourceState: 'CANDIDATE' } : shot;
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

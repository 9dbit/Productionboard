import manifest from '@/public/production-assets/v5/storyboards/EP001/manifest.json';

export type StoryboardV5Shot = (typeof manifest.shots)[number];

export const ep001StoryboardV5 = manifest;

export function storyboardV5Shot(shotId: string): StoryboardV5Shot | null {
  return manifest.shots.find((shot) => shot.id === shotId) ?? null;
}

export function storyboardV5ApprovalProgress() {
  const approved = manifest.shots.filter((shot) => shot.approvalState === 'APPROVED').length;
  return { approved, total: manifest.shotCount };
}

export function storyboardV5PromotionReady() {
  const progress = storyboardV5ApprovalProgress();
  return manifest.status === 'LOCKED' && progress.approved === progress.total;
}

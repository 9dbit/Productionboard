export type EpisodeStatus = 'SCRIPT' | 'PRODUCTION' | 'REVIEW' | 'APPROVED' | 'LOCKED' | 'PLANNING';
export type ShotStatus = 'DRAFT' | 'GENERATED' | 'REVIEW' | 'REVISION' | 'APPROVED' | 'LOCKED';
export type HorrorLevel = 'H0' | 'H1' | 'H2' | 'H3' | 'H4' | 'H5';
export type AssetKind = 'CHARACTER' | 'ENVIRONMENT' | 'VEHICLE' | 'PROP' | 'AUDIO';

export interface Asset {
  id: string;
  name: string;
  kind: AssetKind;
  siteId?: string;
  url: string;
  description: string;
  status: 'DRAFT' | 'REVIEW' | 'LOCKED' | 'RETIRED';
}

export interface Shot {
  id: string;
  sceneId: string;
  timecode: string;
  storyClock: string;
  duration: number;
  camera: string;
  action: string;
  audio: string;
  horror: HorrorLevel;
  status: ShotStatus;
  locationId: string;
  environmentId: string;
  characterIds: string[];
  assetIds: string[];
  thumbnailUrl: string;
  prompt: string;
  continuity: string;
}

export interface Scene {
  id: string;
  title: string;
  timecode: string;
  storyClock: string;
  locationId: string;
  environmentId: string;
  objective: string;
  characters: string[];
  horror: HorrorLevel;
  shots: Shot[];
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  duration: number;
  status: EpisodeStatus;
  progress: number;
  mysteryQuestion?: string;
  reveal?: string;
  cliffhanger?: string;
  scenes: Scene[];
}

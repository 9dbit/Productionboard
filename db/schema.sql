-- Productionboard Phase 2 reference schema (PostgreSQL)
create table projects (id text primary key, name text not null, created_at timestamptz default now());
create table episodes (id text primary key, project_id text references projects(id), number int not null, title text not null, duration_seconds int, status text not null, progress int default 0);
create table scenes (id text primary key, episode_id text references episodes(id), title text not null, timecode_start_ms int, timecode_end_ms int, story_clock_start text, story_clock_end text, location_id text, objective text, horror_level text);
create table shots (id text primary key, scene_id text references scenes(id), timecode_start_ms int, timecode_end_ms int, story_clock text, duration_seconds int, camera text, action text, audio text, horror_level text, status text, prompt text, continuity text, current_version int default 0);
create table assets (id text primary key, project_id text references projects(id), kind text not null, name text not null, storage_key text not null, mime_type text, width int, height int, status text, metadata jsonb default '{}'::jsonb);
create table shot_assets (shot_id text references shots(id), asset_id text references assets(id), role text not null, priority int default 10, primary key(shot_id,asset_id,role));
create table shot_versions (id bigserial primary key, shot_id text references shots(id), version int not null, storage_key text not null, status text not null, notes text, created_at timestamptz default now(), unique(shot_id,version));
create table comments (id bigserial primary key, shot_id text references shots(id), author_id text, body text not null, created_at timestamptz default now());
create table approvals (id bigserial primary key, shot_id text references shots(id), version int not null, reviewer_id text, decision text not null, checklist jsonb default '{}'::jsonb, created_at timestamptz default now());
create index shots_scene_id_idx on shots(scene_id);
create index assets_project_id_idx on assets(project_id);
create index comments_shot_id_idx on comments(shot_id);

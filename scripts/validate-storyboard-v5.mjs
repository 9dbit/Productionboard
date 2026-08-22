import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dir = path.join(root, 'public/production-assets/v5/storyboards/EP001');
const manifestPath = path.join(dir, 'manifest.json');

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
}

function readPngSize(file) {
  const fd = fs.openSync(file, 'r');
  try {
    const buffer = Buffer.alloc(24);
    const bytes = fs.readSync(fd, buffer, 0, 24, 0);
    if (bytes < 24) throw new Error('file too small');
    const signature = buffer.subarray(0, 8).toString('hex');
    if (signature !== '89504e470d0a1a0a') throw new Error('not a PNG');
    if (buffer.subarray(12, 16).toString('ascii') !== 'IHDR') throw new Error('missing IHDR');
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  } finally {
    fs.closeSync(fd);
  }
}

if (!fs.existsSync(manifestPath)) {
  fail(`manifest missing: ${manifestPath}`);
  process.exit();
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const expectedCount = 16;
const expectedWidth = 1080;
const expectedHeight = 1920;
const hardGate = ['REVIEW', 'LOCKED'].includes(manifest.status);

if (manifest.shotCount !== expectedCount) fail(`manifest shotCount must be ${expectedCount}`);
if (manifest.width !== expectedWidth || manifest.height !== expectedHeight) {
  fail(`manifest dimensions must be ${expectedWidth}x${expectedHeight}`);
}
if (manifest.aspectRatio !== '9:16') fail('manifest aspectRatio must be 9:16');
if (!Array.isArray(manifest.shots) || manifest.shots.length !== expectedCount) {
  fail(`manifest must contain exactly ${expectedCount} shot records`);
}

const present = [];
const missing = [];

for (let i = 1; i <= expectedCount; i += 1) {
  const name = `SH${String(i).padStart(2, '0')}.png`;
  const file = path.join(dir, name);
  if (!fs.existsSync(file)) {
    missing.push(name);
    continue;
  }

  present.push(name);
  try {
    const { width, height } = readPngSize(file);
    if (width !== expectedWidth || height !== expectedHeight) {
      fail(`${name} is ${width}x${height}; expected ${expectedWidth}x${expectedHeight}`);
    }
  } catch (error) {
    fail(`${name}: ${error.message}`);
  }
}

const duplicateFiles = fs.readdirSync(dir).filter((name) => /^SH\d+\.png$/i.test(name) && !/^SH(?:0[1-9]|1[0-6])\.png$/.test(name));
if (duplicateFiles.length) fail(`unexpected storyboard PNG names: ${duplicateFiles.join(', ')}`);

for (const shot of manifest.shots ?? []) {
  const expectedFile = `SH${String(shot.index).padStart(2, '0')}.png`;
  if (shot.file !== expectedFile) fail(`${shot.id}: file must be ${expectedFile}`);
  if (!/^EP001-SC\d{2}-SH\d{2}$/.test(shot.id)) fail(`invalid shot id: ${shot.id}`);
  if (!['PENDING', 'APPROVED', 'REJECTED'].includes(shot.approvalState)) {
    fail(`${shot.id}: invalid approvalState ${shot.approvalState}`);
  }
  if (hardGate && shot.approvalState !== 'APPROVED') {
    fail(`${shot.id}: ${manifest.status} requires approvalState APPROVED`);
  }
}

if (hardGate && missing.length) {
  fail(`${manifest.status} requires all ${expectedCount} masters; missing: ${missing.join(', ')}`);
}

if (manifest.status === 'LOCKED' && present.length === expectedCount) {
  console.log('LOCKED gate passed: all 16 approved 1080x1920 PNG masters are present.');
} else {
  console.log(`Storyboard V5 validation: ${present.length}/${expectedCount} source PNGs present; status=${manifest.status}.`);
  if (missing.length) console.log(`Missing: ${missing.join(', ')}`);
  if (!hardGate) console.log('Partial ingest is allowed until manifest status becomes REVIEW or LOCKED.');
}

if (process.exitCode) process.exit(process.exitCode);

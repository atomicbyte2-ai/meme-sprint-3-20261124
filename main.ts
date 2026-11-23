// Meme Sprint 3: AI Agent Goes Rogue — entry builder.
// Validates the bundled entry.png (real PNG, <= 1 MiB, <= 1024x1024)
// and copies it to the output directory as entry.png.
// No network, no relative paths: everything resolves from this file's dir.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1048576; // 1 MiB
const MAX_DIM = 1024;

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDir, "entry.png");

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const destPath = join(outputDir, "entry.png");

function fail(message: string): never {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function sha256(buf: Buffer): string {
  return createHash("sha256").update(buf).digest("hex");
}

if (!existsSync(sourcePath)) fail(`entry image not found: ${sourcePath}`);

const buf = readFileSync(sourcePath);
const size = statSync(sourcePath).size;

// PNG signature: 89 50 4E 47 0D 0A 1A 0A
const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (buf.length < 33 || !buf.subarray(0, 8).equals(PNG_SIG)) {
  fail("entry.png is not a valid PNG (bad signature)");
}

// IHDR chunk: width at bytes 16-19, height at bytes 20-23 (big-endian uint32).
// Bytes 12-15 must read "IHDR" and byte 24/25 carry bit depth / color type.
if (buf.subarray(12, 16).toString("latin1") !== "IHDR") {
  fail("entry.png is not a valid PNG (missing IHDR chunk)");
}
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
const bitDepth = buf[24];
const colorType = buf[25];
if (width === 0 || height === 0) fail("entry.png has zero width or height");
if (width > MAX_DIM || height > MAX_DIM) {
  fail(`entry.png is ${width}x${height}, exceeds ${MAX_DIM}x${MAX_DIM}`);
}
if (size > MAX_BYTES) {
  fail(`entry.png is ${size} bytes, exceeds ${MAX_BYTES} bytes`);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(sourcePath, destPath);

// Verify the copy is byte-identical.
const copied = readFileSync(destPath);
if (!copied.equals(buf)) fail("copied entry.png does not match source");

console.log("OK: entry.png validated and copied");
console.log(`  source: ${sourcePath}`);
console.log(`  dest:   ${destPath}`);
console.log(`  format: PNG ${width}x${height} (bit depth ${bitDepth}, color type ${colorType})`);
console.log(`  size:   ${size} bytes (limit ${MAX_BYTES})`);
console.log(`  sha256: ${sha256(buf)}`);

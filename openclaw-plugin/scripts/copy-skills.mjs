import { cpSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const src = join(dir, "..", "..", "skills");
const dest = join(dir, "..", "skills");

if (!existsSync(src)) {
  console.error(`✗ Source skills directory not found: ${src}`);
  process.exit(1);
}

try {
  rmSync(dest, { recursive: true, force: true });
  cpSync(src, dest, { recursive: true });
  console.log("✓ skills copied from ../skills");
} catch (err) {
  console.error(`✗ Failed to copy skills: ${err.message}`);
  process.exit(1);
}

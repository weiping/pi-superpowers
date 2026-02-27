import { cpSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const src = join(dir, "..", "..", "skills");
const dest = join(dir, "..", "skills");

rmSync(dest, { recursive: true, force: true });
cpSync(src, dest, { recursive: true });
console.log("✓ skills copied from ../skills");

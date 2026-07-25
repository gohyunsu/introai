import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import vm from "node:vm";

const root = process.cwd();
const errors = [];
const forbidden = new Set([".pdf", ".ppt", ".pptx", ".ipynb", ".zip", ".csv", ".npy", ".h5", ".keras", ".pkl", ".joblib"]);

async function walk(directory) {
  const entries = await readdir(directory);
  const files = [];
  for (const entry of entries) {
    if (entry === ".git" || entry === "node_modules") continue;
    const path = join(directory, entry);
    const info = await stat(path);
    if (info.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

const files = await walk(root);
for (const file of files) {
  if (forbidden.has(extname(file).toLowerCase())) {
    errors.push(`공개 금지 확장자: ${file}`);
  }
}

for (const html of files.filter(file => extname(file) === ".html")) {
  const source = await readFile(html, "utf8");
  const links = [...source.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(match => match[1]);
  for (const link of links) {
    if (/^(https?:|data:|mailto:|#)/.test(link)) continue;
    const clean = link.split(/[?#]/)[0];
    if (!clean) continue;
    const target = resolve(dirname(html), clean);
    try {
      await stat(target);
    } catch {
      errors.push(`깨진 로컬 링크: ${html} → ${link}`);
    }
  }
}

const dataSource = await readFile(join(root, "data.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(dataSource, sandbox);
const chapters = sandbox.window.CHAPTERS;
if (!Array.isArray(chapters) || chapters.length !== 11) {
  errors.push(`장 수가 11개가 아님: ${chapters?.length}`);
} else {
  const ids = new Set(chapters.map(chapter => chapter.id));
  if (ids.size !== chapters.length) errors.push("중복 chapter id가 있음");
  chapters.forEach(chapter => {
    if (!chapter.sections?.length || !chapter.quiz?.length || !chapter.interactive?.type) {
      errors.push(`불완전한 장 데이터: ${chapter.id}`);
    }
    chapter.sources?.forEach(([label, url]) => {
      if (!label || !/^https:\/\//.test(url)) errors.push(`잘못된 출처 링크: ${chapter.id} ${url}`);
    });
  });
}

if (errors.length) {
  console.error(`검증 실패 (${errors.length})`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`검증 통과: ${files.length} files · ${chapters.length} chapters · 공개 금지 자료 0`);

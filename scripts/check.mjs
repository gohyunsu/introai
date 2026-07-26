import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import vm from "node:vm";
import katex from "../vendor/katex/katex.mjs";

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
const theorySource = await readFile(join(root, "theory.js"), "utf8");
const practiceSource = await readFile(join(root, "practice.js"), "utf8");
const masterySource = await readFile(join(root, "mastery.js"), "utf8");
const visualNotesSource = await readFile(join(root, "visual-notes.js"), "utf8");
const appSource = await readFile(join(root, "app.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(dataSource, sandbox);
vm.runInNewContext(theorySource, sandbox);
vm.runInNewContext(practiceSource, sandbox);
vm.runInNewContext(masterySource, sandbox);
vm.runInNewContext(visualNotesSource, sandbox);
const chapters = sandbox.window.CHAPTERS;
const visuals = sandbox.window.VISUALS;
const media = sandbox.window.MEDIA;

const highlighterHelpers = appSource.match(/  function escapeHtml[\s\S]*?(?=\n  function getProgress)/)?.[0];
if (!highlighterHelpers) {
  errors.push("코드 하이라이터 함수를 찾을 수 없음");
} else {
  const highlighterSandbox = {};
  const sampleCode = `from sklearn import metrics
model.fit(X)  # fit class "quoted"
label = "C# sample"
print("<unsafe>")`;
  vm.runInNewContext(
    `${highlighterHelpers}\nthis.highlighted = codeHighlight(${JSON.stringify(sampleCode)});`,
    highlighterSandbox
  );
  const highlighted = highlighterSandbox.highlighted;
  const expectedTokens = [
    '<span class="code-key">from</span>',
    '<span class="code-fn">fit</span>',
    '<span class="code-comment"># fit class &quot;quoted&quot;</span>',
    '<span class="code-string">&quot;C# sample&quot;</span>',
    '<span class="code-string">&quot;&lt;unsafe&gt;&quot;</span>'
  ];
  expectedTokens.forEach(token => {
    if (!highlighted.includes(token)) errors.push(`코드 하이라이트 토큰 누락: ${token}`);
  });
  if (highlighted.includes("<span <span") || highlighted.includes("&lt;span")) {
    errors.push("코드 하이라이트 태그가 다시 토큰화됨");
  }
  const openedSpans = [...highlighted.matchAll(/<span\b/g)].length;
  const closedSpans = [...highlighted.matchAll(/<\/span>/g)].length;
  if (openedSpans !== closedSpans) {
    errors.push(`코드 하이라이트 span 불균형: ${openedSpans}/${closedSpans}`);
  }
}

if (!Array.isArray(chapters) || chapters.length !== 12) {
  errors.push(`장 수가 12개가 아님: ${chapters?.length}`);
} else {
  const ids = new Set(chapters.map(chapter => chapter.id));
  if (ids.size !== chapters.length) errors.push("중복 chapter id가 있음");
  chapters.forEach(chapter => {
    if (!chapter.sections?.length || !chapter.quiz?.length || !chapter.interactive?.type) {
      errors.push(`불완전한 장 데이터: ${chapter.id}`);
    }
    const sectionIds = new Set(chapter.sections.map(section => section.id));
    if (sectionIds.size !== chapter.sections.length) {
      errors.push(`중복 section id가 있음: ${chapter.id}`);
    }
    chapter.sources?.forEach(([label, url]) => {
      if (!label || !/^https:\/\//.test(url)) errors.push(`잘못된 출처 링크: ${chapter.id} ${url}`);
    });
  });

  const topicCount = chapters.reduce((sum, chapter) => sum + chapter.sections.length, 0);
  if (topicCount < 160) errors.push(`상세 이론·실습 주제가 160개 미만임: ${topicCount}`);

  const requiredCoverage = {
    "01-ai-map": ["전문가 시스템", "모집단", "강화학습"],
    "02-ml-knn": ["하이퍼파라미터", "차원의 저주", "predict_proba"],
    "03-data": ["데이터 누출", "column_stack", "호모그래피", "Pipeline"],
    "04-regression": ["RMSE", "정규방정식", "다중공선성", "Lasso"],
    "05-classification": ["로짓", "원-핫", "미니배치", "RBF"],
    "06-trees": ["OOB", "RandomizedSearchCV", "Extra Trees", "CatBoost"],
    "07-unsupervised": ["K-means++", "실루엣", "SVD", "역변환"],
    "08-deep-learning": ["Leaky ReLU", "mixed precision", "gradient accumulation", "ModelCheckpoint"],
    "09-cnn": ["cross-correlation", "Batch Normalization", "Global Average Pooling", "미세조정"],
    "10-rnn": ["many-to-one", "BPTT", "OOV", "GRU", "Temperature"],
    "11-dli-practicum": ["JupyterLab", "compile contract", "NaN", "평가 체크리스트"],
    "12-anomaly": ["PR-AUC", "contamination", "경보 예산", "재구성 오차"]
  };

  chapters.forEach(chapter => {
    const text = [
      chapter.title,
      chapter.subtitle,
      ...chapter.keywords,
      ...chapter.sections.flatMap(section => [section.title, section.body || "", section.afterBody || "", section.equation?.note || ""])
    ].join(" ");
    for (const term of requiredCoverage[chapter.id] || []) {
      if (!text.toLowerCase().includes(term.toLowerCase())) {
        errors.push(`핵심 이론 누락: ${chapter.id} → ${term}`);
      }
    }
  });

  const requiredLabs = {
    "02-ml-knn": ["fish-knn-lab"],
    "03-data": ["split-scale-lab", "eda-lab"],
    "04-regression": ["perch-regression-lab", "regularized-regression-lab"],
    "05-classification": ["fish-multiclass-lab", "sgd-svm-lab"],
    "06-trees": ["wine-tree-lab", "tree-search-lab", "tree-ensemble-lab"],
    "07-unsupervised": ["fruit-kmeans-lab", "fruit-pca-lab"],
    "08-deep-learning": ["fashion-mnist-mlp-lab", "keras-training-tools-lab"],
    "09-cnn": ["fashion-cnn-lab", "asl-cnn-lab", "cnn-feature-map-lab", "vgg-transfer-lab"],
    "10-rnn": ["imdb-rnn-lab", "headline-generator-lab"],
    "11-dli-practicum": ["assessment-blueprint"],
    "12-anomaly": ["anomaly-pipeline-lab"]
  };

  chapters.forEach(chapter => {
    const ids = new Set(chapter.sections.map(section => section.id));
    for (const labId of requiredLabs[chapter.id] || []) {
      const lab = chapter.sections.find(section => section.id === labId);
      if (!ids.has(labId)) errors.push(`핵심 실습 누락: ${chapter.id} → ${labId}`);
      if (lab && !lab.codes?.length && !lab.code) errors.push(`실습 코드 누락: ${chapter.id} → ${labId}`);
    }

    const hasInlineMedia = chapter.sections.some(section => (
      section.visuals?.length || section.videos?.length
    ));
    if (!hasInlineMedia) errors.push(`장 본문 시각 자료 누락: ${chapter.id}`);

    const inlineVisualIds = new Set(chapter.sections.flatMap(section => section.visuals || []));
    if (inlineVisualIds.size < 2) {
      errors.push(`장 본문 시각 자료가 2개 미만임: ${chapter.id} → ${inlineVisualIds.size}`);
    }
  });

  const codeCount = chapters.reduce((sum, chapter) => (
    sum + chapter.sections.reduce((sectionSum, section) => (
      sectionSum + (section.code ? 1 : 0) + (section.codes?.length || 0)
    ), 0)
  ), 0);
  if (codeCount < 75) errors.push(`설명용 코드 블록이 75개 미만임: ${codeCount}`);

  let formulaCount = 0;
  const renderFormula = (tex, location) => {
    formulaCount += 1;
    try {
      katex.renderToString(tex, {
        displayMode: false,
        throwOnError: true,
        strict: "warn",
        output: "htmlAndMathml"
      });
    } catch (error) {
      errors.push(`KaTeX 수식 오류: ${location} → ${error.message}`);
    }
  };

  chapters.forEach(chapter => {
    chapter.sections.forEach(section => {
      if (section.equation?.tex) {
        renderFormula(section.equation.tex, `${chapter.id}/${section.id}/equation`);
      }
      const content = `${section.body || ""}\n${section.afterBody || ""}`;
      const patterns = [
        ["inline", /\\\(([\s\S]*?)\\\)/g],
        ["display", /\\\[([\s\S]*?)\\\]/g],
        ["display-dollar", /\$\$([\s\S]*?)\$\$/g]
      ];
      patterns.forEach(([kind, pattern]) => {
        for (const match of content.matchAll(pattern)) {
          renderFormula(match[1], `${chapter.id}/${section.id}/${kind}`);
        }
      });

      const delimiterPairs = [
        ["\\(", "\\)"],
        ["\\[", "\\]"],
        ["$$", "$$"]
      ];
      delimiterPairs.forEach(([left, right]) => {
        const leftCount = content.split(left).length - 1;
        const rightCount = content.split(right).length - 1;
        if (left === right ? leftCount % 2 : leftCount !== rightCount) {
          errors.push(`수식 구분자 불일치: ${chapter.id}/${section.id} → ${left} ${right}`);
        }
      });
    });
  });
  if (formulaCount < 80) errors.push(`검증한 수식이 80개 미만임: ${formulaCount}`);
}

if (!Array.isArray(visuals) || visuals.length < 25) {
  errors.push(`공개 시각 자료가 25개 미만임: ${visuals?.length}`);
} else {
  const visualIds = new Set(visuals.map(visual => visual.id));
  if (visualIds.size !== visuals.length) errors.push("중복 visual id가 있음");
  for (const visual of visuals) {
    if (!visual.id || !visual.src || !visual.source || !visual.author || !visual.license) {
      errors.push(`불완전한 시각 자료 메타데이터: ${visual?.id}`);
      continue;
    }
    try {
      await stat(resolve(root, visual.src));
    } catch {
      errors.push(`시각 자료 파일 없음: ${visual.src}`);
    }
  }
  chapters?.forEach(chapter => {
    chapter.sections.forEach(section => {
      section.visuals?.forEach(id => {
        if (!visualIds.has(id)) {
          errors.push(`시각 자료 참조 누락: ${chapter.id}/${section.id} → ${id}`);
        }
      });
    });
  });
}

if (!Array.isArray(media) || media.length < 18) {
  errors.push(`공개 영상이 18개 미만임: ${media?.length}`);
} else {
  const videoIds = new Set(media.map(item => item.videoId));
  chapters?.forEach(chapter => {
    chapter.sections.forEach(section => {
      section.videos?.forEach(id => {
        if (!videoIds.has(id) && !media.some(item => item.id === id)) {
          errors.push(`영상 참조 누락: ${chapter.id}/${section.id} → ${id}`);
        }
      });
    });
  });
}

if (errors.length) {
  console.error(`검증 실패 (${errors.length})`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

const topicCount = chapters.reduce((sum, chapter) => sum + chapter.sections.length, 0);
const formulaCount = chapters.reduce((sum, chapter) => (
  sum + chapter.sections.reduce((sectionSum, section) => {
    const content = `${section.body || ""}\n${section.afterBody || ""}`;
    const inline = [...content.matchAll(/\\\(([\s\S]*?)\\\)/g)].length;
    const display = [...content.matchAll(/\\\[([\s\S]*?)\\\]/g)].length;
    const dollars = [...content.matchAll(/\$\$([\s\S]*?)\$\$/g)].length;
    return sectionSum + inline + display + dollars + (section.equation?.tex ? 1 : 0);
  }, 0)
), 0);
console.log(`검증 통과: ${files.length} files · ${chapters.length} chapters · ${topicCount} topics · ${formulaCount} formulas · ${visuals.length} visuals · 공개 금지 자료 0`);

(() => {
  const chapters = window.CHAPTERS || [];
  const media = window.MEDIA || [];
  const visuals = window.VISUALS || [];
  const coverage = window.THEORY_COVERAGE || {};
  const PROGRESS_KEY = "introai-course-progress-v1";
  const LAST_KEY = "introai-last-chapter-v1";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function escapeHtml(value = "") {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function codeHighlight(value = "") {
    return escapeHtml(value)
      .replace(/(#.*)$/gm, '<span class="code-comment">$1</span>')
      .replace(/\b(from|import|as|for|in|if|else|return|def|class|True|False|None)\b/g, '<span class="code-key">$1</span>')
      .replace(/\b(fit|score|predict|transform|compile|evaluate|partial_fit|add|sum|print)\b/g, '<span class="code-fn">$1</span>')
      .replace(/(&quot;.*?&quot;|&#039;.*?&#039;)/g, '<span class="code-string">$1</span>');
  }

  function getProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  function setProgress(values) {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify([...new Set(values)]));
    updateCourseProgress();
  }

  function updateCourseProgress() {
    const complete = getProgress();
    const percent = chapters.length ? Math.round((complete.length / chapters.length) * 100) : 0;
    const bar = $("[data-course-progress]");
    const label = $("[data-course-progress-label]");
    if (bar) bar.style.width = `${percent}%`;
    if (label) label.textContent = `${percent}%`;
  }

  function initTheme() {
    const saved = localStorage.getItem("introai-theme");
    const dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    $$(".theme-toggle").forEach(button => {
      button.addEventListener("click", () => {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        localStorage.setItem("introai-theme", next);
        window.dispatchEvent(new Event("themechange"));
      });
    });
  }

  function initHeader() {
    const header = $("[data-header]");
    if (!header) return;
    const handler = () => header.classList.toggle("is-condensed", window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
  }

  function phaseName(phase) {
    return {
      foundation: "FOUNDATION",
      classical: "CLASSICAL ML",
      deep: "DEEP LEARNING",
      frontier: "EXTENSION"
    }[phase] || phase;
  }

  function renderHome() {
    const grid = $("[data-chapter-grid]");
    if (!grid) return;
    const topicCount = $("[data-total-topics]");
    const checkCount = $("[data-total-checks]");
    if (topicCount) topicCount.textContent = coverage.topics || chapters.reduce((sum, item) => sum + item.sections.length, 0);
    if (checkCount) checkCount.textContent = coverage.checks || chapters.reduce((sum, item) => sum + item.quiz.length, 0);
    const completed = getProgress();
    const featured = new Set(["01", "06", "08", "11"]);
    grid.innerHTML = chapters.map((chapter) => {
      const isComplete = completed.includes(chapter.id);
      return `
        <a class="chapter-card ${featured.has(chapter.num) ? "featured" : ""}" data-phase="${chapter.phase}"
          href="learn.html?chapter=${chapter.id}" aria-label="${chapter.num}장 ${chapter.shortTitle}">
          <div class="chapter-card-top">
            <span class="chapter-number">${chapter.num}</span>
            <span>${phaseName(chapter.phase)}</span>
          </div>
          <h3>${chapter.title}</h3>
          <p>${chapter.summary}</p>
          <div class="chapter-card-bottom">
            <span>${chapter.minutes} MIN · ${chapter.sections.length} TOPICS</span>
            <span class="chapter-progress-mini" aria-label="${isComplete ? "완료" : "미완료"}"><i style="width:${isComplete ? 100 : 0}%"></i></span>
          </div>
        </a>`;
    }).join("");

    $$(".phase-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        $$(".phase-tab").forEach(t => {
          const active = t === tab;
          t.classList.toggle("is-active", active);
          t.setAttribute("aria-selected", String(active));
        });
        $$(".chapter-card", grid).forEach(card => {
          card.hidden = tab.dataset.phase !== "all" && card.dataset.phase !== tab.dataset.phase;
        });
      });
    });

    const mediaGrid = $("[data-media-grid]");
    if (mediaGrid) {
      mediaGrid.innerHTML = media.map(item => `
        <a class="media-card" href="${item.href}" target="_blank" rel="noreferrer">
          <img class="media-thumb" src="https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg"
            alt="${item.title} 영상 미리보기" loading="lazy" />
          <div class="media-card-content">
            <div class="media-card-top"><span>${item.type}</span><span>CH ${item.chapter}</span></div>
            <span class="play-button" aria-hidden="true">▶</span>
            <h3>${item.title}</h3>
            <p>${item.creator}</p>
          </div>
        </a>`).join("");
    }

    const visualGrid = $("[data-visual-grid]");
    if (visualGrid) {
      visualGrid.innerHTML = visuals.map((item, index) => `
        <figure class="visual-card ${index === 0 || index === 3 || index === 5 ? "visual-card-wide" : ""}">
          <a class="visual-card-image" href="${item.source}" target="_blank" rel="noreferrer">
            <img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async" />
            <span>${item.kind}</span>
          </a>
          <figcaption>
            <span>CH ${item.chapter}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="${item.source}" target="_blank" rel="noreferrer">
              ${item.author} · ${item.license} ↗
            </a>
          </figcaption>
        </figure>`).join("");
    }

    const lastId = localStorage.getItem(LAST_KEY);
    const last = chapters.find(chapter => chapter.id === lastId);
    const resume = $(".resume-button");
    if (last && resume) {
      resume.hidden = false;
      $(".resume-label", resume).textContent = last.shortTitle;
      resume.addEventListener("click", () => {
        location.href = `learn.html?chapter=${last.id}`;
      });
    }
  }

  function renderEquation(equation) {
    if (!equation) return "";
    return `
      <div class="equation-block">
        <span>${equation.label}</span>
        <div class="equation">\\[${equation.tex}\\]</div>
        <p class="equation-note">${equation.note}</p>
      </div>`;
  }

  function renderCode(code) {
    if (!code) return "";
    return `
      <div class="code-block">
        <div class="code-head">
          <span>${code.title}</span>
          <button class="code-copy" type="button">COPY</button>
        </div>
        <pre><code>${codeHighlight(code.content)}</code></pre>
      </div>`;
  }

  function renderCodes(section) {
    const codes = [
      ...(section.code ? [section.code] : []),
      ...(Array.isArray(section.codes) ? section.codes : [])
    ];
    return codes.map(renderCode).join("");
  }

  function renderSourceVisuals(ids = []) {
    const selected = ids
      .map(id => visuals.find(item => item.id === id))
      .filter(Boolean);
    if (!selected.length) return "";
    return `
      <div class="lesson-visuals ${selected.length === 1 ? "single" : ""}">
        ${selected.map(item => `
          <figure class="lesson-visual">
            <a href="${item.source}" target="_blank" rel="noreferrer">
              <img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async" />
            </a>
            <figcaption>
              <strong>${item.title}</strong>
              <span>${item.description}</span>
              <a href="${item.source}" target="_blank" rel="noreferrer">
                ${item.author} · ${item.license} ↗
              </a>
            </figcaption>
          </figure>`).join("")}
      </div>`;
  }

  function renderSection(section, index) {
    return `
      <section class="lesson-section" id="${section.id}">
        <p class="section-kicker">${section.kicker || String(index + 1).padStart(2, "0")}</p>
        <h2>${section.title}</h2>
        <div class="prose">${section.body || ""}</div>
        ${renderSourceVisuals(section.visuals)}
        ${renderEquation(section.equation)}
        ${section.afterBody ? `<div class="prose section-after-body">${section.afterBody}</div>` : ""}
        ${renderCodes(section)}
      </section>`;
  }

  function renderQuiz(chapter) {
    return `
      <section class="quiz-section" id="self-check">
        <p class="section-kicker">RETRIEVAL PRACTICE</p>
        <h2>세 문장으로 확인하기</h2>
        <p>답을 보기 전에 이유를 먼저 말해 보세요. 회상이 읽기보다 오래 남습니다.</p>
        ${chapter.quiz.map((quiz, index) => `
          <div class="quiz-card" data-answer="${quiz.answer}">
            <span>CHECK ${String(index + 1).padStart(2, "0")}</span>
            <h3>${quiz.q}</h3>
            <div class="quiz-options">
              ${quiz.options.map((option, optionIndex) => `
                <button type="button" class="quiz-option" data-option="${optionIndex}">
                  ${String.fromCharCode(65 + optionIndex)} · ${option}
                </button>`).join("")}
            </div>
            <p class="quiz-feedback">${quiz.why}</p>
          </div>`).join("")}
        <div class="complete-lesson">
          <div>
            <strong>이 장을 내 언어로 설명할 수 있나요?</strong>
            <p>완료 표시는 이 브라우저에만 저장되며 언제든 다시 바꿀 수 있습니다.</p>
          </div>
          <button type="button" class="complete-button" data-complete-chapter>학습 완료로 표시</button>
        </div>
      </section>`;
  }

  function renderSources(chapter) {
    return `
      <details class="lesson-sources">
        <summary>공개 참고 자료와 더 읽을거리 ${chapter.sources.length}개</summary>
        <ul>
          ${chapter.sources.map(([label, href]) => `
            <li><a href="${href}" target="_blank" rel="noreferrer">${label} ↗</a></li>
          `).join("")}
        </ul>
      </details>`;
  }

  function renderPager(index) {
    const previous = chapters[index - 1];
    const next = chapters[index + 1];
    return `
      <nav class="lesson-pager" aria-label="이전 및 다음 장">
        ${previous
          ? `<a href="learn.html?chapter=${previous.id}"><span>← PREVIOUS · ${previous.num}</span><strong>${previous.shortTitle}</strong></a>`
          : `<a href="index.html#roadmap"><span>← COURSE MAP</span><strong>전체 학습 지도로</strong></a>`}
        ${next
          ? `<a href="learn.html?chapter=${next.id}"><span>NEXT · ${next.num} →</span><strong>${next.shortTitle}</strong></a>`
          : `<a href="index.html"><span>FINISH →</span><strong>전체 흐름 다시 보기</strong></a>`}
      </nav>`;
  }

  function renderLesson() {
    const root = $("[data-lesson-content]");
    if (!root || !chapters.length) return;
    const params = new URLSearchParams(location.search);
    const requested = params.get("chapter");
    let index = chapters.findIndex(chapter => chapter.id === requested);
    if (index < 0) index = 0;
    const chapter = chapters[index];
    localStorage.setItem(LAST_KEY, chapter.id);
    document.title = `${chapter.shortTitle} · Introduction to AI`;
    const completed = getProgress();

    root.innerHTML = `
      <header class="lesson-hero" data-phase="${chapter.phase}">
        <span class="chapter-index">CHAPTER ${chapter.num} · ${phaseName(chapter.phase)}</span>
        <h1>${chapter.title}</h1>
        <p>${chapter.subtitle}</p>
        <div class="lesson-meta"><span>${chapter.minutes} MIN STUDY</span><span>${chapter.sections.length} TOPICS</span><span>${chapter.quiz.length} CHECKS</span></div>
      </header>
      <div class="lesson-intro-grid">
        <section class="lesson-intro-card">
          <span>LEARNING OBJECTIVES</span>
          <ul>${chapter.objectives.map(item => `<li>${item}</li>`).join("")}</ul>
        </section>
        <section class="lesson-intro-card question">
          <span>GUIDING QUESTION</span>
          <blockquote>${chapter.question}</blockquote>
        </section>
      </div>
      ${chapter.sections.map(renderSection).join("")}
      <section class="lesson-section" id="interactive-lab">
        <p class="section-kicker">INTERACTIVE LAB</p>
        <h2>${chapter.interactive.title}</h2>
        <div class="interactive-panel" data-interactive="${chapter.interactive.type}">
          <div class="interactive-head">
            <div><span>MOVE THE PARAMETERS</span><h3>${chapter.interactive.title}</h3></div>
            <p>${chapter.interactive.instruction}</p>
          </div>
          <div class="interactive-body">
            <div class="interactive-canvas-wrap">
              <canvas class="interactive-canvas" width="760" height="440" aria-label="${chapter.interactive.title} 시각화"></canvas>
            </div>
            <div class="interactive-controls">
              <div class="control-result"><span>LOADING</span><strong>실험 준비 중</strong></div>
            </div>
          </div>
        </div>
      </section>
      ${renderQuiz(chapter)}
      ${renderSources(chapter)}
      ${renderPager(index)}
    `;

    const completeButton = $("[data-complete-chapter]", root);
    const updateCompleteButton = () => {
      const isComplete = getProgress().includes(chapter.id);
      completeButton.classList.toggle("is-complete", isComplete);
      completeButton.textContent = isComplete ? "✓ 학습 완료" : "학습 완료로 표시";
    };
    completeButton.addEventListener("click", () => {
      const values = getProgress();
      const next = values.includes(chapter.id)
        ? values.filter(value => value !== chapter.id)
        : [...values, chapter.id];
      setProgress(next);
      updateCompleteButton();
      renderSidebar(chapter.id);
    });
    updateCompleteButton();

    $$(".quiz-card", root).forEach(card => {
      $$(".quiz-option", card).forEach(option => {
        option.addEventListener("click", () => {
          if (card.classList.contains("is-answered")) return;
          card.classList.add("is-answered");
          const chosen = Number(option.dataset.option);
          const answer = Number(card.dataset.answer);
          option.classList.add(chosen === answer ? "is-correct" : "is-wrong");
          if (chosen !== answer) {
            $(`[data-option="${answer}"]`, card)?.classList.add("is-correct");
          }
        });
      });
    });

    $$(".code-copy", root).forEach(button => {
      button.addEventListener("click", async () => {
        const code = $("code", button.closest(".code-block")).textContent;
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = "COPIED";
        } catch {
          button.textContent = "SELECT & COPY";
        }
        setTimeout(() => { button.textContent = "COPY"; }, 1600);
      });
    });

    renderSidebar(chapter.id);
    renderPageToc(chapter);
    updateCourseProgress();
    window.mountLessonInteractive?.($("[data-interactive]", root), chapter.interactive.type);
    wrapTables(root);
    renderMath(root);
    initReadingProgress();
  }

  function renderSidebar(activeId) {
    const nav = $("[data-sidebar-chapters]");
    if (!nav) return;
    const complete = getProgress();
    nav.innerHTML = chapters.map(chapter => `
      <a class="sidebar-chapter ${chapter.id === activeId ? "is-active" : ""}" href="learn.html?chapter=${chapter.id}">
        <span class="num">${chapter.num}</span>
        <span class="label">${chapter.shortTitle}<small>${phaseName(chapter.phase)}</small></span>
        <i class="status-dot ${complete.includes(chapter.id) ? "complete" : chapter.id === activeId ? "current" : ""}"></i>
      </a>`).join("");
  }

  function renderPageToc(chapter) {
    const nav = $("[data-page-toc]");
    if (!nav) return;
    const links = [
      ...chapter.sections.map(section => [section.id, section.title]),
      ["interactive-lab", "인터랙티브 실험"],
      ["self-check", "셀프체크"]
    ];
    nav.innerHTML = links.map(([id, title]) => `<a href="#${id}">${title}</a>`).join("");

    const sections = links.map(([id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      $$("a", nav).forEach(link => link.classList.toggle("is-active", link.hash === `#${visible.target.id}`));
    }, { rootMargin: "-18% 0px -68% 0px", threshold: [0, .2] });
    sections.forEach(section => observer.observe(section));
  }

  function renderMath(root) {
    if (typeof window.renderMathInElement !== "function") return;
    window.renderMathInElement(root, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false }
      ],
      throwOnError: false
    });
  }

  function wrapTables(root) {
    $$(".comparison-table", root).forEach(table => {
      if (table.parentElement?.classList.contains("table-scroll")) return;
      const wrapper = document.createElement("div");
      wrapper.className = "table-scroll";
      wrapper.tabIndex = 0;
      wrapper.setAttribute("role", "region");
      wrapper.setAttribute("aria-label", "좌우로 스크롤할 수 있는 비교표");
      table.before(wrapper);
      wrapper.append(table);
    });
  }

  function initReadingProgress() {
    const label = $("[data-reading-progress]");
    if (!label) return;
    const handler = () => {
      const article = $("[data-lesson-content]");
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const scrollable = Math.max(1, article.offsetHeight - window.innerHeight);
      const read = Math.min(1, Math.max(0, -rect.top / scrollable));
      label.textContent = `${Math.round(read * 100)}%`;
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
  }

  function initLessonTools() {
    const focus = $(".focus-toggle");
    focus?.addEventListener("click", () => {
      document.body.classList.toggle("focus-mode");
      focus.setAttribute("aria-pressed", String(document.body.classList.contains("focus-mode")));
      window.dispatchEvent(new Event("resize"));
    });
    const open = $(".mobile-toc-button");
    const sidebar = $(".chapter-sidebar");
    const close = $(".sidebar-close");
    open?.addEventListener("click", () => sidebar?.classList.add("is-open"));
    close?.addEventListener("click", () => sidebar?.classList.remove("is-open"));
  }

  function buildSearchIndex() {
    return chapters.flatMap(chapter => [
      {
        num: chapter.num,
        label: chapter.shortTitle,
        context: chapter.summary,
        href: `learn.html?chapter=${chapter.id}`,
        haystack: [chapter.title, chapter.shortTitle, chapter.summary, ...chapter.keywords].join(" ").toLowerCase()
      },
      ...chapter.sections.map(section => ({
        num: chapter.num,
        label: section.title,
        context: chapter.shortTitle,
        href: `learn.html?chapter=${chapter.id}#${section.id}`,
        haystack: `${section.title} ${chapter.shortTitle} ${(section.body || "").replace(/<[^>]+>/g, " ")} ${(section.afterBody || "").replace(/<[^>]+>/g, " ")}`.toLowerCase()
      }))
    ]);
  }

  function initSearch() {
    const dialog = $("[data-search-dialog]");
    const input = $("#site-search");
    const results = $("[data-search-results]");
    if (!dialog || !input || !results) return;
    const index = buildSearchIndex();
    let selected = 0;
    let current = [];

    function renderResults(query = "") {
      const q = query.trim().toLowerCase();
      current = (q ? index.filter(item => item.haystack.includes(q)) : index.filter(item => item.context === chapters[Number(item.num) - 1]?.summary))
        .slice(0, 9);
      selected = Math.min(selected, Math.max(0, current.length - 1));
      results.innerHTML = current.length
        ? current.map((item, i) => `
          <a class="search-result ${i === selected ? "is-selected" : ""}" href="${item.href}">
            <span>${item.num}</span>
            <span><strong>${item.label}</strong><small>${item.context}</small></span>
            <i>↗</i>
          </a>`).join("")
        : `<div class="search-empty">일치하는 개념이 없습니다.<br />더 짧은 단어로 검색해 보세요.</div>`;
    }

    function openDialog() {
      dialog.hidden = false;
      document.body.style.overflow = "hidden";
      renderResults(input.value);
      requestAnimationFrame(() => input.focus());
    }
    function closeDialog() {
      dialog.hidden = true;
      document.body.style.overflow = "";
      input.value = "";
    }

    $$(".search-trigger").forEach(button => button.addEventListener("click", openDialog));
    $$("[data-search-close]").forEach(button => button.addEventListener("click", closeDialog));
    input.addEventListener("input", () => { selected = 0; renderResults(input.value); });
    document.addEventListener("keydown", event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        dialog.hidden ? openDialog() : closeDialog();
      }
      if (dialog.hidden) return;
      if (event.key === "Escape") closeDialog();
      if (event.key === "ArrowDown") {
        event.preventDefault();
        selected = Math.min(current.length - 1, selected + 1);
        renderResults(input.value);
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        selected = Math.max(0, selected - 1);
        renderResults(input.value);
      }
      if (event.key === "Enter" && current[selected]) {
        location.href = current[selected].href;
      }
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initHeader();
    if (document.body.dataset.page === "home") renderHome();
    if (document.body.dataset.page === "learn") {
      renderLesson();
      initLessonTools();
    }
    initSearch();
  });
})();

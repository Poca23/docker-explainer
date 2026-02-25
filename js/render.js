// ── Rendu des composants ─────────────────────────────────────────────────────

const Renderer = {
  header(el) {
    el.innerHTML = `
      <div class="header-logo">
        <svg viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8" fill="#1d6f42"/>
          <text x="8" y="28" font-size="22" fill="white">🐳</text>
        </svg>
        <div>
          <h1 style="font-size:1.1rem;line-height:1">Docker</h1>
          <span style="font-size:.75rem;color:var(--text-muted)">Guide visuel interactif</span>
        </div>
      </div>
      <div id="progress-wrap" style="flex:1;max-width:160px">
        <div style="font-size:.7rem;color:var(--text-muted);margin-bottom:.3rem" id="progress-label">Section 1/6</div>
        <div class="progress-bar"><span id="progress-fill" style="width:16%"></span></div>
      </div>
    `;
  },

  nav(el, items, onSelect) {
    el.innerHTML = items
      .map(
        (item, i) =>
          `<button class="nav-pill${i === 0 ? " active" : ""}"
               data-id="${item.id}">${item.label}</button>`,
      )
      .join("");
    el.addEventListener("click", (e) => {
      const btn = e.target.closest(".nav-pill");
      if (!btn) return;
      el.querySelectorAll(".nav-pill").forEach((b) =>
        b.classList.remove("active"),
      );
      btn.classList.add("active");
      onSelect(
        btn.dataset.id,
        items.findIndex((x) => x.id === btn.dataset.id),
      );
    });
  },

  sections(el, sections) {
    el.innerHTML = Object.entries(sections)
      .map(
        ([id, s]) => `
      <section class="section" id="sec-${id}">
        <h2 style="margin-bottom:1rem">${s.title}</h2>
        ${s.content}
      </section>
    `,
      )
      .join("");
  },

  commands(gridEl, commands, tagColors) {
    gridEl.innerHTML = commands
      .map(
        (c) => `
      <div class="card cmd-card" style="cursor:pointer" data-cmd="${c.cmd}" title="Cliquer pour copier">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:.4rem;margin-bottom:.4rem">
          <span class="tag ${tagColors[c.tag] || ""}">${c.tag}</span>
          <span style="font-size:.7rem;color:var(--text-muted)">📋 copier</span>
        </div>
        <code style="font-size:.85rem;display:block;margin-bottom:.4rem">${c.cmd}</code>
        <p style="font-size:.8rem;color:var(--text-muted)">${c.desc}</p>
      </div>
    `,
      )
      .join("");

    gridEl.addEventListener("click", (e) => {
      const card = e.target.closest(".cmd-card");
      if (!card) return;
      navigator.clipboard.writeText(card.dataset.cmd).then(() => {
        const hint = card.querySelector("span:last-child");
        hint.textContent = "✅ copié !";
        setTimeout(() => (hint.textContent = "📋 copier"), 1500);
      });
    });
  },

  quiz(containerEl, quizData) {
    let score = 0;
    containerEl.innerHTML =
      quizData
        .map(
          (q, qi) => `
      <div class="quiz-q card" id="q${qi}" style="margin-bottom:1rem">
        <p>${qi + 1}. ${q.q}</p>
        <div class="quiz-choices">
          ${q.choices
            .map(
              (c, ci) =>
                `<button class="quiz-btn" data-qi="${qi}" data-ci="${ci}">${c}</button>`,
            )
            .join("")}
        </div>
      </div>
    `,
        )
        .join("") +
      `<div id="quiz-score" style="margin-top:1rem;font-size:1.1rem;font-weight:600"></div>`;

    containerEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".quiz-btn");
      if (!btn || btn.disabled) return;
      const qi = +btn.dataset.qi;
      const ci = +btn.dataset.ci;
      const isOk = ci === quizData[qi].correct;

      // Désactiver tous les boutons de cette question
      const qEl = document.getElementById(`q${qi}`);
      qEl.querySelectorAll(".quiz-btn").forEach((b) => {
        b.disabled = true;
        if (+b.dataset.ci === quizData[qi].correct) b.classList.add("correct");
      });
      btn.classList.add(isOk ? "correct" : "wrong");
      if (isOk) score++;

      // Score final
      const answered = containerEl.querySelectorAll(".quiz-btn[disabled]");
      const total = quizData.length;
      const done = containerEl.querySelectorAll(".quiz-q [disabled]").length;
      if (done >= total * quizData[0].choices.length) {
        document.getElementById("quiz-score").textContent =
          `Score : ${score} / ${total} ${score === total ? "🏆 Parfait !" : "💪 Continue !"}`;
      }
    });
  },

  updateProgress(index, total) {
    const pct = Math.round(((index + 1) / total) * 100);
    document.getElementById("progress-fill").style.width = pct + "%";
    document.getElementById("progress-label").textContent =
      `Section ${index + 1}/${total}`;
  },

  footer(el) {
    el.innerHTML = `<p>Pour les apprenants Docker 🐳 | © 2026 | CND - Web Is Yours</p>`;
  },
};

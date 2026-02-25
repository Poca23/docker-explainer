// ── Point d'entrée ───────────────────────────────────────────────────────────
function init() {
  const $ = (id) => document.getElementById(id);

  Renderer.header($("header"));
  Search.init(DATA.commands);
  Renderer.footer($("footer"));
  Renderer.sections($("main"), DATA.sections);

  Renderer.nav($("nav"), DATA.nav, (id, index) => {
    document
      .querySelectorAll(".section")
      .forEach((s) => s.classList.remove("active"));
    $(`sec-${id}`).classList.add("active");
    Renderer.updateProgress(index, DATA.nav.length);

    if (id === "exo1") Renderer.exo1(DATA_EXO1);
    if (id === "commandes") {
      const grid = $("cmd-grid");
      if (grid && !grid.hasChildNodes())
        Renderer.commands(grid, DATA.commands, DATA.tagColors);
    }
    if (id === "quiz") {
      const container = $("quiz-container");
      if (container && !container.hasChildNodes())
        Renderer.quiz(container, DATA.quizData);
    }
  });

  $("sec-intro").classList.add("active");

  const grid = $("cmd-grid");
  if (grid) Renderer.commands(grid, DATA.commands, DATA.tagColors);
}

document.addEventListener("DOMContentLoaded", init);

const Search = {
  init(commands) {
    const btn = document.getElementById("search-btn");
    const bar = document.getElementById("search-bar");
    const input = document.getElementById("search-input");
    const results = document.getElementById("search-results");

    // Ouvrir/fermer
    btn.addEventListener("click", () => {
      const open = bar.classList.toggle("open");
      if (open) input.focus();
      else {
        input.value = "";
        results.innerHTML = "";
      }
    });

    // Fermer avec Escape
    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") btn.click();
    });

    // Recherche live
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        results.innerHTML = "";
        return;
      }

      const found = commands.filter(
        (c) =>
          c.cmd.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q),
      );

      results.innerHTML = found.length
        ? found
            .map(
              (c) => `
            <div class="search-result" data-cmd="${c.cmd}">
              <code>${c.cmd}</code>
              <span>${c.desc}</span>
            </div>`,
            )
            .join("")
        : `<div class="search-result muted">Aucun résultat</div>`;
    });

    // Copier au clic
    results.addEventListener("click", (e) => {
      const row = e.target.closest(".search-result[data-cmd]");
      if (!row) return;
      navigator.clipboard.writeText(row.dataset.cmd).then(() => {
        const code = row.querySelector("code");
        const orig = code.textContent;
        code.textContent = "✅ copié !";
        setTimeout(() => (code.textContent = orig), 1500);
      });
    });

    // Clic dehors = fermer
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#search-wrap")) {
        bar.classList.remove("open");
        input.value = "";
        results.innerHTML = "";
      }
    });
  },
};

// ── Toutes les données du cours ──────────────────────────────────────────────
const DATA = {
  nav: [
    { id: "intro", label: "🐳 C'est quoi ?" },
    { id: "exo1", label: "🐧 Exercice 1" },
    { id: "concepts", label: "📦 Concepts clés" },
    { id: "workflow", label: "🔄 Workflow" },
    { id: "commandes", label: "💻 Commandes" },
    { id: "compose", label: "🧩 Compose" },
    { id: "exo2", label: "🐧 Exercice 2" },
    { id: "quiz", label: "🎯 Quiz" },
  ],

  sections: {
    // ─────────────────────────────────────────────────────── INTRO
    intro: {
      title: "🐳 Docker — C'est quoi ?",
      content: `
        <p>Imagine que tu prépares un gâteau. La recette, les ingrédients, le moule :
        tout est dans <strong>une boîte magique</strong>. Tu donnes cette boîte à n'importe
        qui — ils obtiennent exactement ton gâteau, peu importe leur cuisine.</p>
        <p style="margin-top:.8rem">Docker, c'est ça. <strong>Tu empaquettes ton application + tout son environnement</strong>
        dans une boîte (conteneur). Elle tourne partout, à l'identique.</p>

        <div class="diagram" id="diag-intro">
          <div class="diag-row">
            <div class="diag-box amber">Ton code</div>
            <span class="diag-arrow">+</span>
            <div class="diag-box ghost">Node 22</div>
            <span class="diag-arrow">+</span>
            <div class="diag-box ghost">libs</div>
          </div>
          <span class="diag-arrow" style="font-size:2rem">↓</span>
          <div class="diag-row">
            <div class="diag-box cyan" style="min-width:200px">📦 IMAGE Docker</div>
          </div>
          <span class="diag-arrow" style="font-size:2rem">↓</span>
          <div class="diag-row">
            <div class="diag-box green">🖥 Mac</div>
            <div class="diag-box green">🐧 Linux</div>
            <div class="diag-box green">☁️ Cloud</div>
          </div>
        </div>

        <div class="grid-2" style="margin-top:1.2rem">
          <div class="card">
            <span class="tag amber">Problème sans Docker</span>
            <p style="margin-top:.6rem">"Ça marche sur ma machine !" — mais pas sur le serveur, pas chez le collègue...</p>
          </div>
          <div class="card">
            <span class="tag">Solution Docker</span>
            <p style="margin-top:.6rem">L'environnement voyage <em>avec</em> l'application. Toujours identique, partout.</p>
          </div>
        </div>

        <div class="card" style="margin-top:1rem; border-left:3px solid var(--accent3)">
          <strong>⚡ Différence VM vs Docker</strong>
          <table class="compare-table" style="margin-top:.6rem">
            <thead><tr><th></th><th>Machine Virtuelle</th><th>Conteneur Docker</th></tr></thead>
            <tbody>
              <tr><td>Poids</td><td>Plusieurs Go (OS complet)</td><td>Quelques Mo</td></tr>
              <tr><td>Démarrage</td><td>Minutes</td><td>Secondes</td></tr>
              <tr><td>Isolation</td><td>Complète (OS dédié)</td><td>Partage le noyau Linux</td></tr>
              <tr><td>Analogie</td><td>Maison individuelle</td><td>Appartement dans un immeuble</td></tr>
            </tbody>
          </table>
        </div>
      `,
    },

    // ─────────────────────────────────────────────────────── EXO 1
    exo1: {
      title: "🐧 Exercice 1 — Ubuntu LAMP",
      content: `
    <!-- CONSIGNE -->
    <div class="card" style="margin-bottom:1.5rem;border-color:var(--accent)">
      <span class="tag" style="margin-bottom:.8rem;display:inline-block">🎯 Objectif</span>
      <p id="exo1-objectif"></p>
      <table class="compare-table" style="margin-top:.8rem" id="exo1-config-table">
        <thead><tr><th>Configuration</th><th>Valeur</th></tr></thead>
        <tbody id="exo1-config"></tbody>
      </table>
    </div>

    <!-- TOGGLE CORRECTION -->
    <div style="margin-bottom:1.5rem">
      <button id="btn-correction" class="nav-pill" style="font-size:.9rem">
        👁 Voir la correction
      </button>
    </div>

    <!-- RAPPEL -->
    <h3 style="margin-bottom:.8rem;color:var(--accent);border-bottom:1px solid var(--border);padding-bottom:.4rem">
      🗂 Commandes utiles — Rappel
    </h3>
    <p style="color:var(--text-muted);font-size:.85rem;margin-bottom:.8rem">Clique sur une commande pour la copier</p>
    <div class="grid-2" id="exo1-rappel"></div>

    <!-- CORRECTION (cachée par défaut) -->
    <div id="exo1-correction" style="display:none">
      <h3 style="margin-top:1.5rem;margin-bottom:.8rem;color:var(--accent);border-bottom:1px solid var(--border);padding-bottom:.4rem">
        📋 Correction — Étapes
      </h3>
      <div class="steps" id="exo1-steps"></div>

      <h3 style="margin-top:1.5rem;margin-bottom:.8rem;color:var(--accent);border-bottom:1px solid var(--border);padding-bottom:.4rem">
        ✅ Bilan
      </h3>
      <table class="compare-table">
        <thead><tr><th>Étape</th><th>Commande</th><th>Statut</th></tr></thead>
        <tbody id="exo1-bilan"></tbody>
      </table>
    </div>
  `,
    },

    // ─────────────────────────────────────────────────────── CONCEPTS
    concepts: {
      title: "📦 Concepts clés",
      content: `
        <div class="steps">

          <div class="step">
            <div class="step-num">1</div>
            <div>
              <h3>🖼 Image <span class="tag cyan">Immuable</span></h3>
              <p><strong>Technique :</strong> Un snapshot en lecture seule, construit par couches (layers UnionFS).
              Chaque instruction du <code>Dockerfile</code> crée un layer caché en cache.</p>
              <p><strong>Simple :</strong> La <em>recette + les ingrédients</em> dans un livre fermé.
              On ne l'édite pas, on la <em>lit</em> pour créer un gâteau.</p>
              <pre>FROM node:22-alpine   ← couche de base
COPY . .              ← nouvelle couche
RUN npm install       ← nouvelle couche</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-num">2</div>
            <div>
              <h3>📦 Conteneur <span class="tag">Instance live</span></h3>
              <p><strong>Technique :</strong> Une image en train de s'exécuter, avec une couche d'écriture
              éphémère par-dessus. Isolé via namespaces Linux (PID, NET, MNT…).</p>
              <p><strong>Simple :</strong> Le gâteau sorti du four — il <em>existe</em>, il vit, il peut mourir.</p>
              <p style="margin-top:.4rem">Une image → <em>N</em> conteneurs identiques en parallèle. ✅</p>
            </div>
          </div>

          <div class="step">
            <div class="step-num">3</div>
            <div>
              <h3>📄 Dockerfile <span class="tag amber">Script de construction</span></h3>
              <p><strong>Technique :</strong> Fichier texte déclaratif. Séquence d'instructions qui
              définissent chaque couche de l'image.</p>
              <p><strong>Simple :</strong> La <em>liste de courses + mode d'emploi</em> pour cuisiner l'image.</p>
              <pre>FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
EXPOSE 80</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-num">4</div>
            <div>
              <h3>🌐 Docker Hub <span class="tag cyan">Registre public</span></h3>
              <p><strong>Technique :</strong> OCI Registry hébergeant des images versionnées par tags (<code>nginx:1.27-alpine</code>).
              Pull automatique si l'image est absente localement.</p>
              <p><strong>Simple :</strong> Le <em>App Store des images Docker</em>. Tu cherches "nginx", tu télécharges.</p>
            </div>
          </div>

          <div class="step">
            <div class="step-num">5</div>
            <div>
              <h3>💾 Volume <span class="tag">Persistance</span></h3>
              <p><strong>Technique :</strong> Montage d'un répertoire hôte ou d'un volume nommé dans
              le système de fichiers du conteneur. Survit à la mort du conteneur.</p>
              <p><strong>Simple :</strong> Une clé USB branchée dans le gâteau. Le gâteau disparaît,
              les données sur la clé restent.</p>
              <pre>docker run -v mes-données:/app/data mon-image</pre>
            </div>
          </div>

        </div>
      `,
    },

    // ─────────────────────────────────────────────────────── WORKFLOW
    workflow: {
      title: "🔄 Workflow — De l'idée au conteneur",
      content: `
        <p>Le chemin complet, étape par étape :</p>

        <div class="diagram">
          <div class="diag-row">
            <div class="diag-box amber">📝 Code (tu écris)</div>
            <span class="diag-arrow">→</span>
            <div class="diag-box ghost">📄 Dockerfile (tu écris)</div>
            <span class="diag-arrow">→</span>
            <div class="diag-box green">🖼 Image (docker build)</div>
            <span class="diag-arrow">→</span>
            <div class="diag-box cyan">📦 Conteneur (docker run)</div>
          </div>
        <div class="steps" style="margin-top:1.2rem">
          <div class="step">
            <div class="step-num">1</div>
            <div>
              <h3>Écrire le Dockerfile</h3>
              <p>Choisir une image de base (<code>FROM</code>), copier tes fichiers, installer les dépendances, exposer un port.</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div>
              <h3>Construire l'image — <code>docker build</code></h3>
              <p>Docker lit le Dockerfile couche par couche et crée une image locale. Le cache accélère les reconstructions.</p>
              <pre>docker build -t mon-app:1.0 .</pre>
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div>
              <h3>Lancer le conteneur — <code>docker run</code></h3>
              <p>Docker crée une instance vivante de l'image, avec un réseau, un port mappé, un nom.</p>
              <pre>docker run -d -p 3000:3000 --name mon-app mon-app:1.0</pre>
            </div>
          </div>
          <div class="step">
            <div class="step-num">4</div>
            <div>
              <h3>Inspecter &amp; déboguer</h3>
              <pre>docker logs mon-app        # voir les logs
docker exec -it mon-app sh # entrer dans le conteneur</pre>
            </div>
          </div>
          <div class="step">
            <div class="step-num">5</div>
            <div>
              <h3>Arrêter &amp; nettoyer</h3>
              <pre>docker stop mon-app
docker rm mon-app
docker rmi mon-app:1.0</pre>
            </div>
          </div>
        </div>
      `,
    },

    // ─────────────────────────────────────────────────────── COMMANDES
    commandes: {
      title: "💻 Commandes essentielles",
      content: `
        <p style="color:var(--text-muted)">Clique sur une commande pour la copier dans le presse-papier.</p>
        <div class="grid-2" style="margin-top:1rem" id="cmd-grid"></div>
      `,
    },

    // ─────────────────────────────────────────────────────── COMPOSE
    compose: {
      title: "🧩 Docker Compose — Multi-conteneurs",
      content: `
        <p>Docker Compose = <strong>orchestrer plusieurs conteneurs avec un seul fichier</strong>.
        Parfait pour une app web avec base de données.</p>
        <p style="margin-top:.5rem"><strong>Simple :</strong> Tu as un restaurant. Docker = cuisiner un plat.
        Compose = gérer toute la brigade en même temps.</p>

        <div class="diagram">
          <div class="diag-row">
            <div class="diag-box cyan">🌐 app (Node)</div>
            <div class="diag-box green">🗄 db (Postgres)</div>
            <div class="diag-box amber">🔴 cache (Redis)</div>
          </div>
          <span class="diag-arrow" style="font-size:1.5rem">↕ réseau interne Docker</span>
          <p style="font-size:.8rem; color:var(--text-muted)">1 commande pour tous lancer : <code>docker compose up</code></p>
        </div>

        <pre style="margin-top:1rem">
# compose.yml — exemple minimal
services:

  app:
    build: .
    ports: ["3000:3000"]
    depends_on: [db]
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/madb

  db:
    image: postgres:16-alpine
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: pass
      POSTGRES_USER: user
      POSTGRES_DB: madb

volumes:
  db-data:
        </pre>

        <table class="compare-table" style="margin-top:1rem">
          <thead><tr><th>Commande Compose</th><th>Rôle</th></tr></thead>
          <tbody>
            <tr><td><code>docker compose up -d</code></td><td>Lancer tous les services en arrière-plan</td></tr>
            <tr><td><code>docker compose down</code></td><td>Stopper et supprimer les conteneurs</td></tr>
            <tr><td><code>docker compose logs -f</code></td><td>Suivre les logs en temps réel</td></tr>
            <tr><td><code>docker compose ps</code></td><td>État de chaque service</td></tr>
            <tr><td><code>docker compose build</code></td><td>Reconstruire les images</td></tr>
          </tbody>
        </table>
      `,
    },

    // ─────────────────────────────────────────────────────── EXO 2
    exo2: {
      title: "🐳 Exercice 2 — Mon premier Dockerfile",
      content: `
    <div class="card" style="margin-bottom:1.5rem">
      <span class="tag" style="margin-bottom:.6rem;display:inline-block">🎯 Objectif</span>
      <p id="exo2-objectif"></p>
    </div>

    <table class="compare-table" style="margin-bottom:1.5rem">
      <thead><tr><th>Configuration</th><th>Valeur</th></tr></thead>
      <tbody id="exo2-config"></tbody>
    </table>

    <div style="margin-bottom:1.5rem">
      <button id="btn-correction-exo2" class="nav-pill" style="font-size:.9rem">
        👁 Voir la correction
      </button>
    </div>

    <h3 style="margin-bottom:.8rem;color:var(--accent);border-bottom:1px solid var(--border);padding-bottom:.4rem">
      🗂 Commandes utiles — Rappel
    </h3>
    <p style="color:var(--text-muted);font-size:.85rem;margin-bottom:.8rem">Clique sur une commande pour la copier</p>
    <div class="grid-2" id="exo2-rappel"></div>

    <div id="exo2-correction" style="display:none">
      <h3 style="margin-top:1.5rem;margin-bottom:.8rem;color:var(--accent);border-bottom:1px solid var(--border);padding-bottom:.4rem">
        📋 Correction — Étapes
      </h3>
      <div class="steps" id="exo2-steps"></div>

      <h3 style="margin-top:1.5rem;margin-bottom:.8rem;color:var(--accent);border-bottom:1px solid var(--border);padding-bottom:.4rem">
        ✅ Bilan
      </h3>
      <table class="compare-table">
        <thead><tr><th>Étape</th><th>Commande</th><th>Statut</th></tr></thead>
        <tbody id="exo2-bilan"></tbody>
      </table>
    </div>
  `,
    },

    // ─────────────────────────────────────────────────────── QUIZ
    quiz: {
      title: "🎯 Quiz — Teste tes connaissances",
      content: `<div id="quiz-container"></div>`,
    },
  },

  // ── Commandes ──────────────────────────────────────────────────────────────
  commands: [
    { cmd: "docker ps", desc: "Lister les conteneurs actifs", tag: "info" },
    {
      cmd: "docker ps -a",
      desc: "Tous les conteneurs (actifs + arrêtés)",
      tag: "info",
    },
    { cmd: "docker images", desc: "Lister les images locales", tag: "info" },
    {
      cmd: "docker inspect <id>",
      desc: "Détails complets d'un conteneur",
      tag: "info",
    },
    { cmd: "docker stats", desc: "CPU / RAM en temps réel", tag: "info" },
    {
      cmd: "docker build -t nom .",
      desc: "Construire une image depuis le dossier",
      tag: "build",
    },
    {
      cmd: "docker build --no-cache -t nom .",
      desc: "Rebuild sans cache",
      tag: "build",
    },
    {
      cmd: "docker run -d -p 80:80 nom",
      desc: "Lancer en arrière-plan, port 80",
      tag: "run",
    },
    {
      cmd: "docker run -di --name <n> <img> bash",
      desc: "Conteneur interactif nommé (Ubuntu)",
      tag: "run",
    },
    {
      cmd: "docker run -v <local>:<ctn> nom",
      desc: "Bind mount dossier local",
      tag: "run",
    },
    {
      cmd: "docker exec -it <id> sh",
      desc: "Ouvrir un shell dans le conteneur",
      tag: "debug",
    },
    {
      cmd: "docker exec -ti <id> bash",
      desc: "Ouvrir bash (Ubuntu)",
      tag: "debug",
    },
    {
      cmd: "docker logs -f <id>",
      desc: "Suivre les logs en direct",
      tag: "debug",
    },
    { cmd: "docker stop <id>", desc: "Stopper un conteneur", tag: "stop" },
    {
      cmd: "docker rm <id>",
      desc: "Supprimer un conteneur arrêté",
      tag: "clean",
    },
    { cmd: "docker rmi <image>", desc: "Supprimer une image", tag: "clean" },
    {
      cmd: "docker builder prune -f",
      desc: "Vider le cache de build",
      tag: "clean",
    },
    {
      cmd: "docker system prune -af",
      desc: "Tout nettoyer (conteneurs, images, cache)",
      tag: "clean",
    },
    {
      cmd: "docker commit <nom> <image>",
      desc: "Sauvegarder un conteneur en image",
      tag: "commit",
    },
    {
      cmd: "docker pull nginx:alpine",
      desc: "Télécharger une image depuis Docker Hub",
      tag: "hub",
    },
    {
      cmd: "docker push nom:tag",
      desc: "Pousser une image sur Docker Hub",
      tag: "hub",
    },
  ],

  tagColors: {
    info: "cyan",
    build: "",
    run: "",
    stop: "amber",
    clean: "amber",
    debug: "cyan",
    commit: "",
    hub: "",
  },

  // ── Quiz ───────────────────────────────────────────────────────────────────
  quizData: [
    {
      q: "Quelle est la différence entre une Image et un Conteneur ?",
      choices: [
        "Ce sont des synonymes, c'est la même chose",
        "L'image est un modèle statique, le conteneur est une instance en cours d'exécution ",
        "Un conteneur contient plusieurs images",
        "L'image s'exécute, le conteneur est un fichier statique",
      ],
      correct: 1,
    },
    {
      q: "Quelle commande construit une image Docker ?",
      choices: [
        "docker run -t mon-app .",
        "docker create mon-app",
        "docker build -t mon-app . ",
        "docker start mon-app .",
      ],
      correct: 2,
    },
    {
      q: "À quoi sert un Volume Docker ?",
      choices: [
        "Augmenter la mémoire RAM du conteneur",
        "Partager du code entre deux images",
        "Persister les données au-delà de la vie du conteneur ",
        "Exposer un port réseau",
      ],
      correct: 2,
    },
    {
      q: "Que fait docker compose up -d ?",
      choices: [
        'Lance uniquement le service "d"',
        "Lance tous les services définis en arrière-plan ",
        "Supprime tous les conteneurs",
        "Télécharge les images sans les lancer",
      ],
      correct: 1,
    },
    {
      q: "Combien de conteneurs peut-on lancer depuis une seule image ?",
      choices: [
        "Un seul — une image = un conteneur",
        "Deux maximum",
        "Autant qu'on veut ",
        "Dépend de la taille de l'image",
      ],
      correct: 2,
    },
    {
      q: "Que signifie l'option -p 8080:80 dans docker run ?",
      choices: [
        "Limiter la RAM à 8080 Mo",
        "Exposer le port 80 du conteneur sur le port 8080 de l'hôte",
        "Lancer 8080 conteneurs en parallèle",
        "Mapper le volume 80 sur le port 8080",
      ],
      correct: 1,
    },
    {
      q: "Quel fichier décrit comment construire une image Docker ?",
      choices: ["compose.yml", "package.json", "Dockerfile", ".dockerignore"],
      correct: 2,
    },
    {
      q: "Quelle commande supprime tous les conteneurs arrêtés ?",
      choices: [
        "docker rm -f all",
        "docker delete stopped",
        "docker container prune",
        "docker stop --all",
      ],
      correct: 2,
    },
    {
      q: "Où sont stockées les images Docker publiques par défaut ?",
      choices: [
        "GitHub Packages",
        "Docker Hub",
        "npm registry",
        "En local uniquement",
      ],
      correct: 1,
    },
    {
      q: "Que fait l'instruction EXPOSE dans un Dockerfile ?",
      choices: [
        "Ouvre automatiquement le port sur l'hôte",
        "Documente le port écouté par le conteneur",
        "Redirige le trafic réseau",
        "Démarre le serveur web",
      ],
      correct: 1,
    },
  ],
};

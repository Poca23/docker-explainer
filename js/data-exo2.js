const DATA_EXO2 = {
  consigne: {
    objectif:
      "Créer une image Docker personnalisée avec un Dockerfile : une mini page web servie par Nginx.",
    config: [
      { label: "Image de base", val: "nginx:alpine" },
      { label: "Conteneur", val: "mon-site" },
      { label: "Port mappé", val: "8081 → 80" },
      { label: "Image finale", val: "tonprenom-site" },
      { label: "Fichier clé", val: "Dockerfile" },
    ],
  },

  rappel: [
    {
      cmd: "docker build -t <nom> .",
      desc: "Construit une image depuis un Dockerfile",
    },
    {
      cmd: "docker run -d --name <nom> -p 8081:80 <image>",
      desc: "Lance un conteneur avec port mappé",
    },
    { cmd: "docker stop <nom>", desc: "Stoppe un conteneur" },
    { cmd: "docker rm <nom>", desc: "Supprime un conteneur" },
    { cmd: "docker images", desc: "Liste les images locales" },
    { cmd: "docker rmi <image>", desc: "Supprime une image" },
    { cmd: "docker logs <nom>", desc: "Affiche les logs d'un conteneur" },
  ],

  steps: [
    {
      num: 1,
      title: "Créer le dossier de travail",
      tag: "setup",
      content: `
        <pre>mkdir mon-site && cd mon-site</pre>
        <p>Tout se passe dans ce dossier.</p>`,
    },
    {
      num: 2,
      title: "Créer la page HTML",
      tag: "html",
      content: `
        <p>Crée un fichier <code>index.html</code> :</p>
        <pre>&lt;!DOCTYPE html&gt;
&lt;html lang="fr"&gt;
&lt;head&gt;&lt;meta charset="UTF-8"&gt;&lt;title&gt;Mon site Docker&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;🐳 Hello depuis Docker !&lt;/h1&gt;
  &lt;p&gt;Servi par Nginx dans un conteneur.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>`,
    },
    {
      num: 3,
      title: "Créer le Dockerfile",
      tag: "dockerfile",
      content: `
        <p>Crée un fichier nommé exactement <code>Dockerfile</code> (sans extension) :</p>
        <pre>FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80</pre>
        <div class="grid-2" style="margin-top:.8rem">
          <div class="card"><span class="tag">FROM</span><p style="margin-top:.5rem">Image de base — Nginx léger sur Alpine Linux</p></div>
          <div class="card"><span class="tag">COPY</span><p style="margin-top:.5rem">Copie ton fichier HTML dans le conteneur</p></div>
        </div>`,
    },
    {
      num: 4,
      title: "Construire l'image",
      tag: "build",
      content: `
        <pre>docker build -t tonprenom-site .</pre>
        <p>Le <code>.</code> signifie "cherche le Dockerfile ici".</p>
        <p>Vérification :</p>
        <pre>docker images</pre>
        <p><span class="tag">✅ <code>tonprenom-site</code> apparaît dans la liste</span></p>`,
    },
    {
      num: 5,
      title: "Lancer le conteneur",
      tag: "run",
      content: `
        <pre>docker run -d --name mon-site -p 8081:80 tonprenom-site</pre>
        <p>Vérification :</p>
        <pre>docker ps</pre>
        <p><span class="tag">✅ Le conteneur <code>mon-site</code> est en cours d'exécution</span></p>`,
    },
    {
      num: 6,
      title: "Tester dans le navigateur",
      tag: "test",
      content: `
        <table class="compare-table">
          <thead><tr><th>URL</th><th>Résultat attendu</th></tr></thead>
          <tbody>
            <tr><td><code>http://localhost:8081</code></td><td>🐳 Hello depuis Docker ! ✅</td></tr>
          </tbody>
        </table>`,
    },
    {
      num: 7,
      title: "Nettoyer",
      tag: "clean",
      content: `
        <pre>docker stop mon-site
docker rm mon-site
docker rmi tonprenom-site</pre>
        <div class="card" style="margin-top:.8rem">
          <span class="tag amber">💡 Bonne pratique</span>
          <p style="margin-top:.5rem">Toujours nettoyer après un exercice pour libérer de l'espace.</p>
        </div>`,
    },
  ],

  bilan: [
    { etape: "Créer le dossier", cmd: "mkdir mon-site && cd mon-site" },
    { etape: "Créer index.html", cmd: "nano index.html" },
    { etape: "Créer Dockerfile", cmd: "nano Dockerfile" },
    { etape: "Construire l'image", cmd: "docker build -t tonprenom-site ." },
    {
      etape: "Lancer le conteneur",
      cmd: "docker run -d --name mon-site -p 8081:80 tonprenom-site",
    },
    { etape: "Tester", cmd: "http://localhost:8081" },
    { etape: "Nettoyer", cmd: "docker stop mon-site && docker rm mon-site" },
  ],
};

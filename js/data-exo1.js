const DATA_EXO1 = {
  consigne: {
    objectif:
      "Lancer un conteneur Ubuntu 24.04, installer une stack LAMP complète (Apache + MySQL + PHP + phpMyAdmin), créer un script de démarrage automatique, puis commiter l'image.",
    config: [
      { label: "OS hôte", val: "Linux Ubuntu 24.04" },
      { label: "Image Docker", val: "ubuntu (latest)" },
      { label: "Conteneur", val: "mon-ubuntu" },
      { label: "Image finale", val: "tonprenom-lamp" },
      { label: "Port mappé", val: "8080 → 80" },
      {
        label: "Bind mount",
        val: "/home/cnd/Bureau/Projets/DevOps/Docker → /var/www/html",
      },
    ],
  },

  rappel: [
    {
      cmd: "docker run -di --name <nom> <image>",
      desc: "Lance un conteneur nommé",
    },
    {
      cmd: "docker exec -ti <nom> bash",
      desc: "Rentre dans un conteneur Ubuntu",
    },
    { cmd: "docker stop <nom>", desc: "Stoppe un conteneur" },
    { cmd: "docker rm <nom>", desc: "Supprime un conteneur" },
    {
      cmd: "docker commit <nom> <image>",
      desc: "Sauvegarde un conteneur en image",
    },
    {
      cmd: "docker inspect <nom>",
      desc: "Affiche tous les détails d'un conteneur",
    },
    {
      cmd: "-v <local>:<conteneur>",
      desc: "Monte un dossier local dans le conteneur",
    },
  ],

  steps: [
    {
      num: 1,
      title: "Télécharger et lancer Ubuntu",
      tag: "ubuntu",
      content: `
        <p>Lance un conteneur Ubuntu en mode détaché et interactif :</p>
        <pre>docker run -di --name mon-ubuntu ubuntu bash</pre>
        <p>Vérification :</p>
        <pre>docker ps</pre>
        <p>Prends la main :</p>
        <pre>docker exec -ti mon-ubuntu bash</pre>
        <div class="grid-2">
          <div class="card"><span class="tag">✅ bash</span><p style="margin-top:.5rem">Ubuntu utilise <code>bash</code> et non <code>sh</code></p></div>
          <div class="card"><span class="tag">✅ --name</span><p style="margin-top:.5rem">Évite de manipuler les IDs</p></div>
        </div>`,
    },
    {
      num: 2,
      title: "Mettre à jour apt",
      tag: "setup",
      content: `<pre>apt update</pre>`,
    },
    {
      num: 3,
      title: "Installer nano",
      tag: "setup",
      content: `<pre>apt install nano -y</pre>`,
    },
    {
      num: 4,
      title: "Installer et configurer Apache2",
      tag: "apache",
      content: `
        <pre>apt install apache2 -y
service apache2 start</pre>
        <p>Vérification :</p>
        <pre>service apache2 status</pre>
        <p><span class="tag">✅ Apache tourne sur le port 80</span></p>`,
    },
    {
      num: 5,
      title: "Installer et configurer MySQL",
      tag: "mysql",
      content: `
        <pre>apt install mysql-server -y
service mysql start</pre>
        <p>Sécuriser MySQL :</p>
        <pre>mysql_secure_installation</pre>
        <table class="compare-table" style="margin-top:.8rem">
          <thead><tr><th>Question</th><th>Réponse</th></tr></thead>
          <tbody>
            <tr><td>Password validation</td><td>N</td></tr>
            <tr><td>Remove anonymous users</td><td>Y</td></tr>
            <tr><td>Disallow root login remotely</td><td>Y</td></tr>
            <tr><td>Remove test database</td><td>Y</td></tr>
            <tr><td>Reload privilege tables</td><td>Y</td></tr>
          </tbody>
        </table>
        <p style="margin-top:.8rem">Vérification :</p>
        <pre>service mysql status</pre>`,
    },
    {
      num: 6,
      title: "Installer et configurer PHP",
      tag: "php",
      content: `
        <pre>apt install php libapache2-mod-php php-mysql -y</pre>
        <div class="card" style="margin-top:.8rem">
          <span class="tag amber">⚠️ Fuseau horaire</span>
          <p style="margin-top:.5rem">Geographic area : <strong>8 (Europe)</strong><br>City/Region : <strong>Paris</strong></p>
        </div>
        <p style="margin-top:.8rem">Vérification :</p>
        <pre>php -v</pre>
        <p>Test PHP dans Apache :</p>
        <pre># ✅ Guillemets SIMPLES obligatoirement
echo '&lt;?php phpinfo(); ?&gt;' &gt; /var/www/html/info.php</pre>
        <p>Redémarre Apache :</p>
        <pre>service apache2 restart</pre>
        <div class="grid-2" style="margin-top:.8rem">
          <div class="card"><span class="tag amber">❌ Guillemets doubles</span><p style="margin-top:.5rem">Le shell interprète les caractères spéciaux</p></div>
          <div class="card"><span class="tag">✅ Guillemets simples</span><p style="margin-top:.5rem">Fonctionne correctement</p></div>
        </div>`,
    },
    {
      num: 7,
      title: "Installer et configurer phpMyAdmin",
      tag: "pma",
      content: `
        <pre>apt install phpmyadmin -y</pre>
        <table class="compare-table" style="margin-top:.8rem">
          <thead><tr><th>Question</th><th>Réponse</th></tr></thead>
          <tbody>
            <tr><td>Serveur web</td><td><code>apache2</code> (espace pour sélectionner)</td></tr>
            <tr><td>Configurer avec dbconfig</td><td>Yes</td></tr>
            <tr><td>Mot de passe phpMyAdmin</td><td>ton choix</td></tr>
          </tbody>
        </table>
        <p style="margin-top:.8rem">Crée le lien vers Apache :</p>
        <pre>ln -s /usr/share/phpmyadmin /var/www/html/phpmyadmin</pre>
        <pre>service apache2 restart</pre>`,
    },
    {
      num: 8,
      title: "Créer le script de démarrage automatique",
      tag: "script",
      content: `
        <pre>echo '#!/bin/bash
service apache2 start
service mysql start
tail -f /dev/null' &gt; /start.sh
chmod +x /start.sh</pre>
        <div class="grid-2" style="margin-top:.8rem">
          <div class="card"><span class="tag">✅ Auto-démarrage</span><p style="margin-top:.5rem">Lance apache2 + mysql à chaque démarrage du conteneur</p></div>
          <div class="card"><span class="tag">✅ tail -f /dev/null</span><p style="margin-top:.5rem">Maintient le conteneur en vie</p></div>
        </div>`,
    },
    {
      num: 9,
      title: "Quitter le conteneur",
      tag: "setup",
      content: `
        <pre>exit</pre>
        <p><span class="tag">✅ Le conteneur continue de tourner grâce au <code>-d</code></span></p>`,
    },
    {
      num: 10,
      title: "Commiter l'image",
      tag: "commit",
      content: `
        <pre>docker commit mon-ubuntu tonprenom-lamp</pre>
        <p>Vérification :</p>
        <pre>docker images</pre>
        <p><span class="tag">✅ Ton image <code>tonprenom-lamp</code> apparaît dans la liste</span></p>`,
    },
    {
      num: 11,
      title: "Lancer l'image finale",
      tag: "run",
      content: `
        <p>Stoppe et supprime l'ancien conteneur si besoin :</p>
        <pre>docker stop tonprenom-lamp && docker rm tonprenom-lamp</pre>
        <p>Lance avec <code>/start.sh</code> + bind mount :</p>
        <pre>docker run -di --name tonprenom-lamp -p 8080:80 \
  -v /home/cnd/Bureau/Projets/DevOps/Docker:/var/www/html \
  tonprenom-lamp /start.sh</pre>
        <div class="card" style="margin-top:.8rem">
          <span class="tag amber">⚠️ Casse Linux</span>
          <p style="margin-top:.5rem">Respecte exactement <code>DevOps</code> avec majuscules</p>
        </div>
        <p style="margin-top:.8rem">Vérifications :</p>
        <pre>docker exec tonprenom-lamp service apache2 status
docker exec tonprenom-lamp service mysql status
docker inspect tonprenom-lamp | grep -A3 Mounts</pre>`,
    },
    {
      num: 12,
      title: "Tester dans le navigateur",
      tag: "test",
      content: `
        <table class="compare-table">
          <thead><tr><th>URL</th><th>Résultat attendu</th></tr></thead>
          <tbody>
            <tr><td><code>http://localhost:8080</code></td><td>Page Apache ✅</td></tr>
            <tr><td><code>http://localhost:8080/info.php</code></td><td>Page PHP ✅</td></tr>
            <tr><td><code>http://localhost:8080/phpmyadmin</code></td><td>Interface phpMyAdmin ✅</td></tr>
          </tbody>
        </table>
        <div class="grid-2" style="margin-top:.8rem">
          <div class="card"><span class="tag">✅ Volume Docker</span><p style="margin-top:.5rem">Visible dans Docker Desktop</p></div>
          <div class="card"><span class="tag amber">Bind mount</span><p style="margin-top:.5rem">Non visible dans Docker Desktop — mais bien actif.<br>Vérifier via <strong>Containers → tonprenom-lamp → Inspect</strong></p></div>
        </div>`,
    },
  ],

  bilan: [
    {
      etape: "Lancer Ubuntu",
      cmd: "docker run -di --name mon-ubuntu ubuntu bash",
    },
    { etape: "Mettre à jour apt", cmd: "apt update" },
    { etape: "Installer nano", cmd: "apt install nano -y" },
    { etape: "Installer Apache", cmd: "apt install apache2 -y" },
    { etape: "Installer MySQL", cmd: "apt install mysql-server -y" },
    {
      etape: "Installer PHP",
      cmd: "apt install php libapache2-mod-php php-mysql -y",
    },
    { etape: "Fuseau horaire PHP", cmd: "Europe → Paris" },
    {
      etape: "Test PHP",
      cmd: "echo '<?php phpinfo(); ?>' > /var/www/html/info.php",
    },
    { etape: "Installer phpMyAdmin", cmd: "apt install phpmyadmin -y" },
    { etape: "Script /start.sh", cmd: "Auto-démarrage apache2 + mysql" },
    { etape: "Quitter le conteneur", cmd: "exit" },
    {
      etape: "Commiter l'image",
      cmd: "docker commit mon-ubuntu tonprenom-lamp",
    },
    {
      etape: "Bind mount",
      cmd: "-v /home/cnd/Bureau/Projets/DevOps/Docker:/var/www/html",
    },
    { etape: "Tester sur localhost", cmd: "http://localhost:8080" },
  ],
};

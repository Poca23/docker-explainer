# Exo 2 Docker — Ubuntu LAMP 🐧

## Objectif

Lancer un conteneur Ubuntu, installer une stack LAMP complète (Apache + MySQL + PHP + phpMyAdmin), puis commiter l'image.

## Commandes utiles — Rappel

| Commande                               | Rôle                                     |
| -------------------------------------- | ---------------------------------------- |
| `docker run -di --name <nom> <image>`  | Lance un conteneur nommé                 |
| `docker exec -ti <nom> bash`           | Rentre dans un conteneur Ubuntu          |
| `docker stop <nom>`                    | Stoppe un conteneur                      |
| `docker rm <nom>`                      | Supprime un conteneur                    |
| `docker commit <nom> <image>`          | Sauvegarde un conteneur en image         |
| `docker inspect <nom>`                 | Affiche tous les détails d'un conteneur  |
| `-v <chemin_local>:<chemin_conteneur>` | Monte un dossier local dans le conteneur |

---

## Étape 1 — Télécharger et lancer Ubuntu

```bash
docker run -di --name mon-ubuntu ubuntu bash
```

Vérification :

```bash
docker ps
```

Prends la main :

```bash
docker exec -ti mon-ubuntu bash
```

> ✅ Ubuntu utilise `bash` et non `sh`  
> ✅ `--name mon-ubuntu` évite de manipuler les IDs

---

## Étape 2 — Mettre à jour apt

```bash
apt update
```

---

## Étape 3 — Installer nano

```bash
apt install nano -y
```

---

## Étape 4 — Installer et configurer Apache2

```bash
apt install apache2 -y
service apache2 start
```

Vérification :

```bash
service apache2 status
```

> ✅ Apache tourne sur le port 80

---

## Étape 5 — Installer et configurer MySQL

```bash
apt install mysql-server -y
service mysql start
```

Sécuriser MySQL :

```bash
mysql_secure_installation
```

Réponds aux questions :

| Question                     | Réponse |
| ---------------------------- | ------- |
| Password validation          | N       |
| Remove anonymous users       | Y       |
| Disallow root login remotely | Y       |
| Remove test database         | Y       |
| Reload privilege tables      | Y       |

Vérification :

```bash
service mysql status
```

---

## Étape 6 — Installer et configurer PHP

```bash
apt install php libapache2-mod-php php-mysql -y
```

> ⚠️ Pendant l'installation, configuration du fuseau horaire :
>
> - Geographic area : **8 (Europe)**
> - City/Region : **Paris** (Europe/Paris)

Vérification :

```bash
php -v
```

Test PHP dans Apache :

```bash
# ✅ Guillemets SIMPLES obligatoirement
echo '<?php phpinfo(); ?>' > /var/www/html/info.php
```

Redémarre Apache pour charger le module PHP :

```bash
service apache2 restart
```

> ⚠️ Problèmes rencontrés et solutions :
>
> - ❌ Guillemets doubles `"` → le shell interprète les caractères spéciaux
> - ✅ Guillemets simples `'` → fonctionne correctement
> - PHP non interprété → résolu par le redémarrage d'Apache

---

## Étape 7 — Installer et configurer phpMyAdmin

```bash
apt install phpmyadmin -y
```

Pendant l'installation :

| Question                 | Réponse                                                         |
| ------------------------ | --------------------------------------------------------------- |
| Serveur web              | `apache2` (barre espace pour sélectionner, Entrée pour valider) |
| Configurer avec dbconfig | Yes                                                             |
| Mot de passe phpMyAdmin  | celui de ton choix                                              |

Crée le lien vers Apache :

```bash
ln -s /usr/share/phpmyadmin /var/www/html/phpmyadmin
```

Redémarre Apache :

```bash
service apache2 restart
```

---

## Étape 8 — Créer le script de démarrage automatique

```bash
echo '#!/bin/bash
service apache2 start
service mysql start
tail -f /dev/null' > /start.sh
chmod +x /start.sh
```

> ✅ Ce script démarre apache2 + mysql automatiquement à chaque lancement du conteneur  
> ✅ `tail -f /dev/null` maintient le conteneur en vie

---

## Étape 9 — Quitter le conteneur

```bash
exit
```

> ✅ Le conteneur continue de tourner grâce au `-d`

---

## Étape 10 — Commiter l'image

```bash
docker commit mon-ubuntu claire-lamp
```

Vérification :

```bash
docker images
```

> ✅ Ton image `claire-lamp` apparaît dans la liste

---

## Étape 11 — Lancer l'image finale avec services auto-démarrés et bind mount

Stoppe et supprime l'ancien conteneur si besoin :

```bash
docker stop claire-lamp && docker rm claire-lamp
```

Lance avec `/start.sh` + bind mount :

```bash
docker run -di --name claire-lamp -p 8080:80 -v /home/cnd/Bureau/Projets/DevOps/Docker:/var/www/html claire-lamp /start.sh
```

> ⚠️ Linux est sensible à la casse → respecte exactement `DevOps` avec majuscules

Vérification des services :

```bash
docker exec claire-lamp service apache2 status
docker exec claire-lamp service mysql status
```

Vérification du bind mount :

```bash
docker inspect claire-lamp | grep -A3 Mounts
```

---

## Étape 12 — Tester dans le navigateur

| URL                                | Résultat attendu        |
| ---------------------------------- | ----------------------- |
| `http://localhost:8080`            | Page Apache ✅          |
| `http://localhost:8080/info.php`   | Page PHP ✅             |
| `http://localhost:8080/phpmyadmin` | Interface phpMyAdmin ✅ |

---

## Note sur les volumes

| Type                   | Visible dans Docker Desktop |
| ---------------------- | --------------------------- |
| Volume Docker          | ✅ Oui                      |
| Bind mount (notre cas) | ❌ Non — mais bien actif    |

> Pour vérifier ton bind mount dans Docker Desktop :  
> **Containers → claire-lamp → Inspect**

---

## Bilan

| Étape                | Commande                                                  | Statut |
| -------------------- | --------------------------------------------------------- | ------ |
| Lancer Ubuntu        | `docker run -di --name mon-ubuntu ubuntu bash`            | ✅     |
| Mettre à jour apt    | `apt update`                                              | ✅     |
| Installer nano       | `apt install nano -y`                                     | ✅     |
| Installer Apache     | `apt install apache2 -y`                                  | ✅     |
| Installer MySQL      | `apt install mysql-server -y`                             | ✅     |
| Installer PHP        | `apt install php libapache2-mod-php php-mysql -y`         | ✅     |
| Fuseau horaire PHP   | Europe → Paris                                            | ✅     |
| Test PHP             | `echo '<?php phpinfo(); ?>' > /var/www/html/info.php`     | ✅     |
| Installer phpMyAdmin | `apt install phpmyadmin -y`                               | ✅     |
| Script `/start.sh`   | Auto-démarrage apache2 + mysql                            | ✅     |
| Quitter le conteneur | `exit`                                                    | ✅     |
| Commiter l'image     | `docker commit mon-ubuntu claire-lamp`                    | ✅     |
| Bind mount           | `-v /home/cnd/Bureau/Projets/DevOps/Docker:/var/www/html` | ✅     |
| Tester sur localhost | `http://localhost:8080`                                   | ✅     |

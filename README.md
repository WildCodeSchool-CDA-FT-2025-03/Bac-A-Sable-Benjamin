# 🚀 GitHub Repo Explorer

Une application web élégante pour explorer les dépôts GitHub d'un utilisateur, avec des fonctionnalités de filtrage et de tri.

## 🔗 Site en ligne

Le projet est accessible en ligne sur **[https://github-repo-explorer.fr/](https://github-repo-explorer.fr/)**

N'hésitez pas à visiter le site pour explorer les fonctionnalités de l'application.

## ✨ Fonctionnalités

- 🔍 Recherche des dépôts par nom d'utilisateur
- 🗂️ Filtrage par type de dépôt (publics/privés)
- ⭐ Tri par étoiles, forks, nom ou date de création
- 📱 Interface responsive et moderne
- ✨ Animations fluides avec Framer Motion
- 🌙 Design sombre élégant

## 🛠️ Technologies utilisées

- React avec TypeScript
- Express.js pour le backend
- GitHub CLI pour l'API
- Framer Motion pour les animations
- Tailwind CSS pour le style
- Zod pour la validation des données

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- GitHub CLI installé et authentifié sur votre machine

## 🚀 Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/WildCodeSchool-CDA-FT-2025-03/Bac-A-Sable-Benjamin.git github-repo-explorer
   cd github-repo-explorer
   ```

2. Installez les dépendances :
   ```bash
   # Dans le répertoire racine pour le backend
   npm install
   
   # Dans le répertoire client pour le frontend
   cd client
   npm install
   ```

3. Assurez-vous que GitHub CLI est installé et authentifié :
   ```bash
   # Installation (si nécessaire)
   # Pour macOS
   brew install gh
   
   # Pour Windows
   winget install --id GitHub.cli
   
   # Authentification
   gh auth login
   ```

4. Démarrez le projet en mode développement :
   ```bash
   # Démarrez le backend (depuis la racine)
   npm run dev
   
   # Dans un autre terminal, démarrez le frontend
   cd client
   npm run dev
   ```

5. Ouvrez votre navigateur à l'adresse : http://localhost:5173

## 🌐 Déploiement

Pour déployer l'application en production :

```bash
# Construire le frontend
cd client
npm run build

# Démarrer le serveur en production
cd ..
npm start
```

## 📝 Licence

Ce projet est sous licence MIT.

## 🙏 Remerciements

Un grand merci à la **Wild Code School** pour leur accompagnement et leur formation exceptionnelle! Ce projet a été développé dans le cadre de la formation Concepteur Développeur d'Applications (CDA).

---

💻 Développé avec ❤️ par [Dilgo-dev](https://github.com/dilgo-dev)
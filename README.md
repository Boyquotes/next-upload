# Next.js File Upload App

Une application Next.js 15.3.3 pour l'upload de fichiers avec React Dropzone, prête pour le déploiement sur Render.com.

## Fonctionnalités

- ✅ Upload de fichiers par glisser-déposer ou sélection
- ✅ Support multi-fichiers
- ✅ Affichage des fichiers uploadés
- ✅ Téléchargement des fichiers
- ✅ Interface responsive
- ✅ Limitation de taille (10MB par fichier)
- ✅ Pages iframe pour contenu externe
- ✅ Prêt pour le déploiement sur Render.com

## Pages disponibles

- **`/`** - Page d'upload principale
- **`/iframe`** - Page iframe avec contrôles et navigation
- **`/iframe-simple`** - Page iframe simple plein écran

## Développement local

### Installation

```bash
npm install
```

### Démarrage en mode développement

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

### Build de production

```bash
npm run build
npm start
```

## Déploiement sur Render.com

### Méthode 1: Avec render.yaml (recommandée)

1. Créez un compte sur [Render.com](https://render.com)
2. Connectez votre repository GitHub
3. Le fichier `render.yaml` est déjà configuré
4. Render détectera automatiquement la configuration

### Méthode 2: Configuration manuelle

1. Créez un nouveau Web Service sur Render
2. Connectez votre repository
3. Configurez les paramètres :
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment:** Node
   - **Node Version:** 18 ou supérieur

### Variables d'environnement

Aucune variable d'environnement spécifique n'est requise pour le fonctionnement de base.

## Structure du projet

```
nextUpload/
├── src/
│   └── app/
│       ├── api/
│       │   ├── upload/
│       │   │   └── route.ts        # API pour l'upload
│       │   └── files/
│       │       └── [filename]/
│       │           └── route.ts    # API pour servir les fichiers
│       ├── globals.css             # Styles globaux
│       ├── layout.tsx              # Layout principal
│       └── page.tsx                # Page d'accueil avec upload
├── uploads/                        # Dossier pour les fichiers uploadés
├── next.config.js                  # Configuration Next.js
├── package.json                    # Dépendances
├── render.yaml                     # Configuration Render
└── README.md                       # Ce fichier
```

## Test des uploads sur Render

Une fois déployé sur Render, vous pouvez tester :

1. Accédez à votre URL Render
2. Uploadez quelques fichiers
3. Vérifiez qu'ils apparaissent dans la liste
4. Testez le téléchargement des fichiers

**Note importante:** Les fichiers uploadés sur Render sont temporaires et peuvent être supprimés lors des redémarrages. Pour un stockage persistant en production, il faudrait utiliser un service de stockage externe comme AWS S3, Cloudinary, ou similaire.

## Technologies utilisées

- **Next.js 15.3.3** - Framework React
- **React 18** - Bibliothèque UI
- **React Dropzone** - Composant de glisser-déposer
- **TypeScript** - Typage statique
- **Render.com** - Plateforme de déploiement

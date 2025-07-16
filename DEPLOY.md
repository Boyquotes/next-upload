# Guide de déploiement sur Render.com

## Étapes pour déployer

### 1. Préparer le repository
✅ Repository Git initialisé et committé

### 2. Pousser sur GitHub
```bash
# Créer un repository sur GitHub puis :
git remote add origin https://github.com/VOTRE-USERNAME/nextUpload.git
git branch -M main
git push -u origin main
```

### 3. Déployer sur Render
1. Aller sur [render.com](https://render.com)
2. Se connecter avec GitHub
3. Cliquer sur "New +" puis "Web Service"
4. Sélectionner votre repository `nextUpload`
5. Render détectera automatiquement le `render.yaml`
6. Cliquer sur "Deploy"

### 4. Configuration automatique
Le fichier `render.yaml` configurera automatiquement :
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Environment:** Node.js
- **Port:** 3000 (automatique)

### 5. Tester l'upload
Une fois déployé, vous pourrez :
- Accéder à votre app via l'URL fournie par Render
- Tester l'upload de fichiers
- Vérifier que les fichiers sont bien stockés
- Télécharger les fichiers uploadés

### Note importante sur le stockage
⚠️ **Attention:** Sur Render, les fichiers uploadés dans le système de fichiers sont **temporaires**. Ils peuvent être supprimés lors des redémarrages ou des déploiements.

Pour une utilisation en production, il faudrait :
- Intégrer un service de stockage comme AWS S3, Cloudinary, ou Google Cloud Storage
- Modifier les routes API pour utiliser ces services
- Ajouter les variables d'environnement nécessaires

### Monitoring
Render fournit :
- Logs en temps réel
- Métriques de performance
- Alertes en cas de problème
- SSL automatique

### Domaine personnalisé
Vous pouvez également ajouter votre propre domaine dans les paramètres du service sur Render.

## Test local avant déploiement
```bash
npm run build
npm start
```

L'application sera disponible sur `http://localhost:3000`

## Résolution des problèmes courants

### Erreur `MODULE_NOT_FOUND` avec `npm start`
Si vous obtenez une erreur comme `Cannot find module './447.js'`, c'est généralement un problème de build corrompu :

```bash
# Nettoyer et reconstruire
rm -rf .next
rm -rf node_modules
npm install
npm run build
npm start
```

### Erreur `EADDRINUSE` (port déjà utilisé)
Si le port 3000 est déjà utilisé :

```bash
# Trouver le processus
ps aux | grep -i next
# Tuer le processus (remplacer PID par l'ID du processus)
kill -9 PID
# Ou utiliser un port différent
PORT=3001 npm start
```

### Vérifications avant déploiement
1. ✅ Build local réussi : `npm run build`
2. ✅ Serveur de production fonctionne : `npm start`
3. ✅ Test d'upload en local
4. ✅ Repository Git à jour
5. ✅ Fichiers dans `.gitignore` appropriés

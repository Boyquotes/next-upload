# Pages Iframe

L'application inclut maintenant deux pages iframe pour intégrer du contenu externe :

## 📄 Pages disponibles

### 1. Page Upload principale
- **URL:** `/`
- **Description:** Page d'upload de fichiers avec liens vers les iframes
- **Fonctionnalités:** Upload, liste des fichiers, navigation

### 2. Page Iframe avec contrôles
- **URL:** `/iframe`
- **Description:** Iframe avec interface de contrôle
- **Fonctionnalités:**
  - Barre de navigation avec titre
  - Bouton retour vers la page upload
  - Bouton pour ouvrir dans un nouvel onglet
  - Indicateur de statut de chargement
  - Informations sur l'URL chargée
  - Avertissement de sécurité

### 3. Page Iframe simple
- **URL:** `/iframe-simple`
- **Description:** Iframe plein écran sans contrôles
- **Fonctionnalités:**
  - Affichage plein écran
  - Pas d'interface supplémentaire
  - Intégration directe du contenu

## 🔧 Configuration

### URL cible
L'iframe charge actuellement : `http://37.187.141.70:3002/`

### Sécurité
Les iframes utilisent l'attribut `sandbox` avec les permissions :
- `allow-same-origin` : Autorise le même origine
- `allow-scripts` : Autorise l'exécution de scripts
- `allow-popups` : Autorise les popups
- `allow-forms` : Autorise les formulaires

## 📝 Personnalisation

### Changer l'URL de l'iframe
Pour modifier l'URL, éditez les fichiers :
- `src/app/iframe/page.tsx` (ligne avec `src="http://37.187.141.70:3002/"`)
- `src/app/iframe-simple/page.tsx` (ligne avec `src="http://37.187.141.70:3002/"`)

### Modifier les permissions sandbox
Ajustez l'attribut `sandbox` selon vos besoins :
```typescript
sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
```

### Styles personnalisés
Les styles sont définis inline dans les composants. Vous pouvez les modifier directement ou les déplacer vers des fichiers CSS séparés.

## ⚠️ Considérations importantes

1. **Sécurité** : Vérifiez toujours que l'URL externe est fiable
2. **CORS** : Certains sites peuvent bloquer l'intégration en iframe
3. **Performances** : Le contenu externe peut affecter les performances
4. **Responsive** : L'iframe s'adapte à la taille de la fenêtre

## 🚀 Déploiement

Ces pages seront automatiquement déployées avec le reste de l'application sur Render.com. Assurez-vous que l'URL externe est accessible depuis les serveurs de Render.

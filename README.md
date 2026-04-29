# 🪪 TierZen — Frontend

Interface Angular pour la carte tiers payant digitale **TierZen** — _"Le tiers payant, sans stress"_

---

## 🏗️ Stack technique

| Élément   | Valeur          |
| --------- | --------------- |
| Framework | Angular 21      |
| Langage   | TypeScript      |
| QR Code   | angularx-qrcode |
| Mobile    | Capacitor       |
| Style     | CSS custom      |
| Build     | Angular CLI     |

---

## 🚀 Lancer le projet en local

```bash
npm install
ng serve
```

> L'application est accessible sur `http://localhost:4200`

---

## 📁 Structure du projet

```
tierzen-frontend/
├── src/
│   ├── app/
│   │   ├── card/              # Composant carte digitale
│   │   ├── services/
│   │   │   ├── adherent.service.ts   # Appels API REST
│   │   │   └── mobile.service.ts     # Capacitor Preferences + Share
│   │   └── app.component.ts
│   └── styles.css             # Charte graphique globale
├── public/
├── angular.json
└── package.json
```

---

## ✨ Fonctionnalités

| #   | Fonctionnalité            | Description                                        |
| --- | ------------------------- | -------------------------------------------------- |
| 1   | 🪪 Carte digitale         | Infos adhérent fictif + QR Code dynamique          |
| 2   | 🔄 Mise à jour temps réel | Appel API REST backend                             |
| 3   | 💾 Accès hors-ligne       | Capacitor Preferences — fallback local             |
| 4   | 📤 Partage familial       | Capacitor Share — natif mobile / clipboard desktop |

---

## 🌐 Déploiement

```
Frontend →  VPS Scaleway · Angular build · servi via Nginx · ✅ En ligne
URL      →  https://tierzen.webisyours.com
HTTPS    →  🔒 Let's Encrypt — valide (TLS 1.3)
```

### Build production

```bash
ng build
```

> Le build est généré dans `dist/` puis envoyé sur le VPS via `scp`.

---

## 💡 Note technique — Partage Capacitor

Le partage natif (Web Share API) nécessite **HTTPS**.

| Contexte     | Comportement           |
| ------------ | ---------------------- |
| Mobile HTTPS | ✅ Partage natif       |
| Desktop      | 📋 Copie presse-papier |
| HTTP         | ❌ Bloqué              |

---

## 💡 Choix techniques

| Choix                 | Justification                                             |
| --------------------- | --------------------------------------------------------- |
| Angular 21            | Framework complet, TypeScript natif, structure imposée    |
| Composants standalone | Nouvelle syntaxe Angular — pas de NgModule                |
| `@if`                 | Nouvelle syntaxe Angular — remplace `*ngIf`               |
| Interface TypeScript  | Contrat typé entre frontend et backend                    |
| `AdherentService`     | Séparation des responsabilités — appels API isolés        |
| `MobileService`       | Séparation des responsabilités — logique Capacitor isolée |
| `ChangeDetectorRef`   | Mise à jour manuelle de la vue après appel asynchrone     |
| `angularx-qrcode`     | Génération QR Code dynamique côté client                  |
| Capacitor Preferences | Persistance hors-ligne sans backend                       |

---

## 🎨 Charte graphique

| Variable          | Valeur    | Usage                               |
| ----------------- | --------- | ----------------------------------- |
| `--color-primary` | `#9C0A0F` | Rouge bordeaux — couleur principale |
| `--color-accent`  | `#EF7C00` | Orange — mise en valeur             |
| `--color-dark`    | `#0E1226` | Texte foncé                         |
| `--color-muted`   | `#6F6F6F` | Texte secondaire                    |
| `--color-bg`      | `#F4F4F4` | Fond de page                        |
| `--color-white`   | `#FFFFFF` | Cartes et surfaces                  |

---

## 📐 Principes de développement

- ✅ **Scalable** — composants Angular indépendants, services séparés
- ✅ **Maintenable** — interfaces TypeScript, code commenté
- ✅ **Modulaire** — `AdherentService` / `MobileService` / `CardComponent`
- ✅ **Léger** — pas de dépendances inutiles
- ✅ **Sécurisé** — gestion des erreurs HTTP, fallback hors-ligne
- ✅ **Mobile-first** — Capacitor + styles responsive
- ✅ **Bonnes pratiques Git** — commits conventionnels, branches, README

---

## 🔗 Projet complet

| Dépôt    | Lien                                       |
| -------- | ------------------------------------------ |
| Backend  | https://github.com/Poca23/tierzen-backend  |
| Frontend | https://github.com/Poca23/tierzen-frontend |

> Le nom **TierZen** est une création originale — projet portfolio libre de droits.

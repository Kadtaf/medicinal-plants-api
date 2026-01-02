# Huiles Essentielles – Application Full-Stack

Une application web complète pour explorer, filtrer et gérer des huiles essentielles à partir des plantes dont elles sont issues. Ce projet met en œuvre une architecture modulaire Spring Boot + React, avec une attention particulière portée à l’UX, à la validation visuelle et à la séparation des responsabilités.

---

## Fonctionnalités principales

- 🌿 Catalogue des plantes : liste, fiche détaillée, image, navigation vers les huiles associées
- Catalogue des huiles essentielles : liste, fiche détaillée, bienfaits, précautions
- 🔗 Lien plante ↔ huile : relation One-to-One avec navigation bidirectionnelle
- Fil d’Ariane : navigation hiérarchique entre vues
- ✅ Validation visuelle : icônes de feedback dans les formulaires (vert/rouge)
- 🔐 Authentification : gestion des rôles (admin, utilisateur)
- 🛠️ CRUD complet : pour les plantes, huiles, utilisateurs (admin uniquement)
- 🖼Gestion des images : synchronisation backend/frontend avec DTO dédié
- Navigation fluide : React Router, liens croisés, retour contextuel

---

## Stack technique

| Frontend            | Backend         | Sécurité & Auth | DevOps & Outils   |
|---------------------|-----------------|-----------------|-------------------|
| React + JSX         | Spring Boot     | JWT             | Git & GitHub      |
| Axios + React-icons | Spring Security | Role-based auth | Intellij          |
| React Router        | JPA + Hibernate | Protected routes| Postman, Swagger  |
| CSS Modules         | REST API        | Token storage   | .env / .gitignore |

---

---

## ⚠️ Sécurité & bonnes pratiques

- `.env` et `application.properties` sont exclus du dépôt via `.gitignore`
- Aucun token ou mot de passe n’est versionné
- Les routes sensibles sont protégées par rôle
- Les images sont filtrées par domaine (ex: huiles uniquement)
- Architecture modulaire : DTOs, contrôleurs, services bien séparés

---

## Évolutions à venir

### Fonctionnelles
- [ ] Filtrage par bienfaits dans la liste des huiles
- [ ] Ajout de tests unitaires (Jest côté React, JUnit côté Spring)
- [ ] Statistiques d’usage des huiles (fréquence, popularité)
- [ ] Ajout de favoris ou d’une wishlist utilisateur
- [ ] Navigation par familles botaniques
- [ ] Responsive design mobile

### Techniques
- [ ] Refactorisation des services Axios avec `axios.create()` et interceptors
- [ ] Pagination et lazy loading pour les listes longues
- [ ] Internationalisation : FR / EN
- [ ] Ajout de tests d’intégration avec MockMvc côté backend
- [ ] CI/CD GitHub Actions pour build + test automatique

---

## 🧑‍💻 Auteur

# Plantes Médicinales 
Développeur Full Stack en reconversion, passionné par l’architecture modulaire, la validation UX et la rigueur métier.  

💼 [LinkedIn](#) | Portfolio en cours

---

## 📜 Licence

Ce projet est open-source et librement réutilisable à des fins pédagogiques ou personnelles.



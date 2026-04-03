# Kit CRM White-Label — Guide de déploiement

## Fichiers du kit

| Fichier | Rôle |
|---|---|
| `config.js` | **Seul fichier à modifier** — société, couleurs, Supabase |
| `setup.html` | Assistant graphique de configuration |
| `commande.html` | Bon de commande revendeur |
| `crm.html` | CRM complet (prospects, clients, commandes) |
| `prospect.html` | Formulaire création prospect |

---

## Déploiement d'un nouveau client (5 minutes)

### Étape 1 — Créer un projet Supabase
1. Aller sur [supabase.com](https://supabase.com) → New project
2. Région : Europe (Frankfurt)
3. Récupérer dans **Settings → API** :
   - **Project URL** : `https://xxxxxxxx.supabase.co`
   - **anon public key** : `eyJ...`

### Étape 2 — Créer les tables
Dans **Supabase → SQL Editor**, coller et exécuter ce SQL :

```sql
create table if not exists commandes (
  id text primary key, ref text, date text,
  societe text, ville text, cp text, email text,
  contact text, telephone text, profil text,
  total_ht numeric, total_colis integer, total_uvc integer,
  tva numeric, total_ttc numeric, franco text,
  lignes jsonb, commentaire text,
  client_id text, num_client text,
  created_at timestamptz default now()
);
create table if not exists prospects (
  id text primary key, raison_sociale text,
  rue text, complement text, cp text, ville text,
  tel_magasin text, email_magasin text, surface text,
  siret text, tva_intra text, capital text, naf text,
  contact1 text, tel1 text, portable1 text, email1 text,
  contact2 text, tel2 text, fonction text,
  contact_factu text, email_factu text,
  jours_livraison jsonb, heure_debut text, heure_fin text,
  info_livraison text, potentiel text, profil text,
  commentaire text, created_at timestamptz default now()
);
create table if not exists clients (
  id text primary key, num_client text,
  raison_sociale text, rue text, complement text,
  cp text, ville text, tel_magasin text, email_magasin text,
  surface text, siret text, tva_intra text, capital text,
  naf text, contact1 text, tel1 text, portable1 text,
  email1 text, contact2 text, tel2 text, fonction text,
  contact_factu text, email_factu text, jours_livraison jsonb,
  heure_debut text, heure_fin text, info_livraison text,
  potentiel text, profil text, conditions_paiement text,
  notes_internes text, converted_at text,
  created_at timestamptz default now()
);
create table if not exists catalogue (
  id text primary key, categorie text, nom text,
  poids text, ean text, pcb integer,
  prix_ht numeric, tva numeric, description text,
  actif boolean default true,
  created_at timestamptz default now()
);
alter table commandes enable row level security;
alter table prospects enable row level security;
alter table clients enable row level security;
alter table catalogue enable row level security;
create policy "public_all" on commandes for all using (true) with check (true);
create policy "public_all" on prospects for all using (true) with check (true);
create policy "public_all" on clients for all using (true) with check (true);
create policy "public_all" on catalogue for all using (true) with check (true);
```

### Étape 3 — Configurer config.js
Ouvrir `setup.html` dans le navigateur et remplir les 5 étapes :
1. Société & Apparence (nom, logo, couleurs)
2. Supabase (URL + clé)
3. Catalogue (import Excel)
4. Profils revendeurs & conditions
5. Télécharger le `config.js` généré

Ou modifier directement `config.js` :
```javascript
var KIT_CONFIG = {
  societe: {
    nom: "NOM CLIENT",
    email: "commandes@client.fr",
    contact: "Nom Commercial",
    telephone: "06 XX XX XX XX"
  },
  theme: {
    couleur_principale: "#22c55e",
    logo_emoji: "🌿"
  },
  supabase: {
    url: "https://XXXXXXXX.supabase.co",
    key: "eyJ..."
  },
  conditions: {
    tva_taux: 5.5,
    franco_port_ht: 450,
    franco_port_colis: 5,
    tarif_version: "V1 — 2026"
  },
  profils: [
    { nom: "Tarif Standard", remise: 0 },
    { nom: "Revendeur Premium", remise: 10 }
  ],
  crm: {
    mot_de_passe: "motdepasse2026",
    prefix_client: "CLI"
  }
};
KIT_CONFIG.societe.email_fn = function() {
  return ['commandes','client.fr'].join('@');
};
```

### Étape 4 — Importer le catalogue
Via `setup.html` → Étape 3 : glisser le fichier Excel tarif.
Colonnes reconnues automatiquement : Désignation, Poids, EAN, PCB, Prix HT, TVA, Catégorie.

### Étape 5 — Déployer
Déposer les 5 fichiers sur le serveur du client. Terminé.

---

## Architecture

```
Client A                    Client B
├── config.js    ←──────    ├── config.js
├── commande.html           ├── commande.html  (identique)
├── crm.html                ├── crm.html       (identique)
├── prospect.html           └── prospect.html  (identique)
│
└── Supabase A              └── Supabase B
    (données isolées)           (données isolées)
```

Chaque client a **son propre projet Supabase** → données 100% isolées.
Les fichiers HTML/JS sont identiques → une mise à jour = mise à jour de tous les clients.

---

## Personnalisation avancée

| Besoin | Où modifier |
|---|---|
| Nouveau profil revendeur | `config.js` → `profils` |
| Changer les couleurs | `config.js` → `theme` |
| Changer le mot de passe CRM | `config.js` → `crm.mot_de_passe` |
| Modifier le catalogue | `setup.html` → Étape 3, ou Supabase → Table `catalogue` |
| Conditions franco/TVA | `config.js` → `conditions` |

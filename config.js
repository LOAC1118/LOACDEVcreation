/* ============================================================
   KIT CRM WHITE-LABEL — CONFIGURATION
   Remplissez ce fichier pour déployer votre CRM
   ============================================================ */

var KIT_CONFIG = {

  /* ── SOCIÉTÉ ─────────────────────────────────────────── */
  societe: {
    nom:         "BIO N TRUFFE",           // Nom affiché partout
    slogan:      "L'épicerie fine à la truffe, certifiée bio",
    email:       "contact@biontruffe.fr",  // Email de réception des BDC
    telephone:   "06 78 37 89 06",
    contact:     "Christophe SPOTO",
    adresse:     "65 Allée des Oliviers II, 84290 CAIRANNE",
    site:        "www.biontruffe.fr",
    siret:       "91796844800014"
  },

  /* ── APPARENCE ───────────────────────────────────────── */
  theme: {
    couleur_principale: "#22c55e",   // Vert menthe BNT
    couleur_foncee:     "#15803d",
    couleur_claire:     "#4ade80",
    couleur_fond:       "#f7fdf9",
    couleur_fond_card:  "#f0fdf4",
    logo_url:           "",          // URL image logo (laisser vide = icône texte)
    logo_emoji:         "🌿",        // Emoji si pas de logo
    logo_texte:         "BIO N TRUFFE",
    font_titre:         "DM Serif Display",
    font_corps:         "DM Sans"
  },

  /* ── SUPABASE ────────────────────────────────────────── */
  supabase: {
    url: "https://gtezzribrwfjeplkartf.supabase.co",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0ZXp6cmlicndmamVwbGthcnRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNjY2NDcsImV4cCI6MjA5MDY0MjY0N30.8eeGmS6gIwV7y8s4u7zlDYdpZC19avPIqbA4fXj-3gM"
  },

  /* ── CATALOGUE ───────────────────────────────────────── */
  /* Le catalogue peut être :
     - chargé depuis Supabase (si table "catalogue" existe)
     - ou défini ici en dur (fallback)
     Utilisez setup.html pour importer un catalogue Excel */
  catalogue_source: "supabase",  // "supabase" ou "inline"

  /* ── CONDITIONS COMMERCIALES ─────────────────────────── */
  conditions: {
    tva_taux:           5.5,    // %
    franco_port_ht:     450,    // EUR
    franco_port_colis:  5,
    minimum_commande_ht: 450,
    tarif_version:      "V15 — 01/03/2026"
  },

  /* ── PROFILS REVENDEURS ──────────────────────────────── */
  profils: [
    { id: "p1", nom: "Tarif Général MBS",    remise: 0  },
    { id: "p2", nom: "Revendeur Premium",    remise: 10 },
    { id: "p3", nom: "Distributeur Exclusif",remise: 15 }
  ],

  /* ── CRM ─────────────────────────────────────────────── */
  crm: {
    mot_de_passe: "biontruffe2026",  // Mot de passe accès CRM
    prefix_client: "BNT"             // Préfixe numéros clients ex: BNT-0001
  }

};

const { Pool } = require('pg');
const env = require('./env');

let pool = null;
let isPostgresConnected = false;

// Instance PostgreSQL principale
try {
  pool = new Pool({
    connectionString: env.DATABASE_URL,
    connectionTimeoutMillis: 3000,
    idleTimeoutMillis: 30000
  });

  pool.on('error', (err) => {
    console.warn('[PostgreSQL Warning]:', err.message);
  });
} catch (e) {
  console.warn('[PostgreSQL Init]', e.message);
}

// Données en mémoire de secours (au cas où PostgreSQL n'est pas encore lancé localement)
const memoryStore = {
  users: [
    {
      id: '00000000-0000-0000-0000-000000000001',
      full_name: 'Jean Pierre MANGA',
      username: 'jeanpierremanga',
      email: 'jeanpierre@afribook.africa',
      phone: '+237699001122',
      password_hash: '$2a$12$e0M2/W3K2W4lEa7yqY8RkOq8t7g9k9p5i5s7h1g2k3l4m5n6o7p8q',
      avatar_url: 'images/avatar-jeanpierre.jpg',
      cover_url: 'images/post-yaounde.jpg',
      bio: "Leader d'opinion & entrepreneur panafricain. Ensemble pour une Afrique connectée ! 🇨🇲🌍",
      city: 'Yaoundé',
      country: 'Cameroun',
      preferred_language: 'fr',
      low_data_mode: false,
      is_verified: true,
      is_active: true,
      created_at: new Date('2026-01-01T08:00:00Z')
    },
    {
      id: '11111111-1111-1111-1111-111111111111',
      full_name: 'Aminata Diallo',
      username: 'aminata_d',
      email: 'aminata@afribook.africa',
      phone: '+221770001122',
      password_hash: '$2a$12$e0M2/W3K2W4lEa7yqY8RkOq8t7g9k9p5i5s7h1g2k3l4m5n6o7p8q', // demo
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      cover_url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
      bio: "Passionnée d'AgriTech et de solutions durables pour les producteurs locaux au Sahel 🌱. Fondatrice de SunuBio.",
      city: 'Dakar',
      country: 'Sénégal',
      preferred_language: 'fr',
      low_data_mode: false,
      is_verified: true,
      is_active: true,
      created_at: new Date('2026-01-10T10:00:00Z')
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      full_name: 'Koffi Mensah',
      username: 'koffi_code',
      email: 'koffi@afribook.africa',
      phone: '+225070022334',
      password_hash: '$2a$12$e0M2/W3K2W4lEa7yqY8RkOq8t7g9k9p5i5s7h1g2k3l4m5n6o7p8q',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      cover_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      bio: 'Ingénieur Logiciel & FinTech | Spécialiste architectures résilientes et paiement mobile ⚡',
      city: 'Abidjan',
      country: "Côte d'Ivoire",
      preferred_language: 'fr',
      low_data_mode: true,
      is_verified: true,
      is_active: true,
      created_at: new Date('2026-01-12T11:00:00Z')
    },
    {
      id: '33333333-3333-3333-3333-333333333333',
      full_name: 'Fatou Traoré',
      username: 'fatou_ux',
      email: 'fatou@afribook.africa',
      phone: '+22366003344',
      password_hash: '$2a$12$e0M2/W3K2W4lEa7yqY8RkOq8t7g9k9p5i5s7h1g2k3l4m5n6o7p8q',
      avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      cover_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      bio: "Designer Produit & UI/UX axée sur l'accessibilité et les interfaces légères 📱",
      city: 'Bamako',
      country: 'Mali',
      preferred_language: 'fr',
      low_data_mode: true,
      is_verified: false,
      is_active: true,
      created_at: new Date('2026-01-15T09:30:00Z')
    }
  ],
  posts: [
    {
      id: '99999999-9999-9999-9999-999999999991',
      author_id: '11111111-1111-1111-1111-111111111111',
      group_id: null,
      content: "Fiers d'annoncer le déploiement de nos capteurs solaires connectés dans 12 fermes maraîchères de la région de Thiès ! 🌾 Grâce à l'interface AfriBook optimisée en basse bande passante, les alertes s'affichent instantanément sans gaspillage de forfait. L'innovation africaine par et pour l'Afrique ! 🌍✨",
      media_url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80',
      media_low_data_url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=300&q=30',
      media_type: 'image',
      visibility: 'public',
      created_at: new Date(Date.now() - 3600000 * 3)
    },
    {
      id: '99999999-9999-9999-9999-999999999992',
      author_id: '22222222-2222-2222-2222-222222222222',
      group_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      content: "Question pour les devs backend : qui a déjà mis en place des webhooks résilients avec idempotence pour les API Wave et MTN MoMo ? Face aux micro-coupures réseau, quel système de retry préférez-vous entre Redis BullMQ et le Transactional Outbox pattern de PostgreSQL ? 💻⚡",
      media_url: null,
      media_low_data_url: null,
      media_type: null,
      visibility: 'public',
      created_at: new Date(Date.now() - 3600000 * 6)
    }
  ],
  groups: [
    {
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      owner_id: '22222222-2222-2222-2222-222222222222',
      name: "Tech & Développeurs Afrique de l'Ouest",
      slug: 'tech-dev-afrique-ouest',
      description: "Communauté d'échange technique, entraide sur Node.js, Flutter, React, Cloud et architectures résilientes.",
      cover_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      category: 'Tech & Innovation',
      city: 'Abidjan',
      country: "Côte d'Ivoire",
      privacy: 'public',
      members_count: 1420
    },
    {
      id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
      owner_id: '11111111-1111-1111-1111-111111111111',
      name: 'AgriTech & Éco-Entrepreneurs Sahel',
      slug: 'agritech-eco-sahel',
      description: "Partage de bonnes pratiques agricoles, irrigation solaire et valorisation des produits locaux.",
      cover_url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80',
      category: 'Agriculture & Écologie',
      city: 'Dakar',
      country: 'Sénégal',
      privacy: 'public',
      members_count: 850
    }
  ],
  reactions: [
    { post_id: '99999999-9999-9999-9999-999999999991', user_id: '22222222-2222-2222-2222-222222222222', reaction_type: 'love' },
    { post_id: '99999999-9999-9999-9999-999999999991', user_id: '33333333-3333-3333-3333-333333333333', reaction_type: 'support' },
    { post_id: '99999999-9999-9999-9999-999999999992', user_id: '11111111-1111-1111-1111-111111111111', reaction_type: 'like' }
  ],
  comments: [
    {
      id: '88888888-8888-8888-8888-888888888881',
      post_id: '99999999-9999-9999-9999-999999999991',
      author_id: '22222222-2222-2222-2222-222222222222',
      parent_comment_id: null,
      content: "Félicitations Aminata ! L'utilisation de LoRaWAN avec le mode Low-Data d'AfriBook est exactement ce dont nos régions ont besoin.",
      created_at: new Date(Date.now() - 3600000 * 2)
    }
  ],
  messages: [
    {
      id: '77777777-7777-7777-7777-777777777771',
      sender_id: '22222222-2222-2222-2222-222222222222',
      recipient_id: '11111111-1111-1111-1111-111111111111',
      body: "Bonjour Aminata, j'ai vu ta publication sur SunuBio. On aimerait intégrer vos alertes dans notre dashboard coopérative.",
      created_at: new Date(Date.now() - 3600000 * 4),
      read_at: new Date(Date.now() - 3600000 * 3)
    },
    {
      id: '77777777-7777-7777-7777-777777777772',
      sender_id: '11111111-1111-1111-1111-111111111111',
      recipient_id: '22222222-2222-2222-2222-222222222222',
      body: 'Salut Koffi ! Avec plaisir. Notre API REST légère est prête et déjà connectée à AfriBook.',
      created_at: new Date(Date.now() - 3600000 * 2),
      read_at: new Date(Date.now() - 3600000 * 1)
    }
  ],
  refreshTokens: [],
  friendships: [
    { requester_id: '11111111-1111-1111-1111-111111111111', addressee_id: '22222222-2222-2222-2222-222222222222', status: 'accepted' },
    { requester_id: '11111111-1111-1111-1111-111111111111', addressee_id: '33333333-3333-3333-3333-333333333333', status: 'accepted' }
  ],
  notifications: [
    {
      id: '66666666-6666-6666-6666-666666666661',
      user_id: '11111111-1111-1111-1111-111111111111',
      actor_id: '22222222-2222-2222-2222-222222222222',
      type: 'post_reaction',
      entity_type: 'post',
      entity_id: '99999999-9999-9999-9999-999999999991',
      is_read: false,
      created_at: new Date(Date.now() - 3600000)
    }
  ]
};

async function checkDatabaseConnection() {
  if (!pool) return false;
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    isPostgresConnected = true;
    console.log('✅ Connexion PostgreSQL établie avec succès.');
    return true;
  } catch (err) {
    isPostgresConnected = false;
    console.log('ℹ️ Mode Résilience activé : PostgreSQL non détecté localement.');
    console.log('   Le serveur démarre avec le stockage mémoire intégré (zéro blocage).');
    return false;
  }
}

module.exports = {
  pool,
  memoryStore,
  checkDatabaseConnection,
  getIsPostgresConnected: () => isPostgresConnected
};

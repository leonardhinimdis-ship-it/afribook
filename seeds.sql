-- ============================================================================
-- AFRIBOOK - DONNÉES INITIALES DE DÉMONSTRATION (SEEDS)
-- ============================================================================

-- Nettoyage optionnel (à exécuter si réinitialisation)
-- TRUNCATE notifications, messages, comments, post_reactions, posts, group_members, groups, friendships, refresh_tokens, users CASCADE;

-- 1. UTILISATEURS DE DÉMONSTRATION
-- Mots de passe par défaut : "Afribook2026!"
-- Hash bcrypt généré pour 'Afribook2026!'
INSERT INTO users (id, full_name, username, email, phone, password_hash, email_verified, phone_verified, avatar_url, cover_url, bio, city, country, preferred_language, low_data_mode, is_verified)
VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'Alexandre DJOMO',
    'alexandredjomo',
    'alexandre@afribook.africa',
    '+237699001122',
    '$2a$12$KkQ1y4z5e6O9FpL1y4z5eeF6t8W0j3r5L7o9p1Q3y5e7O9FpL1y4z',
    TRUE,
    TRUE,
    'images/avatar-jeanpierre.jpg',
    'images/post-yaounde.jpg',
    'Leader d''opinion & entrepreneur technologique panafricain. Ensemble pour une Afrique connectée ! 🇨🇲🌍',
    'Yaoundé',
    'Cameroun',
    'fr',
    FALSE,
    TRUE
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'Aminata Diallo',
    'aminata_d',
    'aminata@afribook.africa',
    '+221770001122',
    '$2a$12$KkQ1y4z5e6O9FpL1y4z5eeF6t8W0j3r5L7o9p1Q3y5e7O9FpL1y4z',
    TRUE,
    TRUE,
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    'Passionnée d''AgriTech et de solutions durables pour les producteurs locaux au Sahel 🌱. Fondatrice de SunuBio.',
    'Dakar',
    'Sénégal',
    'fr',
    FALSE,
    TRUE
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Koffi Mensah',
    'koffi_code',
    'koffi@afribook.africa',
    '+225070022334',
    '$2a$12$KkQ1y4z5e6O9FpL1y4z5eeF6t8W0j3r5L7o9p1Q3y5e7O9FpL1y4z',
    TRUE,
    TRUE,
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'Ingénieur Logiciel & FinTech | Spécialiste architectures résilientes et paiement mobile (Wave, Orange Money) ⚡',
    'Abidjan',
    'Côte d''Ivoire',
    'fr',
    TRUE,
    TRUE
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Fatou Traoré',
    'fatou_ux',
    'fatou@afribook.africa',
    '+22366003344',
    '$2a$12$KkQ1y4z5e6O9FpL1y4z5eeF6t8W0j3r5L7o9p1Q3y5e7O9FpL1y4z',
    TRUE,
    FALSE,
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    'Designer Produit & UI/UX axée sur l''accessibilité numérique et les interfaces légères pour les réseaux 2G/3G 📱',
    'Bamako',
    'Mali',
    'fr',
    TRUE,
    FALSE
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'Samuel Kamga',
    'samuel_k',
    'samuel@afribook.africa',
    '+23769004455',
    '$2a$12$KkQ1y4z5e6O9FpL1y4z5eeF6t8W0j3r5L7o9p1Q3y5e7O9FpL1y4z',
    TRUE,
    TRUE,
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'E-commerce & Logistique urbaine en Afrique Centrale. Partage quotidien sur les opportunités de business B2B 🚀',
    'Douala',
    'Cameroun',
    'fr',
    FALSE,
    TRUE
  )
ON CONFLICT (id) DO NOTHING;

-- 2. RELATIONS D'AMITIÉ
INSERT INTO friendships (requester_id, addressee_id, status)
VALUES
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'accepted'),
  ('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'accepted'),
  ('22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444', 'accepted'),
  ('33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', 'pending')
ON CONFLICT DO NOTHING;

-- 3. GROUPES COMMUNAUTAIRES
INSERT INTO groups (id, owner_id, name, slug, description, cover_url, category, city, country, privacy)
VALUES
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '22222222-2222-2222-2222-222222222222',
    'Tech & Développeurs Afrique de l''Ouest',
    'tech-dev-afrique-ouest',
    'Communauté d''échange technique, entraide sur Node.js, Flutter, React, Cloud et architectures adaptées aux réalités du continent.',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    'Tech & Innovation',
    'Abidjan',
    'Côte d''Ivoire',
    'public'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '11111111-1111-1111-1111-111111111111',
    'AgriTech & Éco-Entrepreneurs Sahel',
    'agritech-eco-sahel',
    'Partage des bonnes pratiques, technologies d''irrigation solaire, traçabilité des récoltes et circuits courts de distribution.',
    'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80',
    'Agriculture & Écologie',
    'Dakar',
    'Sénégal',
    'public'
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    '44444444-4444-4444-4444-444444444444',
    'E-commerce & Logistique Dernier Kilomètre',
    'ecommerce-logistique-afrique',
    'Réseau d''entraide pour commerçants, livreurs et créateurs de marques locales en Afrique francophone.',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    'Business & Commerce',
    'Douala',
    'Cameroun',
    'public'
  )
ON CONFLICT (id) DO NOTHING;

-- Membres des groupes
INSERT INTO group_members (group_id, user_id, role)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'admin'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'member'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'member'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'admin'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', 'member'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '44444444-4444-4444-4444-444444444444', 'admin')
ON CONFLICT DO NOTHING;

-- 4. PUBLICATIONS DU FIL D'ACTUALITÉ
INSERT INTO posts (id, author_id, group_id, content, media_url, media_low_data_url, media_type, visibility)
VALUES
  (
    '99999999-9999-9999-9999-999999999991',
    '11111111-1111-1111-1111-111111111111',
    NULL,
    'Fiers d''annoncer le déploiement de nos capteurs solaires connectés dans 12 fermes maraîchères de la région de Thiès ! 🌾 Grâce au protocole LoRaWAN et à l''interface AfriBook optimisée en basse bande passante, les producteurs reçoivent les alertes directement sur leur téléphone sans consommer de forfait inutilement. L''innovation africaine par et pour l''Afrique ! 🌍✨',
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=300&q=30',
    'image',
    'public'
  ),
  (
    '99999999-9999-9999-9999-999999999992',
    '22222222-2222-2222-2222-222222222222',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Question pour les devs backend : qui a déjà mis en place des webhooks résilients avec idempotence pour les API Wave et MTN MoMo ? Face aux micro-coupures réseau, quel système de retry préférez-vous entre Redis BullMQ et un simple schéma PostgreSQL transactional outbox ? Parlons architecture concrète ! 💻⚡',
    NULL,
    NULL,
    NULL,
    'public'
  ),
  (
    '99999999-9999-9999-9999-999999999993',
    '33333333-3333-3333-3333-333333333333',
    NULL,
    'Petit sondage pour la communauté AfriBook : lorsque vous naviguez sur mobile avec un forfait data restreint (ex: Pass 200 Mo), préférez-vous que les vidéos ne se chargent qu''au clic ou qu''une miniature ultra-légère s''affiche en premier ? Je finalise une étude UX pour notre prochain design system ! 🎨📱',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=300&q=30',
    'image',
    'public'
  ),
  (
    '99999999-9999-9999-9999-999999999994',
    '44444444-4444-4444-4444-444444444444',
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'À Douala, le coût de livraison du dernier kilomètre baisse enfin de 18% grâce à la mutualisation des coursiers à moto sur les axes Akwa - Bonabéri ! Le commerce local est en pleine mutation. 📦🛵',
    NULL,
    NULL,
    NULL,
    'public'
  )
ON CONFLICT (id) DO NOTHING;

-- 5. RÉACTIONS
INSERT INTO post_reactions (post_id, user_id, reaction_type)
VALUES
  ('99999999-9999-9999-9999-999999999991', '22222222-2222-2222-2222-222222222222', 'love'),
  ('99999999-9999-9999-9999-999999999991', '33333333-3333-3333-3333-333333333333', 'support'),
  ('99999999-9999-9999-9999-999999999991', '44444444-4444-4444-4444-444444444444', 'like'),
  ('99999999-9999-9999-9999-999999999992', '11111111-1111-1111-1111-111111111111', 'like'),
  ('99999999-9999-9999-9999-999999999992', '33333333-3333-3333-3333-333333333333', 'support'),
  ('99999999-9999-9999-9999-999999999993', '11111111-1111-1111-1111-111111111111', 'love')
ON CONFLICT DO NOTHING;

-- 6. COMMENTAIRES
INSERT INTO comments (id, post_id, author_id, parent_comment_id, content)
VALUES
  (
    '88888888-8888-8888-8888-888888888881',
    '99999999-9999-9999-9999-999999999991',
    '22222222-2222-2222-2222-222222222222',
    NULL,
    'Félicitations Aminata ! L''utilisation de LoRaWAN avec le mode Low-Data d''AfriBook est exactement la synergie technique dont nos régions ont besoin.'
  ),
  (
    '88888888-8888-8888-8888-888888888882',
    '99999999-9999-9999-9999-999999999991',
    '11111111-1111-1111-1111-111111111111',
    '88888888-8888-8888-8888-888888888881',
    'Merci Koffi ! On a prévu une session de démonstration à Abidjan le mois prochain lors de la caravane Tech.'
  ),
  (
    '88888888-8888-8888-8888-888888888883',
    '99999999-9999-9999-9999-999999999992',
    '44444444-4444-4444-4444-444444444444',
    NULL,
    'Le pattern Transactional Outbox dans PostgreSQL est largement plus fiable chez nous, surtout si Redis n''a pas de persistance AOF robuste !'
  )
ON CONFLICT (id) DO NOTHING;

-- 7. MESSAGES PRIVÉS
INSERT INTO messages (id, sender_id, recipient_id, body, delivered_at, read_at)
VALUES
  (
    '77777777-7777-7777-7777-777777777771',
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    'Bonjour Aminata, j''ai vu ta publication sur SunuBio. On aimerait intégrer vos flux d''alertes dans notre dashboard coopérative.',
    NOW() - INTERVAL '2 hours',
    NOW() - INTERVAL '1 hour'
  ),
  (
    '77777777-7777-7777-7777-777777777772',
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    'Salut Koffi ! Avec grand plaisir. On a ouvert une API REST légère protégée par JWT, exactement compatible avec AfriBook.',
    NOW() - INTERVAL '50 minutes',
    NOW() - INTERVAL '40 minutes'
  )
ON CONFLICT (id) DO NOTHING;

-- 8. NOTIFICATIONS
INSERT INTO notifications (id, user_id, actor_id, type, entity_type, entity_id, is_read)
VALUES
  (
    '66666666-6666-6666-6666-666666666661',
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    'post_reaction',
    'post',
    '99999999-9999-9999-9999-999999999991',
    FALSE
  ),
  (
    '66666666-6666-6666-6666-666666666662',
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    'post_comment',
    'comment',
    '88888888-8888-8888-8888-888888888881',
    FALSE
  ),
  (
    '66666666-6666-6666-6666-666666666663',
    '44444444-4444-4444-4444-444444444444',
    '33333333-3333-3333-3333-333333333333',
    'friend_request',
    'friendship',
    '33333333-3333-3333-3333-333333333333',
    FALSE
  )
ON CONFLICT (id) DO NOTHING;

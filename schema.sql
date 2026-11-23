-- ============================================================================
-- AFRIBOOK - SCHÉMA POSTGRESQL COMPLET
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Fonction utilitaire pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ----------------------------------------------------------------------------
-- 1. UTILISATEURS & PROFILS
-- ----------------------------------------------------------------------------
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(120) NOT NULL,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(30) UNIQUE,
  password_hash TEXT NOT NULL,
  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  phone_verified BOOLEAN NOT NULL DEFAULT FALSE,
  avatar_url TEXT,
  cover_url TEXT,
  bio TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  preferred_language VARCHAR(10) NOT NULL DEFAULT 'fr',
  low_data_mode BOOLEAN NOT NULL DEFAULT FALSE,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_seen_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_user_contact CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ----------------------------------------------------------------------------
-- 2. SESSIONS & REFRESH TOKENS (ROTATION + RÉVOCATION)
-- ----------------------------------------------------------------------------
CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  replaced_by_id UUID REFERENCES refresh_tokens(id),
  device_info TEXT,
  ip_address INET,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_expires ON refresh_tokens(expires_at);

-- ----------------------------------------------------------------------------
-- 3. RELATIONS / AMITIÉS / BLOCAGES
-- ----------------------------------------------------------------------------
CREATE TABLE friendships (
  requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  addressee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'accepted', 'declined', 'blocked'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (requester_id, addressee_id),
  CONSTRAINT chk_not_self_friendship CHECK (requester_id <> addressee_id),
  CONSTRAINT chk_friendship_status CHECK (status IN ('pending', 'accepted', 'declined', 'blocked'))
);

CREATE INDEX idx_friendships_addressee_status ON friendships(addressee_id, status);

CREATE TRIGGER trg_friendships_updated_at
BEFORE UPDATE ON friendships
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ----------------------------------------------------------------------------
-- 4. GROUPES COMMUNAUTAIRES
-- ----------------------------------------------------------------------------
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(140) NOT NULL,
  slug VARCHAR(160) NOT NULL UNIQUE,
  description TEXT,
  cover_url TEXT,
  category VARCHAR(80), -- ex: 'Business', 'Tech', 'Éducation', 'Quartier'
  city VARCHAR(100),
  country VARCHAR(100),
  privacy VARCHAR(20) NOT NULL DEFAULT 'public', -- 'public', 'private'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_group_privacy CHECK (privacy IN ('public', 'private'))
);

CREATE TABLE group_members (
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL DEFAULT 'member', -- 'admin', 'moderator', 'member'
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (group_id, user_id),
  CONSTRAINT chk_group_role CHECK (role IN ('admin', 'moderator', 'member'))
);

CREATE INDEX idx_group_members_user ON group_members(user_id);

-- ----------------------------------------------------------------------------
-- 5. PUBLICATIONS (FIL D'ACTUALITÉ & GROUPES)
-- ----------------------------------------------------------------------------
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  shared_post_id UUID REFERENCES posts(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  media_url TEXT,
  media_low_data_url TEXT, -- Version compressée pour économiser la data
  media_type VARCHAR(20), -- 'image', 'video', 'audio', NULL
  visibility VARCHAR(20) NOT NULL DEFAULT 'public', -- 'public', 'friends', 'private'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_post_media_type CHECK (media_type IS NULL OR media_type IN ('image', 'video', 'audio')),
  CONSTRAINT chk_post_visibility CHECK (visibility IN ('public', 'friends', 'private'))
);

CREATE INDEX idx_posts_feed_created ON posts(created_at DESC);
CREATE INDEX idx_posts_author_created ON posts(author_id, created_at DESC);
CREATE INDEX idx_posts_group_created ON posts(group_id, created_at DESC) WHERE group_id IS NOT NULL;

CREATE TRIGGER trg_posts_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ----------------------------------------------------------------------------
-- 6. RÉACTIONS AUX PUBLICATIONS
-- ----------------------------------------------------------------------------
CREATE TABLE post_reactions (
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reaction_type VARCHAR(20) NOT NULL DEFAULT 'like', -- 'like', 'love', 'support', 'haha', 'wow', 'sad'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (post_id, user_id),
  CONSTRAINT chk_reaction_type CHECK (reaction_type IN ('like', 'love', 'support', 'haha', 'wow', 'sad'))
);

CREATE INDEX idx_post_reactions_post ON post_reactions(post_id);

-- ----------------------------------------------------------------------------
-- 7. COMMENTAIRES & RÉPONSES
-- ----------------------------------------------------------------------------
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_comments_post_created ON comments(post_id, created_at ASC);
CREATE INDEX idx_comments_parent ON comments(parent_comment_id) WHERE parent_comment_id IS NOT NULL;

CREATE TRIGGER trg_comments_updated_at
BEFORE UPDATE ON comments
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ----------------------------------------------------------------------------
-- 8. MESSAGERIE PRIVÉE (CHAT TEMPS RÉEL)
-- ----------------------------------------------------------------------------
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  attachment_url TEXT,
  delivered_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_not_self_message CHECK (sender_id <> recipient_id)
);

CREATE INDEX idx_messages_pair_created ON messages(
  LEAST(sender_id, recipient_id),
  GREATEST(sender_id, recipient_id),
  created_at DESC
);
CREATE INDEX idx_messages_unread_recipient ON messages(recipient_id, read_at) WHERE read_at IS NULL;

-- ----------------------------------------------------------------------------
-- 9. NOTIFICATIONS
-- ----------------------------------------------------------------------------
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  type VARCHAR(40) NOT NULL, -- 'friend_request', 'friend_accepted', 'post_reaction', 'post_comment', 'new_message'
  entity_type VARCHAR(40), -- 'post', 'comment', 'friendship', 'message'
  entity_id UUID,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at DESC);
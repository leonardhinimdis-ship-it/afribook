const { memoryStore } = require('../config/db');

exports.listStories = async (req, res) => {
  return res.json({ stories: memoryStore.stories || [] });
};

exports.createStory = async (req, res) => {
  const { media_url, caption, city } = req.body;
  if (!media_url && !caption) {
    return res.status(400).json({ error: 'Une image ou un texte est requis pour la story.' });
  }

  const newStory = {
    id: 'story-' + Date.now(),
    author_name: req.user ? req.user.fullName : 'Jean Pierre MANGA',
    author_avatar: 'images/avatar-jeanpierre.jpg',
    city: city || 'Yaoundé',
    media_url: media_url || 'images/post-yaounde.jpg',
    caption: caption || '',
    created_at: new Date()
  };

  memoryStore.stories.unshift(newStory);
  return res.status(201).json({ story: newStory });
};

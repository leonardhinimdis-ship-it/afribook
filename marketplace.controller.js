const { memoryStore, pool, getIsPostgresConnected } = require('../config/db');

exports.listProducts = async (req, res) => {
  const { category, city, q } = req.query;
  let items = memoryStore.marketplace || [];

  if (category) {
    items = items.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
  }
  if (city) {
    items = items.filter(p => p.city.toLowerCase().includes(city.toLowerCase()));
  }
  if (q) {
    const term = q.toLowerCase();
    items = items.filter(p => p.title.toLowerCase().includes(term) || p.city.toLowerCase().includes(term));
  }

  return res.json({ products: items });
};

exports.createProduct = async (req, res) => {
  const { title, price, currency = 'FCFA', city, category, image, whatsapp, condition } = req.body;
  if (!title || !price) {
    return res.status(400).json({ error: 'Le titre et le prix sont requis.' });
  }

  const newProduct = {
    id: 'prod-' + Date.now(),
    title: title.trim(),
    price: Number(price),
    currency,
    city: city || 'Yaoundé',
    country: 'Cameroun',
    category: category || 'Divers',
    image: image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80',
    seller_id: req.user ? req.user.id : 'anon',
    seller_name: req.user ? req.user.fullName : 'Alexandre DJOMO',
    seller_avatar: 'images/avatar-jeanpierre.jpg',
    whatsapp: whatsapp || '+237699001122',
    condition: condition || 'Bon état',
    verified: true,
    created_at: new Date()
  };

  memoryStore.marketplace.unshift(newProduct);
  return res.status(201).json({ product: newProduct });
};

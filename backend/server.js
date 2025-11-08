const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// In-memory cart store (simple mock persistence)
let cart = [];

// Fetch products from Fake Store API (cached briefly in memory)
let cachedProducts = null;
let cacheAt = 0;
async function getProducts() {
  const now = Date.now();
  if (cachedProducts && (now - cacheAt) < 1000 * 60 * 5) return cachedProducts; // 5m cache
  const res = await axios.get('https://fakestoreapi.com/products?limit=12');
  cachedProducts = res.data.map(p => ({
    id: p.id,
    name: p.title,
    price: Math.round(p.price * 100),
    image: p.image,
    description: p.description
  }));
  cacheAt = Date.now();
  return cachedProducts;
}

app.get('/api/products', async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/cart', (req, res) => {
  const total = cart.reduce((s, it) => s + it.price * it.qty, 0);
  res.json({ items: cart, total });
});

app.post('/api/cart', async (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !qty) return res.status(400).json({ error: 'Invalid payload' });
  const products = await getProducts();
  const prod = products.find(p => String(p.id) === String(productId));
  if (!prod) return res.status(404).json({ error: 'Product not found' });
  const existing = cart.find(c => String(c.id) === String(productId));
  if (existing) existing.qty += qty;
  else cart.push({ id: prod.id, name: prod.name, price: prod.price, image: prod.image, qty });
  res.json({ items: cart });
});

app.patch('/api/cart/:id', (req, res) => {
  const id = req.params.id;
  const { qty } = req.body;
  const item = cart.find(c => String(c.id) === String(id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  if (!qty || qty < 1) return res.status(400).json({ error: 'Invalid qty' });
  item.qty = qty;
  res.json({ items: cart });
});

app.delete('/api/cart/:id', (req, res) => {
  const id = req.params.id;
  cart = cart.filter(c => String(c.id) !== String(id));
  res.json({ items: cart });
});

app.post('/api/checkout', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Missing fields' });
  const total = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const receipt = { id: uuidv4(), customer: { name, email }, items: cart, total, timestamp: new Date().toISOString() };
  cart = [];
  res.json({ receipt });
});

app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import './App.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [receipt, setReceipt] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    const p = await axios.get('http://localhost:5000/api/products').then(r => r.data).catch(() => []);
    setProducts(p);
    const c = await axios.get('http://localhost:5000/api/cart').then(r => r.data).catch(() => ({ items:[], total:0 }));
    setCart(c.items); setTotal(c.total);
  }

  async function addToCart(id) {
    await axios.post('http://localhost:5000/api/cart', { productId: id, qty: 1 });
    const c = await axios.get('http://localhost:5000/api/cart').then(r => r.data);
    setCart(c.items); setTotal(c.total);
  }

  async function updateQty(id, qty) {
    await axios.patch(`http://localhost:5000/api/cart/${id}`, { qty });
    const c = await axios.get('http://localhost:5000/api/cart').then(r => r.data);
    setCart(c.items); setTotal(c.total);
  }

  async function removeItem(id) {
    await axios.delete(`http://localhost:5000/api/cart/${id}`);
    const c = await axios.get('http://localhost:5000/api/cart').then(r => r.data);
    setCart(c.items); setTotal(c.total);
  }

  async function doCheckout(data) {
    const res = await axios.post('http://localhost:5000/api/checkout', data).then(r => r.data);
    setReceipt(res.receipt);
    setCart([]); setTotal(0); setShowCheckout(false);
  }

  return (
    <div className="app-dark">
      <header className="topbar">
        <h1>Vibe Commerce </h1>
        <div className="top-actions">
          <button className="btn" onClick={() => setShowCheckout(s => !s)}>Checkout</button>
        </div>
      </header>

      <main className="main-grid">
        <ProductList products={products} onAdd={addToCart} />
        <Cart items={cart} total={total} onUpdate={updateQty} onRemove={removeItem} />
      </main>

      {showCheckout && <CheckoutForm onSubmit={doCheckout} onClose={() => setShowCheckout(false)} />}

      {receipt && (
        <div className="receipt-panel">
          <h3>Receipt</h3>
          <p>Order: {receipt.id}</p>
          <p>Name: {receipt.customer.name}</p>
          <p>Total: ₹{(receipt.total/100).toFixed(2)}</p>
          <p>Time: {new Date(receipt.timestamp).toLocaleString()}</p>
          <button onClick={() => setReceipt(null)} className="btn">Close</button>
        </div>
      )}
    </div>
  );
}

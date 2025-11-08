import React, { useState } from 'react';
import './CheckoutForm.css';

export default function CheckoutForm({ onSubmit, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function submit(e) {
    e.preventDefault();
    onSubmit({ name, email });
  }

  return (
    <div className="checkout-backdrop">
      <form className="checkout-card" onSubmit={submit}>
        <h3>Checkout</h3>
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} required />
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} required />
        <div className="actions">
          <button type="submit" className="btn">Pay (mock)</button>
          <button type="button" className="btn secondary" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

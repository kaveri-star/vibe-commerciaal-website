import React from 'react';
import './Cart.css';

export default function Cart({ items = [], total = 0, onUpdate, onRemove }) {
  return (
    <aside className="cart-panel">
      <h3>Cart</h3>
      {items.length === 0 ? <p className="muted">No items</p> : items.map(it => (
        <div className="cart-item" key={it.id}>
          <img src={it.image} alt={it.name} />
          <div className="meta">
            <div className="name">{it.name}</div>
            <div className="qty">Qty: <button onClick={() => onUpdate(it.id, Math.max(1, it.qty-1))}>-</button> <span>{it.qty}</span> <button onClick={() => onUpdate(it.id, it.qty+1)}>+</button></div>
            <div className="sub">₹{((it.price * it.qty)/100).toFixed(2)}</div>
          </div>
          <button className="remove" onClick={() => onRemove(it.id)}>Remove</button>
        </div>
      ))}
      <div className="cart-total">Total: ₹{(total/100).toFixed(2)}</div>
    </aside>
  );
}

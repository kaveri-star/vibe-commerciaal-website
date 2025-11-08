import React from 'react';
import './ProductList.css';

export default function ProductList({ products = [], onAdd }) {
  return (
    <section className="product-list">
      {products.map(p => (
        <div className="card" key={p.id}>
          <img src={p.image} alt={p.name} />
          <div className="card-body">
            <h4>{p.name}</h4>
            <p className="desc">{p.description?.slice(0,100)}</p>
            <div className="card-bottom">
              <div className="price">₹{(p.price/100).toFixed(2)}</div>
              <button className="btn" onClick={() => onAdd(p.id)}>Add</button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

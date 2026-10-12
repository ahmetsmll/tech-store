'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Star, ShoppingBag, Check, ShieldCheck, Zap, Truck, Layers } from 'lucide-react';

export default function ProductDetailModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const formattedPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
  };

  const currentPrice = product.discountPrice || product.price;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '840px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          backgroundColor: '#0c101c',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          padding: '32px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(6, 182, 212, 0.15)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="btn-icon"
          style={{ position: 'absolute', top: '18px', right: '18px', width: '36px', height: '36px', zIndex: 10 }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {/* Product Image */}
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: '#080b12',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '360px' }}
            />
            {product.discountPrice && (
              <span className="badge badge-discount" style={{ position: 'absolute', top: '16px', left: '16px' }}>
                İNDİRİMLİ ÜRÜN
              </span>
            )}
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-brand">{product.brand}</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{product.category?.name}</span>
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.25, marginBottom: '12px' }}>
              {product.name}
            </h2>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} color="#f59e0b" fill="#f59e0b" />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>{product.rating}</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>({product.reviewCount} kullanıcı değerlendirmesi)</span>
            </div>

            {/* Price */}
            <div style={{ marginBottom: '20px', padding: '12px 16px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              {product.discountPrice ? (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'Outfit, sans-serif' }}>
                    {formattedPrice(product.discountPrice)}
                  </span>
                  <span style={{ fontSize: '1rem', color: '#64748b', textDecoration: 'line-through' }}>
                    {formattedPrice(product.price)}
                  </span>
                </div>
              ) : (
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'Outfit, sans-serif' }}>
                  {formattedPrice(product.price)}
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
              {product.description}
            </p>

            {/* Specs Highlight */}
            {product.specs && (
              <div style={{
                marginBottom: '24px',
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: 'rgba(6, 182, 212, 0.06)',
                border: '1px solid rgba(6, 182, 212, 0.2)'
              }}>
                <div style={{ fontSize: '0.78rem', color: '#06b6d4', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                  Teknik Donanım Özellikleri
                </div>
                <div style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 500 }}>
                  {product.specs}
                </div>
              </div>
            )}

            {/* Add to Cart Actions */}
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '14px' }}>
              {/* Stepper */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                padding: '6px 12px'
              }}>
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '18px' }}
                >
                  -
                </button>
                <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 700, fontSize: '0.95rem' }}>{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '18px' }}
                >
                  +
                </button>
              </div>

              <button
                id="modal-add-to-cart-btn"
                onClick={handleAdd}
                className="btn-primary"
                style={{ flex: 1, padding: '12px 20px', background: added ? '#10b981' : undefined }}
              >
                {added ? <Check size={18} /> : <ShoppingBag size={18} />}
                <span>{added ? 'Sepete Eklendi!' : 'Sepete Ekle'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

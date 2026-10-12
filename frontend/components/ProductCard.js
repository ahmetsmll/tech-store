'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Star, ShoppingBag, Check, Eye } from 'lucide-react';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discountRate = product.discountPrice 
    ? Math.round(((Number(product.price) - Number(product.discountPrice)) / Number(product.price)) * 100)
    : 0;

  const formattedPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="glass-panel"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '18px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
        e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(6, 182, 212, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
      }}
    >
      {/* Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '70%',
        backgroundColor: '#0a0e17',
        overflow: 'hidden'
      }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />

        {/* Badges Overlay */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 2
        }}>
          {discountRate > 0 && (
            <span className="badge badge-discount">
              %{discountRate} İNDİRİM
            </span>
          )}
          {product.featured && (
            <span className="badge badge-glow">
              ÖNE ÇIKAN
            </span>
          )}
        </div>

        {/* Brand Tag Top Right */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 2
        }}>
          <span className="badge badge-brand">
            {product.brand}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
        {/* Rating and category */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {product.category?.name || 'Teknoloji'}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={14} color="#f59e0b" fill="#f59e0b" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>
              {product.rating || '4.8'}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              ({product.reviewCount || '24'})
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          color: '#f8fafc',
          marginBottom: '8px',
          lineHeight: 1.35,
          minHeight: '2.7em',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.name}
        </h3>

        {/* Specs highlight */}
        {product.specs && (
          <p style={{
            fontSize: '0.8rem',
            color: '#94a3b8',
            marginBottom: '16px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            ⚡ {product.specs}
          </p>
        )}

        {/* Spacer */}
        <div style={{ marginTop: 'auto' }} />

        {/* Price & Action */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '14px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <div>
            {product.discountPrice ? (
              <div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#64748b',
                  textDecoration: 'line-through'
                }}>
                  {formattedPrice(product.price)}
                </div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#38bdf8',
                  fontFamily: 'Outfit, sans-serif'
                }}>
                  {formattedPrice(product.discountPrice)}
                </div>
              </div>
            ) : (
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#f8fafc',
                fontFamily: 'Outfit, sans-serif'
              }}>
                {formattedPrice(product.price)}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-primary"
            style={{
              padding: '9px 14px',
              fontSize: '0.85rem',
              background: added ? '#10b981' : undefined
            }}
            title="Sepete Ekle"
          >
            {added ? <Check size={16} /> : <ShoppingBag size={16} />}
            <span>{added ? 'Eklendi' : 'Ekle'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

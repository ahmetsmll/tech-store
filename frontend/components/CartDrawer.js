'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, setCheckoutModalOpen, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { isAuthenticated, setAuthModalOpen } = useAuth();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setIsCartOpen(false);
      setAuthModalOpen(true);
      return;
    }
    setIsCartOpen(false);
    setCheckoutModalOpen(true);
  };

  const formattedPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end',
      animation: 'fadeInScale 0.2s ease'
    }}>
      {/* Backdrop click */}
      <div
        style={{ flex: 1 }}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className="animate-slide-in"
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#0a0e17',
          borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="#06b6d4" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>
              Alışveriş Sepeti
            </h2>
            <span className="badge badge-glow" style={{ fontSize: '0.75rem' }}>
              {cartItems.length} ürün
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="btn-icon"
            style={{ width: '36px', height: '36px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Items List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {cartItems.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              color: '#64748b'
            }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <ShoppingBag size={32} color="#475569" />
              </div>
              <h3 style={{ color: '#94a3b8', marginBottom: '8px', fontSize: '1.1rem' }}>Sepetiniz Boş</h3>
              <p style={{ fontSize: '0.85rem', maxWidth: '240px', lineHeight: 1.5 }}>
                En yeni teknoloji donanımlarını keşfedip sepetinize ekleyebilirsiniz.
              </p>
            </div>
          ) : (
            cartItems.map((item) => {
              const currentPrice = item.product.discountPrice || item.product.price;
              return (
                <div
                  key={item.product.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      backgroundColor: '#111827'
                    }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: '#f8fafc',
                        lineHeight: 1.3,
                        marginBottom: '4px',
                        maxWidth: '200px'
                      }}>
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#64748b',
                          cursor: 'pointer',
                          padding: '2px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#f43f5e'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 700, marginBottom: 'auto' }}>
                      {formattedPrice(currentPrice)}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        padding: '2px 6px'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>
                        {formattedPrice(Number(currentPrice) * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(13, 18, 31, 0.95)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: '#94a3b8' }}>
              <span>Ara Toplam</span>
              <span style={{ color: '#f8fafc', fontWeight: 600 }}>{formattedPrice(cartTotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '0.9rem', color: '#94a3b8' }}>
              <span>Kargo</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>Ücretsiz</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
              fontSize: '1.2rem',
              fontWeight: 800,
              color: '#f8fafc',
              borderTop: '1px dashed rgba(255, 255, 255, 0.1)',
              paddingTop: '12px'
            }}>
              <span>Genel Toplam</span>
              <span style={{ color: '#38bdf8' }}>{formattedPrice(cartTotal)}</span>
            </div>

            <button
              id="cart-checkout-btn"
              onClick={handleCheckout}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
            >
              <span>{isAuthenticated ? 'Siparişi Tamamla' : 'Giriş Yap ve Devam Et'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

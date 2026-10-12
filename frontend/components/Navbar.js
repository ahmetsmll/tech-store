'use client';

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, User, LogOut, Package, Search, Cpu, Sparkles } from 'lucide-react';

export default function Navbar({ searchTerm, setSearchTerm, onOpenOrders, onOpenAdmin }) {
  const { user, isAuthenticated, logout, setAuthModalOpen } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(7, 9, 14, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      transition: 'all 0.25s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px',
        gap: '24px'
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
          }}>
            <Cpu size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(90deg, #ffffff, #cbd5e1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Outfit, sans-serif'
              }}>
                TECH<span style={{ color: '#06b6d4', WebkitTextFillColor: '#06b6d4' }}>VAULT</span>
              </span>
              <span className="badge badge-glow" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                PRO
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500, letterSpacing: '0.05em' }}>
              NEXT-GEN HARDWARE
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ flex: 1, maxWidth: '480px', position: 'relative' }}>
          <Search size={18} color="#64748b" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            id="product-search-input"
            type="text"
            placeholder="Ürün, marka veya model ara (örn: M3 Max, RTX 4080)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-tech"
            style={{ paddingLeft: '44px' }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* User Actions & Cart */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {user?.role === 'ROLE_ADMIN' && (
                <button
                  id="admin-panel-button"
                  onClick={onOpenAdmin}
                  className="btn-secondary"
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.85rem',
                    borderColor: 'rgba(168, 85, 247, 0.4)',
                    backgroundColor: 'rgba(168, 85, 247, 0.12)',
                    color: '#c084fc'
                  }}
                  title="Yönetici Paneli"
                >
                  <Sparkles size={16} color="#c084fc" />
                  <span>Admin Paneli</span>
                </button>
              )}

              <button
                id="orders-button"
                onClick={onOpenOrders}
                className="btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                title="Siparişlerim"
              >
                <Package size={16} color="#06b6d4" />
                <span>Siparişlerim</span>
              </button>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}>
                  {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                </div>
                <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
                    {user.fullName}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                    {user.role === 'ROLE_ADMIN' ? 'Yönetici' : 'Üye'}
                  </div>
                </div>
              </div>

              <button
                id="logout-button"
                onClick={logout}
                className="btn-icon"
                title="Çıkış Yap"
                style={{ width: '38px', height: '38px' }}
              >
                <LogOut size={16} color="#f43f5e" />
              </button>
            </div>
          ) : (
            <button
              id="login-button"
              onClick={() => setAuthModalOpen(true)}
              className="btn-secondary"
              style={{ padding: '8px 16px' }}
            >
              <User size={16} color="#06b6d4" />
              <span>Giriş Yap / Kaydol</span>
            </button>
          )}

          {/* Cart Trigger */}
          <button
            id="cart-button"
            onClick={() => setIsCartOpen(true)}
            className="btn-primary"
            style={{ position: 'relative', padding: '9px 18px' }}
          >
            <ShoppingBag size={18} />
            <span style={{ fontWeight: 600 }}>Sepet</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                backgroundColor: '#f43f5e',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 800,
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(244, 63, 94, 0.6)'
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Package, Calendar, Clock, ShoppingCart, CheckCircle, AlertCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api';

export default function OrdersModal({ isOpen, onClose }) {
  const { token, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && isAuthenticated && token) {
      fetchOrders();
    }
  }, [isOpen, isAuthenticated, token]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/orders/my-orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (e) {
      console.error('Siparişler yüklenemedi:', e);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const formattedPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DELIVERED':
        return <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>Teslim Edildi</span>;
      case 'SHIPPED':
        return <span className="badge" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>Kargoya Verildi</span>;
      case 'PROCESSING':
      default:
        return <span className="badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' }}>Hazırlanıyor</span>;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          backgroundColor: '#0c101c',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          padding: '28px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Package size={22} color="#06b6d4" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f8fafc' }}>
              Sipariş Geçmişim
            </h2>
          </div>
          <button
            onClick={onClose}
            className="btn-icon"
            style={{ width: '34px', height: '34px' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Orders list */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
              Siparişler yükleniyor...
            </div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>
              <Package size={40} color="#475569" style={{ margin: '0 auto 12px auto' }} />
              <p style={{ fontSize: '1rem', color: '#94a3b8' }}>Henüz bir siparişiniz bulunmuyor.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '16px',
                  padding: '18px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.95rem' }}>
                      Sipariş #TK-{order.id}
                    </span>
                    {getStatusBadge(order.status)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Bugün'}
                  </div>
                </div>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                  {order.items && order.items.map((it) => (
                    <div key={it.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#06b6d4', fontWeight: 600 }}>{it.quantity}x</span>
                        <span style={{ color: '#e2e8f0' }}>{it.product?.name || 'Teknoloji Ürünü'}</span>
                      </div>
                      <span style={{ color: '#94a3b8' }}>{formattedPrice(it.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '10px',
                  borderTop: '1px dashed rgba(255, 255, 255, 0.08)',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ color: '#94a3b8' }}>Toplam Tutar:</span>
                  <span style={{ color: '#38bdf8', fontWeight: 800 }}>{formattedPrice(order.totalAmount)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

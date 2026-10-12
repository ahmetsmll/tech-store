'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { X, CreditCard, MapPin, CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api';

export default function CheckoutModal({ onOrderCompleted }) {
  const { cartItems, checkoutModalOpen, setCheckoutModalOpen, cartTotal, clearCart } = useCart();
  const { token, user } = useAuth();

  const [address, setAddress] = useState('Barbaros Bulvarı No: 42 Daire: 8, Beşiktaş / İstanbul');
  const [city, setCity] = useState('İstanbul');
  const [cardNumber, setCardNumber] = useState('4543 •••• •••• 9284');
  const [cardHolder, setCardHolder] = useState(user?.fullName || 'Ahmet Yılmaz');
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');

  const [loading, setLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const [error, setError] = useState(null);

  if (!checkoutModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const orderPayload = {
      items: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      shippingAddress: `${address}, ${city}`,
      paymentMethod: paymentMethod,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Sipariş oluşturulamadı.');
      }

      const createdOrder = await res.json();
      setSuccessOrder(createdOrder);
      clearCart();
      if (onOrderCompleted) onOrderCompleted();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formattedPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="modal-overlay" onClick={() => !loading && setCheckoutModalOpen(false)}>
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '32px',
          position: 'relative',
          backgroundColor: '#0c101c',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {!successOrder && (
          <button
            onClick={() => setCheckoutModalOpen(false)}
            className="btn-icon"
            style={{ position: 'absolute', top: '18px', right: '18px', width: '34px', height: '34px' }}
          >
            <X size={16} />
          </button>
        )}

        {successOrder ? (
          /* Order Success State */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)'
            }}>
              <CheckCircle2 size={40} color="#10b981" />
            </div>

            <span className="badge badge-glow" style={{ marginBottom: '12px' }}>
              SİPARİŞ ONAYLANDI
            </span>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
              Teşekkürler, Siparişiniz Alındı!
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '380px', margin: '0 auto 24px auto', lineHeight: 1.5 }}>
              Siparişiniz başarıyla sistemimize kaydedildi. Kargo takip kodunuz e-posta adresinize iletilecektir.
            </p>

            {/* Order details summary */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '18px',
              textAlign: 'left',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: '#64748b' }}>Sipariş No:</span>
                <span style={{ color: '#38bdf8', fontWeight: 700 }}>#TK-{successOrder.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: '#64748b' }}>Ödeme Yöntemi:</span>
                <span style={{ color: '#f8fafc' }}>Kredi Kartı (Güvenli 3D Secure)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 700, borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '10px' }}>
                <span style={{ color: '#f8fafc' }}>Ödenen Tutar:</span>
                <span style={{ color: '#10b981' }}>{formattedPrice(successOrder.totalAmount)}</span>
              </div>
            </div>

            <button
              id="close-success-order-btn"
              onClick={() => {
                setSuccessOrder(null);
                setCheckoutModalOpen(false);
              }}
              className="btn-primary"
              style={{ padding: '12px 28px', fontSize: '0.95rem' }}
            >
              Alışverişe Devam Et
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <ShieldCheck size={18} color="#10b981" />
                <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>
                  256-Bit SSL Güvenli Ödeme
                </span>
              </div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#f8fafc' }}>
                Siparişi Tamamla
              </h2>
            </div>

            {error && (
              <div style={{
                padding: '10px 14px',
                backgroundColor: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                borderRadius: '10px',
                color: '#fb7185',
                fontSize: '0.85rem',
                marginBottom: '16px'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Teslimat Adresi */}
              <div>
                <label style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="#06b6d4" />
                  <span>Teslimat Adresi</span>
                </label>
                <textarea
                  id="checkout-address"
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-tech"
                  style={{ resize: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
                    Şehir
                  </label>
                  <input
                    id="checkout-city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input-tech"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
                    Posta Kodu
                  </label>
                  <input
                    type="text"
                    defaultValue="34353"
                    className="input-tech"
                  />
                </div>
              </div>

              {/* Kart Bilgileri */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '14px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 600 }}>
                  <CreditCard size={16} />
                  <span>Ödeme Bilgileri (Demo Simülasyonu)</span>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', display: 'block' }}>
                    Kart Üzerindeki İsim
                  </label>
                  <input
                    id="checkout-cardholder"
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="input-tech"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', display: 'block' }}>
                    Kart Numarası
                  </label>
                  <input
                    id="checkout-cardnumber"
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="input-tech"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', display: 'block' }}>
                      Son Kullanma
                    </label>
                    <input
                      type="text"
                      defaultValue="12/28"
                      className="input-tech"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', display: 'block' }}>
                      CVC
                    </label>
                    <input
                      type="text"
                      defaultValue="492"
                      className="input-tech"
                    />
                  </div>
                </div>
              </div>

              {/* Tutar & Onay Butonu */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '10px'
              }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Ödenecek Tutar</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'Outfit, sans-serif' }}>
                    {formattedPrice(cartTotal)}
                  </div>
                </div>

                <button
                  id="confirm-order-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ padding: '12px 24px', fontSize: '0.95rem' }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>İşleniyor...</span>
                    </>
                  ) : (
                    <>
                      <span>Ödemeyi Tamamla</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, ShieldCheck, Package, ShoppingCart, PlusCircle, CheckCircle, TrendingUp, Layers } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api';

export default function AdminModal({ isOpen, onClose, onProductCreated }) {
  const { token, user } = useAuth();
  const [tab, setTab] = useState('orders'); // 'orders' | 'addProduct'
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // New product form state
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [brand, setBrand] = useState('Apple');
  const [categorySlug, setCategorySlug] = useState('laptops');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80');
  const [specs, setSpecs] = useState('16GB RAM, 512GB SSD, Ultra HD');
  const [description, setDescription] = useState('');
  const [savingProduct, setSavingProduct] = useState(false);
  const [productSuccess, setProductSuccess] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isOpen) {
      loadAllOrders();
      loadCategories();
    }
  }, [isOpen]);

  const loadCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadAllOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch(`${API_BASE_URL}/orders/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setSavingProduct(true);
    setProductSuccess(false);

    const selectedCat = categories.find(c => c.slug === categorySlug) || {
      id: 1,
      name: 'Dizüstü Bilgisayar',
      slug: 'laptops'
    };

    const autoSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const productPayload = {
      name,
      slug: autoSlug,
      brand,
      price: parseFloat(price),
      discountPrice: discountPrice ? parseFloat(discountPrice) : null,
      stock: parseInt(stock, 10),
      imageUrl,
      specs,
      description,
      featured: true,
      category: selectedCat
    };

    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productPayload)
      });

      if (res.ok) {
        setProductSuccess(true);
        setName('');
        setSlug('');
        setPrice('');
        setDiscountPrice('');
        setDescription('');
        if (onProductCreated) onProductCreated();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingProduct(false);
    }
  };

  if (!isOpen) return null;

  const totalRevenue = orders.reduce((sum, ord) => sum + Number(ord.totalAmount || 0), 0);

  const formattedPrice = (p) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(p);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          backgroundColor: '#0b0f1a',
          border: '1px solid rgba(168, 85, 247, 0.4)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(168, 85, 247, 0.2)',
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
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #a855f7, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={20} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>
                Yönetici Kontrol Paneli
              </h2>
              <div style={{ fontSize: '0.75rem', color: '#a855f7', fontWeight: 600 }}>
                ROLE_ADMIN YETKİSİ
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-icon"
            style={{ width: '34px', height: '34px' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            padding: '14px'
          }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShoppingCart size={14} color="#06b6d4" />
              <span>Toplam Sipariş</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginTop: '4px' }}>
              {orders.length}
            </div>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            padding: '14px'
          }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={14} color="#10b981" />
              <span>Toplam Ciro</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
              {formattedPrice(totalRevenue)}
            </div>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            padding: '14px'
          }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={14} color="#a855f7" />
              <span>Sistem Durumu</span>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', marginTop: '6px' }}>
              Canlı (Aktif)
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div style={{
          display: 'flex',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '10px',
          padding: '4px',
          marginBottom: '18px'
        }}>
          <button
            type="button"
            onClick={() => setTab('orders')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              backgroundColor: tab === 'orders' ? 'rgba(168, 85, 247, 0.25)' : 'transparent',
              color: tab === 'orders' ? '#c084fc' : '#94a3b8'
            }}
          >
            Tüm Mağaza Siparişleri ({orders.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('addProduct')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              backgroundColor: tab === 'addProduct' ? 'rgba(6, 182, 212, 0.25)' : 'transparent',
              color: tab === 'addProduct' ? '#38bdf8' : '#94a3b8'
            }}
          >
            + Yeni Ürün Ekle
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {tab === 'orders' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {loadingOrders ? (
                <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                  Siparişler yükleniyor...
                </div>
              ) : orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                  Henüz verilmiş bir sipariş bulunmamaktadır.
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '12px',
                      padding: '14px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div>
                        <span style={{ fontWeight: 700, color: '#f8fafc', marginRight: '8px' }}>#TK-{ord.id}</span>
                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{ord.user?.fullName} ({ord.user?.email})</span>
                      </div>
                      <span className="badge badge-glow" style={{ fontSize: '0.72rem' }}>{ord.status}</span>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                      📍 {ord.shippingAddress}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px dashed rgba(255, 255, 255, 0.06)' }}>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        {ord.items?.length || 0} Kalem Ürün
                      </span>
                      <span style={{ fontWeight: 800, color: '#10b981' }}>{formattedPrice(ord.totalAmount)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Add Product Form */
            <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {productSuccess && (
                <div style={{
                  padding: '10px 14px',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '10px',
                  color: '#34d399',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.85rem'
                }}>
                  <CheckCircle size={16} />
                  <span>Ürün başarıyla eklendi ve kataloğa yansıtıldı!</span>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px', display: 'block' }}>Ürün Adı</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Örn: Razer Blade 18 Gaming Laptop"
                    className="input-tech"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px', display: 'block' }}>Marka</label>
                  <input
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Apple, ASUS, Razer..."
                    className="input-tech"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px', display: 'block' }}>Fiyat (₺)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="49999"
                    className="input-tech"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px', display: 'block' }}>İndirimli Fiyat (Opsiyonel)</label>
                  <input
                    type="number"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    placeholder="44999"
                    className="input-tech"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px', display: 'block' }}>Stok Adedi</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="input-tech"
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px', display: 'block' }}>Kategori</label>
                <select
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  className="input-tech"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="laptops">💻 Dizüstü Bilgisayar</option>
                  <option value="smartphones">📱 Akıllı Telefon</option>
                  <option value="audio">🎧 Kulaklık & Ses</option>
                  <option value="smartwatches">⌚ Akıllı Saat & Bileklik</option>
                  <option value="gaming">🎮 Oyuncu Ekipmanları</option>
                  <option value="monitors">🖥️ Monitör & Görüntü</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px', display: 'block' }}>Öne Çıkan Donanım Özellikleri</label>
                <input
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                  placeholder="Intel i9, 32GB RAM, 1TB NVMe, RTX 4070"
                  className="input-tech"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px', display: 'block' }}>Görsel URL (Unsplash vb.)</label>
                <input
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="input-tech"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px', display: 'block' }}>Açıklama</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ürün hakkında detaylı bilgi..."
                  className="input-tech"
                  style={{ resize: 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={savingProduct}
                className="btn-primary"
                style={{ padding: '12px', marginTop: '6px', background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}
              >
                <PlusCircle size={18} />
                <span>{savingProduct ? 'Ekleniyor...' : 'Ürünü Kaydet ve Yayınla'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

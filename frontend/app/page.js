'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import CartDrawer from '../components/CartDrawer';
import AuthModal from '../components/AuthModal';
import CheckoutModal from '../components/CheckoutModal';
import OrdersModal from '../components/OrdersModal';
import AdminModal from '../components/AdminModal';
import Footer from '../components/Footer';
import { Sparkles, SlidersHorizontal, AlertCircle, RefreshCw } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api';

// Fallback initial data in case backend is booting up
const INITIAL_CATEGORIES = [
  { id: 1, name: 'Dizüstü Bilgisayar', slug: 'laptops', icon: '💻' },
  { id: 2, name: 'Akıllı Telefon', slug: 'smartphones', icon: '📱' },
  { id: 3, name: 'Kulaklık & Ses', slug: 'audio', icon: '🎧' },
  { id: 4, name: 'Akıllı Saat & Bileklik', slug: 'smartwatches', icon: '⌚' },
  { id: 5, name: 'Oyuncu Ekipmanları', slug: 'gaming', icon: '🎮' },
  { id: 6, name: 'Monitör & Görüntü', slug: 'monitors', icon: '🖥️' },
];

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Apple MacBook Pro 16" M3 Max',
    slug: 'macbook-pro-16-m3-max',
    description: '16 çekirdekli CPU, 40 çekirdekli GPU, 48 GB Birleşik Bellek ve 1 TB SSD depolama. Liquid Retina XDR ekran ile profesyonel iş akışları için rakipsiz güç.',
    price: 129999,
    discountPrice: 124999,
    brand: 'Apple',
    stock: 12,
    rating: 4.9,
    reviewCount: 84,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    specs: 'M3 Max Çip, 48GB RAM, 1TB SSD, 16.2" Liquid Retina XDR',
    category: { slug: 'laptops', name: 'Dizüstü Bilgisayar' }
  },
  {
    id: 2,
    name: 'ASUS ROG Zephyrus G16 OLED (2024)',
    slug: 'asus-rog-zephyrus-g16-oled',
    description: 'Intel Core Ultra 9 185H, NVIDIA GeForce RTX 4080, 32GB LPDDR5X RAM, 2.5K 240Hz ROG Nebula OLED ekran. İnce, hafif ve ultra güçlü oyuncu canavarı.',
    price: 114999,
    discountPrice: 109999,
    brand: 'ASUS ROG',
    stock: 8,
    rating: 4.8,
    reviewCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    specs: 'Intel Ultra 9, RTX 4080, 32GB RAM, 2TB SSD, 240Hz OLED',
    category: { slug: 'laptops', name: 'Dizüstü Bilgisayar' }
  },
  {
    id: 3,
    name: 'iPhone 16 Pro Max 256GB Çöl Titanyum',
    slug: 'iphone-16-pro-max-256gb',
    description: 'A18 Pro çip, Kamera Denetimi düğmesi, 48 MP Fusion kamera ve sınıfının lideri pil ömrü. Havacılık ve uzay sınıfı titanyum tasarım.',
    price: 84999,
    discountPrice: 81999,
    brand: 'Apple',
    stock: 25,
    rating: 4.9,
    reviewCount: 198,
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    specs: 'A18 Pro, 6.9" Super Retina XDR, Titanyum Kasa, 5x Telefoto',
    category: { slug: 'smartphones', name: 'Akıllı Telefon' }
  },
  {
    id: 4,
    name: 'Samsung Galaxy S24 Ultra 512GB',
    slug: 'samsung-galaxy-s24-ultra-512gb',
    description: 'Galaxy AI destekli Snapdragon 8 Gen 3 for Galaxy, 200 MP kamera, dahili S Pen ve titanyum çerçeve.',
    price: 74999,
    discountPrice: 69999,
    brand: 'Samsung',
    stock: 18,
    rating: 4.8,
    reviewCount: 136,
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    specs: 'Snapdragon 8 Gen 3, 200MP Kamera, Dahili S Pen, 12GB RAM',
    category: { slug: 'smartphones', name: 'Akıllı Telefon' }
  },
  {
    id: 5,
    name: 'Sony WH-1000XM5 Kablosuz ANC Kulaklık',
    slug: 'sony-wh-1000xm5-kablosuz-kulaklik',
    description: 'Sektör lideri Aktif Gürültü Engelleme (ANC), 8 mikrofonlu sistem, 30 saat pil ömrü ve LDAC yüksek çözünürlüklü ses.',
    price: 14999,
    discountPrice: 12999,
    brand: 'Sony',
    stock: 30,
    rating: 4.8,
    reviewCount: 312,
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    specs: 'HD QN1 İşlemci, 30 Saat Pil, Hızlı Şarj, Çoklu Cihaz',
    category: { slug: 'audio', name: 'Kulaklık & Ses' }
  },
  {
    id: 6,
    name: 'Apple AirPods Max Uzay Grisi',
    slug: 'apple-airpods-max-uzay-grisi',
    description: 'Özel tasarım dinamik sürücü, adaptif ekolayzır, dinamik kafa izleme özellikli uzamsal ses ve nefes alabilen file taç bandı.',
    price: 26999,
    discountPrice: null,
    brand: 'Apple',
    stock: 15,
    rating: 4.7,
    reviewCount: 174,
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80',
    featured: false,
    specs: 'Apple H1 Çip, Uzamsal Ses, Alüminyum Kulaklık Kapakları',
    category: { slug: 'audio', name: 'Kulaklık & Ses' }
  },
  {
    id: 7,
    name: 'Apple Watch Ultra 2 Titanyum 49mm',
    slug: 'apple-watch-ultra-2-titanyum-49mm',
    description: 'S9 SiP çip, 3000 nit ultra parlak ekran, hassas çift frekanslı GPS ve 36 saate kadar pil ömrü.',
    price: 42999,
    discountPrice: 39999,
    brand: 'Apple',
    stock: 10,
    rating: 4.9,
    reviewCount: 95,
    imageUrl: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    specs: '49mm Titanyum Kasa, 3000 Nit, Çift Dokunuş Hareketi',
    category: { slug: 'smartwatches', name: 'Akıllı Saat & Bileklik' }
  },
  {
    id: 8,
    name: 'Logitech G PRO X Superlight 2 Gaming Mouse',
    slug: 'logitech-g-pro-x-superlight-2',
    description: '60 gram ultra hafif tasarım, HERO 2 sensör (32.000 DPI), LIGHTFORCE hibrit optik-mekanik anahtarlar ve 95 saat pil ömrü.',
    price: 6499,
    discountPrice: 5799,
    brand: 'Logitech G',
    stock: 40,
    rating: 4.9,
    reviewCount: 280,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    specs: '60g Ağırlık, HERO 2 Sensör, 32K DPI, Lightspeed Wireless',
    category: { slug: 'gaming', name: 'Oyuncu Ekipmanları' }
  },
  {
    id: 9,
    name: 'Razer BlackWidow V4 Pro RGB Mekanik Klavye',
    slug: 'razer-blackwidow-v4-pro',
    description: 'Razer Green Mekanik Anahtarlar, Razer Komuta Kadranı, 8 özel makro tuşu ve manyetik peluş bilek desteği.',
    price: 9899,
    discountPrice: 8499,
    brand: 'Razer',
    stock: 20,
    rating: 4.7,
    reviewCount: 118,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
    featured: false,
    specs: 'Yeşil Clicky Switch, 8000Hz Polling, Komuta Kadranı',
    category: { slug: 'gaming', name: 'Oyuncu Ekipmanları' }
  },
  {
    id: 10,
    name: 'LG UltraGear 32" 4K UHD 240Hz OLED Monitör',
    slug: 'lg-ultragear-32-4k-oled-240hz',
    description: 'Dual-Hz özelliği (4K 240Hz / FHD 480Hz), 0.03ms (GtG) tepki süresi, DisplayHDR True Black 400.',
    price: 56999,
    discountPrice: 52999,
    brand: 'LG',
    stock: 6,
    rating: 4.9,
    reviewCount: 51,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    specs: '32 Inç OLED, 4K 240Hz / FHD 480Hz, 0.03ms Tepki, G-Sync',
    category: { slug: 'monitors', name: 'Monitör & Görüntü' }
  }
];

export default function HomePage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);

  // Fetch from Spring Boot backend
  const loadData = async () => {
    try {
      let url = `${API_BASE_URL}/products`;
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          setBackendConnected(true);
        }
      }
    } catch (e) {
      // Fallback filter
      let filtered = INITIAL_PRODUCTS;
      if (selectedCategory) {
        filtered = filtered.filter(p => p.category?.slug === selectedCategory);
      }
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(q) || 
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }
      setProducts(filtered);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedCategory, searchTerm]);

  // Fetch categories from backend
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCategories(data);
          }
        }
      } catch (e) {
        // Keep initial
      }
    }
    loadCategories();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenOrders={() => setOrdersOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Hero Showcase */}
      <HeroBanner
        onExploreClick={() => {
          const el = document.getElementById('products-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Products Section */}
      <main id="products-section" className="container" style={{ flex: 1, paddingTop: '40px' }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-glow" style={{ fontSize: '0.72rem' }}>
                KATALOG
              </span>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                {products.length} ürün listeleniyor
              </span>
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#f8fafc' }}>
              Teknoloji & Donanım Ürünleri
            </h2>
          </div>

          {backendConnected && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#10b981' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
              <span>Spring Boot REST API Bağlı</span>
            </div>
          )}
        </div>

        {/* Category Filter Chips */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Products Grid */}
        {products.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <p style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '12px' }}>
              Aramanızla eşleşen ürün bulunamadı.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory(null); }}
              className="btn-secondary"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '60px'
          }}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals & Drawers */}
      <CartDrawer />
      <AuthModal />
      <CheckoutModal onOrderCompleted={() => setOrdersOpen(true)} />
      <OrdersModal isOpen={ordersOpen} onClose={() => setOrdersOpen(false)} />
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onProductCreated={loadData}
      />
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

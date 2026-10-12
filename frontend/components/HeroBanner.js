'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Zap, Truck, ArrowRight } from 'lucide-react';

export default function HeroBanner({ onExploreClick }) {
  return (
    <section style={{
      position: 'relative',
      padding: '48px 0 32px 0',
      overflow: 'hidden'
    }}>
      <div className="container">
        {/* Main Hero Card */}
        <div style={{
          position: 'relative',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(20, 26, 43, 0.9) 0%, rgba(10, 14, 26, 0.95) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.2)',
          padding: '48px 40px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          {/* Ambient Glows */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-60px',
            left: '20%',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '680px'
          }}>
            {/* Top Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span className="badge badge-glow" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                <Sparkles size={14} />
                2026 DONANIM SEZONU BAŞLADI
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Sınırlı Stok & Özel Lansman İndirimleri
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: '2.8rem',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '18px',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #ffffff 30%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Geleceğin Teknolojisine <br />
              <span style={{
                background: 'linear-gradient(90deg, #06b6d4, #6366f1, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Bugün Sahip Olun.
              </span>
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '28px'
            }}>
              En yeni M3 Max çipli MacBook Pro, RTX 4080 serisi canavarlar, OLED 240Hz monitörler ve 
              stüdyo kalitesinde ses ekipmanları tek bir çatıda.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                id="hero-explore-btn"
                onClick={onExploreClick}
                className="btn-primary"
                style={{ padding: '14px 28px', fontSize: '1rem' }}
              >
                <span>Ürünleri İncele</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('featured-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary"
                style={{ padding: '14px 24px', fontSize: '1rem' }}
              >
                <span>Öne Çıkanlar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          marginTop: '20px'
        }}>
          <div className="glass-panel" style={{
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(6, 182, 212, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={22} color="#06b6d4" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#f8fafc' }}>Aynı Gün Hızlı Kargo</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Saat 16:00'ya kadar verilen siparişlerde</div>
            </div>
          </div>

          <div className="glass-panel" style={{
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={22} color="#10b981" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#f8fafc' }}>%100 Orijinal Ürün</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>2 Yıl Resmi İthalatçı & Distribütör Garantisi</div>
            </div>
          </div>

          <div className="glass-panel" style={{
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(99, 102, 241, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Truck size={22} color="#818cf8" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#f8fafc' }}>Ücretsiz Kargo</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>1.000 TL ve üzeri tüm siparişlerde</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

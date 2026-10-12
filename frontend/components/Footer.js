'use client';

import React from 'react';
import { Cpu, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      marginTop: '80px',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      backgroundColor: '#05070a',
      padding: '50px 0 30px 0',
      color: '#94a3b8'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '32px',
          marginBottom: '40px'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Cpu size={18} color="#fff" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'Outfit, sans-serif' }}>
                TECH<span style={{ color: '#06b6d4' }}>VAULT</span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#64748b' }}>
              Yeni nesil teknoloji donanımları, profesyonel iş istasyonları ve oyun ekipmanları için lider e-ticaret platformu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#f8fafc', fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>Kategoriler</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <span>Dizüstü Bilgisayarlar</span>
              <span>Akıllı Telefonlar</span>
              <span>Kulaklık & Ses Sistemleri</span>
              <span>Akıllı Saatler</span>
              <span>Oyuncu Ekipmanları</span>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 style={{ color: '#f8fafc', fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>Mimari & Altyapı</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <span style={{ color: '#38bdf8' }}>⚡ Spring Boot 3.3.4 (Java 21)</span>
              <span style={{ color: '#818cf8' }}>🔒 Spring Security & JWT</span>
              <span style={{ color: '#34d399' }}>🐘 PostgreSQL 16 Veritabanı</span>
              <span style={{ color: '#f43f5e' }}>⚛️ Next.js App Router & React 19</span>
            </div>
          </div>

          {/* Security */}
          <div>
            <h4 style={{ color: '#f8fafc', fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>Müşteri Güvencesi</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem' }}>
              <ShieldCheck size={16} color="#10b981" />
              <span>%100 Güvenli Alışveriş (3D Secure)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
              <ShieldCheck size={16} color="#06b6d4" />
              <span>Orijinal Ürün & Resmi Garanti</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.8rem',
          color: '#64748b'
        }}>
          <div>
            © 2026 TechVault Inc. Tüm hakları saklıdır.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Next.js & Java Spring Boot ile geliştirilmiştir.
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User as UserIcon, ShieldAlert, Sparkles, Check } from 'lucide-react';

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, login, register } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (tab === 'login') {
      const res = await login(email, password);
      if (!res.success) setError(res.error);
    } else {
      const res = await register(fullName, email, password);
      if (!res.success) setError(res.error);
    }
    setLoading(false);
  };

  const fillDemoUser = (userType) => {
    if (userType === 'admin') {
      setEmail('admin@techstore.com');
      setPassword('TechAdmin#2026!');
      setTab('login');
    } else {
      setEmail('user@techstore.com');
      setPassword('TechUser#2026!');
      setTab('login');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setAuthModalOpen(false)}>
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '32px',
          position: 'relative',
          backgroundColor: '#0c101c',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(6, 182, 212, 0.15)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="btn-icon"
          style={{ position: 'absolute', top: '18px', right: '18px', width: '34px', height: '34px' }}
        >
          <X size={16} />
        </button>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto'
          }}>
            <Lock size={22} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc' }}>
            {tab === 'login' ? 'Hesabınıza Giriş Yapın' : 'Yeni Hesap Oluşturun'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            {tab === 'login' 
              ? 'Siparişlerinizi ve sepetinizi yönetin' 
              : 'Özel fırsatlardan yararlanmak için katılın'}
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '10px',
          padding: '4px',
          marginBottom: '20px'
        }}>
          <button
            type="button"
            onClick={() => { setTab('login'); setError(null); }}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              backgroundColor: tab === 'login' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
              color: tab === 'login' ? '#38bdf8' : '#94a3b8',
              transition: 'all 0.2s ease'
            }}
          >
            Giriş Yap
          </button>
          <button
            type="button"
            onClick={() => { setTab('register'); setError(null); }}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              backgroundColor: tab === 'register' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
              color: tab === 'register' ? '#a5b4fc' : '#94a3b8',
              transition: 'all 0.2s ease'
            }}
          >
            Kayıt Ol
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div style={{
            padding: '10px 14px',
            backgroundColor: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: '10px',
            color: '#fb7185',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {tab === 'register' && (
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
                Ad Soyad
              </label>
              <div style={{ position: 'relative' }}>
                <UserIcon size={16} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  id="auth-fullname"
                  type="text"
                  required
                  placeholder="Ahmet Yılmaz"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-tech"
                  style={{ paddingLeft: '40px' }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
              E-posta Adresi
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                id="auth-email"
                type="email"
                required
                placeholder="ornek@techstore.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-tech"
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
              Şifre
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                id="auth-password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-tech"
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>

          <button
            id="auth-submit-btn"
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', padding: '12px', marginTop: '8px' }}
          >
            {loading ? 'İşleniyor...' : (tab === 'login' ? 'Giriş Yap' : 'Kayıt Ol')}
          </button>
        </form>

        {/* Demo Fast Login Helpers */}
        <div style={{
          marginTop: '22px',
          paddingTop: '18px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Hızlı Test Girişi (Spring Boot DataSeeder)
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => fillDemoUser('user')}
              className="btn-secondary"
              style={{ fontSize: '0.78rem', padding: '6px 12px' }}
            >
              <Sparkles size={13} color="#06b6d4" />
              <span>Demo Kullanıcı</span>
            </button>
            <button
              type="button"
              onClick={() => fillDemoUser('admin')}
              className="btn-secondary"
              style={{ fontSize: '0.78rem', padding: '6px 12px' }}
            >
              <Sparkles size={13} color="#a855f7" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

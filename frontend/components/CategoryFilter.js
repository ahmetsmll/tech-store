'use client';

import React from 'react';
import { Layers } from 'lucide-react';

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      overflowX: 'auto',
      paddingBottom: '12px',
      marginBottom: '28px',
      scrollbarWidth: 'none'
    }}>
      <button
        onClick={() => onSelectCategory(null)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 18px',
          borderRadius: '9999px',
          fontSize: '0.9rem',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          border: selectedCategory === null 
            ? '1px solid rgba(6, 182, 212, 0.5)' 
            : '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: selectedCategory === null 
            ? 'rgba(6, 182, 212, 0.15)' 
            : 'rgba(255, 255, 255, 0.03)',
          color: selectedCategory === null ? '#38bdf8' : '#94a3b8',
          boxShadow: selectedCategory === null ? '0 0 15px rgba(6, 182, 212, 0.25)' : 'none',
          transition: 'all 0.2s ease'
        }}
      >
        <Layers size={16} />
        <span>Tüm Ürünler</span>
      </button>

      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.slug;
        return (
          <button
            key={cat.id || cat.slug}
            onClick={() => onSelectCategory(cat.slug)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              border: isSelected 
                ? '1px solid rgba(99, 102, 241, 0.6)' 
                : '1px solid rgba(255, 255, 255, 0.08)',
              backgroundColor: isSelected 
                ? 'rgba(99, 102, 241, 0.18)' 
                : 'rgba(255, 255, 255, 0.03)',
              color: isSelected ? '#a5b4fc' : '#94a3b8',
              boxShadow: isSelected ? '0 0 15px rgba(99, 102, 241, 0.3)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: '1rem' }}>{cat.icon || '⚡'}</span>
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}

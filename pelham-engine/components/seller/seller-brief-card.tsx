'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SellerBriefCardProps {
  num: number;
  title: string;
  subtitle: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function SellerBriefCard({ num, title, subtitle, defaultOpen = false, children }: SellerBriefCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = `sbc-body-${num}`;

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--glass-border)',
      borderRadius: 12,
      marginBottom: 8,
      overflow: 'hidden',
      transition: 'border-color .15s',
    }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={contentId}
        style={{
          width: '100%', padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-primary)', textAlign: 'left',
          fontFamily: 'inherit',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: 'var(--accent-dim)',
            border: '1px solid rgba(0,212,255,.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: 'var(--accent)',
            flexShrink: 0,
          }}>{num}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>{subtitle}</div>
          </div>
        </div>
        <ChevronDown
          size={16}
          style={{
            color: 'var(--text-muted)', flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform .2s',
          }}
        />
      </button>

      {open && (
        <div id={contentId} style={{ padding: '0 20px 20px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ paddingTop: 16 }}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

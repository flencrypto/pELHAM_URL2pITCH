'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlusCircle, BookOpen, Settings } from 'lucide-react';

const navItems = [
  { label: 'New analysis', href: '/', icon: PlusCircle },
  { label: 'Saved analyses', href: '/saved', icon: BookOpen },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside style={{
      background: 'linear-gradient(180deg, rgba(20,23,32,0.98) 0%, rgba(13,15,20,0.98) 100%)',
      borderRight: '1px solid var(--glass-border)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 20,
    }}>
      {/* Brand */}
      <div style={{ padding: '22px 16px 18px', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{
          width: 34, height: 34,
          background: 'linear-gradient(135deg, var(--accent), var(--violet))',
          borderRadius: 9, marginBottom: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18,
        }}>⬡</div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-primary)', lineHeight: 1.3 }}>
          Pelham<br />Interiors
        </div>
        <div style={{ fontSize: 10, color: 'var(--accent)', marginTop: 3, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.7 }}>
          Prospecting Engine
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
        <div style={{ fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '14px 8px 5px', fontWeight: 700 }}>
          Navigation
        </div>
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex', alignItems: 'center', gap: 9,
                padding: '8px 10px', borderRadius: 8, cursor: 'pointer',
                color: active ? 'var(--accent)' : 'var(--text-secondary)',
                fontSize: 13, fontWeight: 500,
                textDecoration: 'none',
                background: active ? 'var(--accent-dim)' : 'transparent',
                border: `1px solid ${active ? 'rgba(0,212,255,.18)' : 'transparent'}`,
                marginBottom: 1,
                transition: 'all .15s',
              }}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '14px 16px', borderTop: '1px solid var(--glass-border)' }}>
        <p style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center', letterSpacing: '.04em' }}>
          Pelham Interiors · Internal use only
        </p>
      </div>
    </aside>
  );
}

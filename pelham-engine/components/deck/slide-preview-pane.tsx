'use client';

import { PitchSlide } from '@/lib/types';

interface SlidePreviewPaneProps {
  slide: PitchSlide;
}

export function SlidePreviewPane({ slide }: SlidePreviewPaneProps) {
  return (
    <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Slide preview */}
      <div style={{
        background: '#0d1220',
        border: '1px solid var(--glass-border)',
        borderRadius: 14,
        padding: '40px 48px',
        minHeight: 320,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 200, height: 200,
          background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12, opacity: 0.8 }}>
          {slide.eyebrow}
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 10 }}>
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.5 }}>
            {slide.subtitle}
          </p>
        )}
        {slide.bullets.length > 0 && (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {slide.bullets.map((b, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}>▸</span>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Pelham watermark */}
        <div style={{
          position: 'absolute', bottom: 14, right: 18,
          fontSize: 10, color: 'rgba(255,255,255,0.12)',
          fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase',
        }}>Pelham Interiors</div>
      </div>

      {/* Presenter notes */}
      {slide.notes && (
        <div style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: 10, padding: '14px 16px',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Presenter notes</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{slide.notes}</p>
        </div>
      )}
    </div>
  );
}

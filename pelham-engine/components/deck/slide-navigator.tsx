'use client';

import { PitchSlide } from '@/lib/types';
import { useAppStore } from '@/lib/store';

interface SlideNavigatorProps {
  slides: PitchSlide[];
}

export function SlideNavigator({ slides }: SlideNavigatorProps) {
  const { selectedSlideId, setSelectedSlideId } = useAppStore();

  return (
    <aside style={{
      width: 180, flexShrink: 0,
      borderRight: '1px solid var(--glass-border)',
      overflowY: 'auto',
      padding: '12px 8px',
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '4px 8px 10px' }}>
        Slides
      </div>
      {slides.map((slide, i) => {
        const active = slide.id === selectedSlideId;
        return (
          <button
            key={slide.id}
            onClick={() => setSelectedSlideId(slide.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              width: '100%', padding: '8px 9px',
              background: active ? 'var(--accent-dim)' : 'transparent',
              border: `1px solid ${active ? 'rgba(0,212,255,.2)' : 'transparent'}`,
              borderRadius: 7, cursor: 'pointer', textAlign: 'left',
              marginBottom: 2,
              fontFamily: 'inherit', transition: 'all .12s',
            }}
          >
            <span style={{
              width: 20, height: 20, borderRadius: 5, flexShrink: 0,
              background: active ? 'var(--accent)' : 'var(--glass-bg)',
              border: `1px solid ${active ? 'transparent' : 'var(--glass-border)'}`,
              fontSize: 10, fontWeight: 700,
              color: active ? '#000' : 'var(--text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{i + 1}</span>
            <span style={{ fontSize: 12, color: active ? 'var(--accent)' : 'var(--text-secondary)', lineHeight: 1.3 }}>
              {slide.title}
            </span>
          </button>
        );
      })}
    </aside>
  );
}

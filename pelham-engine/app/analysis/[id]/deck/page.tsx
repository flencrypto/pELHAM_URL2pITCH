'use client';

import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { DeckToolbar } from '@/components/deck/deck-toolbar';
import { SlideNavigator } from '@/components/deck/slide-navigator';
import { SlidePreviewPane } from '@/components/deck/slide-preview-pane';

export default function DeckPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { currentResult, savedAnalyses, selectedSlideId, showToast } = useAppStore();

  const result = currentResult?.id === params.id
    ? currentResult
    : savedAnalyses.find(a => a.id === params.id);

  if (!result?.pitchDeck) {
    return (
      <div style={{ padding: 40, color: 'var(--text-secondary)' }}>
        <p>Deck not available.{' '}
          <button
            style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            onClick={() => router.push(`/analysis/${params.id}`)}
          >
            ← Back to brief
          </button>
        </p>
      </div>
    );
  }

  const slides = result.pitchDeck.slides;
  const slide = slides.find(s => s.id === selectedSlideId) || slides[0];

  const slideActions = ['Regenerate this slide', 'Shorten slide', 'Make more direct', 'Make more customer-facing'] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Back nav */}
      <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(20,23,32,0.9)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={() => router.push(`/analysis/${result.id}`)}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}
        >
          ← Seller brief
        </button>
        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Pitch deck builder</div>
      </div>

      <DeckToolbar title={result.pitchDeck.title} />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <SlideNavigator slides={slides} />
        <SlidePreviewPane slide={slide} />

        {/* Controls panel */}
        <aside style={{
          width: 200, flexShrink: 0,
          borderLeft: '1px solid var(--glass-border)',
          padding: '16px 14px',
          overflowY: 'auto',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>Slide actions</div>
          {slideActions.map(action => (
            <button
              key={action}
              onClick={() => showToast(`${action} — coming in Phase 2`)}
              style={{
                display: 'block', width: '100%', padding: '8px 10px',
                background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                borderRadius: 7, color: 'var(--text-secondary)',
                fontSize: 12, cursor: 'pointer', marginBottom: 5,
                fontFamily: 'inherit', textAlign: 'left',
              }}
            >{action}</button>
          ))}

          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '18px 0 10px' }}>Export</div>
          <button
            onClick={() => showToast('HTML export — coming in Phase 2')}
            style={{
              display: 'block', width: '100%', padding: '8px 10px',
              background: 'var(--accent-dim)', border: '1px solid rgba(0,212,255,.25)',
              borderRadius: 7, color: 'var(--accent)',
              fontSize: 12, cursor: 'pointer', marginBottom: 5,
              fontFamily: 'inherit', textAlign: 'left',
            }}
          >Create HTML presentation</button>
          <button
            onClick={() => showToast('Outline exported to clipboard')}
            style={{
              display: 'block', width: '100%', padding: '8px 10px',
              background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
              borderRadius: 7, color: 'var(--text-secondary)',
              fontSize: 12, cursor: 'pointer',
              fontFamily: 'inherit', textAlign: 'left',
            }}
          >Export outline</button>
        </aside>
      </div>
    </div>
  );
}

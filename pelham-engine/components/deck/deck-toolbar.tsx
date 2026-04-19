'use client';

import { useAppStore } from '@/lib/store';
import { DeckMode, BrandMode, Tone, Density } from '@/lib/types';

interface ToggleGroupProps<T extends string> {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}

function ToggleGroup<T extends string>({ label, options, value, onChange }: ToggleGroupProps<T>) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 5 }}>{label}</div>
      <div style={{ display: 'flex', gap: 4 }}>
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              padding: '5px 10px', borderRadius: 6,
              background: value === opt.value ? 'var(--accent-dim)' : 'var(--glass-bg)',
              border: `1px solid ${value === opt.value ? 'rgba(0,212,255,.25)' : 'var(--glass-border)'}`,
              color: value === opt.value ? 'var(--accent)' : 'var(--text-secondary)',
              fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all .12s', whiteSpace: 'nowrap',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function DeckToolbar({ title }: { title: string }) {
  const { deckMode, setDeckMode, brandMode, setBrandMode, tone, setTone, density, setDensity, deckTitle, setDeckTitle } = useAppStore();

  return (
    <div style={{
      padding: '14px 24px',
      borderBottom: '1px solid var(--glass-border)',
      background: 'rgba(20,23,32,0.9)',
      display: 'flex', alignItems: 'center', gap: 20,
      flexShrink: 0, flexWrap: 'wrap',
    }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 5 }}>Deck title</div>
        <input
          value={deckTitle || title}
          onChange={e => setDeckTitle(e.target.value)}
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: 6, color: 'var(--text-primary)',
            fontSize: 13, padding: '5px 10px',
            fontFamily: 'inherit', outline: 'none', width: '100%',
          }}
        />
      </div>

      <ToggleGroup<DeckMode>
        label="Deck mode"
        options={[
          { value: 'customer_pitch', label: 'Customer pitch' },
          { value: 'internal_deck', label: 'Internal deck' },
          { value: 'quote_stage', label: 'Quote stage' },
        ]}
        value={deckMode}
        onChange={setDeckMode}
      />

      <ToggleGroup<BrandMode>
        label="Brand mode"
        options={[
          { value: 'pelham', label: 'Pelham' },
          { value: 'co_branded', label: 'Co-branded' },
        ]}
        value={brandMode}
        onChange={setBrandMode}
      />

      <ToggleGroup<Tone>
        label="Tone"
        options={[
          { value: 'executive', label: 'Executive' },
          { value: 'commercial', label: 'Commercial' },
          { value: 'direct', label: 'Direct' },
          { value: 'premium', label: 'Premium' },
        ]}
        value={tone}
        onChange={setTone}
      />

      <ToggleGroup<Density>
        label="Density"
        options={[
          { value: 'light', label: 'Light' },
          { value: 'standard', label: 'Standard' },
          { value: 'detailed', label: 'Detailed' },
        ]}
        value={density}
        onChange={setDensity}
      />
    </div>
  );
}

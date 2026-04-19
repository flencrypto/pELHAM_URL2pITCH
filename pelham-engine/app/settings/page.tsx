'use client';

import { useAppStore } from '@/lib/store';

export default function SettingsPage() {
  const { deckMode, setDeckMode, tone, setTone } = useAppStore();

  const sectionStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--glass-border)',
    borderRadius: 12, padding: '22px 24px',
    marginBottom: 16,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 11, fontWeight: 700,
    letterSpacing: '.08em', textTransform: 'uppercase',
    color: 'var(--text-muted)', marginBottom: 10,
  };

  const selectStyle: React.CSSProperties = {
    padding: '8px 12px',
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    borderRadius: 7, color: 'var(--text-primary)',
    fontSize: 13, fontFamily: 'inherit', cursor: 'pointer',
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '32px 40px', maxWidth: 600 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>Settings</h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 28 }}>Configure default behaviours for the Pelham Prospecting Engine.</p>

      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Default deck mode</div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>The mode used when converting a seller brief into a pitch deck.</p>
        <label style={labelStyle}>Deck mode</label>
        <select value={deckMode} onChange={e => setDeckMode(e.target.value as typeof deckMode)} style={selectStyle}>
          <option value="customer_pitch">Customer pitch deck</option>
          <option value="internal_deck">Internal qualification deck</option>
          <option value="quote_stage">Quotation-stage proposal</option>
        </select>
      </div>

      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Brand defaults</div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>Brand context: <strong style={{ color: 'var(--text-primary)' }}>Pelham Interiors</strong></p>
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Brand context is fixed and cannot be changed in this version.</p>
      </div>

      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Default tone</div>
        <label style={labelStyle}>Tone</label>
        <select value={tone} onChange={e => setTone(e.target.value as typeof tone)} style={selectStyle}>
          <option value="executive">Executive</option>
          <option value="commercial">Commercial</option>
          <option value="direct">Direct</option>
          <option value="premium">Premium</option>
        </select>
      </div>

      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Export options</div>
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>HTML presentation export and PDF export will be available in Phase 2.</p>
      </div>
    </div>
  );
}

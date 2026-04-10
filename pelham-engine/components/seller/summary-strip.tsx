'use client';

import { AnalysisResult } from '@/lib/types';

export function SummaryStrip({ result }: { result: AnalysisResult }) {
  const cards = [
    { label: 'Primary angle', value: result.primaryAngle },
    { label: 'Best timing trigger', value: result.triggers[0].split(' — ')[0] },
    { label: 'Likely project type', value: result.projLabel },
    { label: 'Buying motion', value: result.buyingMotion },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12,
      padding: '16px 32px',
      borderBottom: '1px solid var(--glass-border)',
      flexShrink: 0,
    }}>
      {cards.map(({ label, value }) => (
        <div key={label} style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: 10, padding: '12px 14px',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 5 }}>{label}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>{value}</div>
        </div>
      ))}
    </div>
  );
}

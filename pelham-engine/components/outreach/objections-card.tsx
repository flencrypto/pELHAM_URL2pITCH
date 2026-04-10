'use client';

interface ObjectionsCardProps {
  objections: string[];
}

export function ObjectionsCard({ objections }: ObjectionsCardProps) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--glass-border)',
      borderRadius: 12, padding: '20px 22px',
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>🛡️ Likely objections</div>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>The most likely early objections based on the current signal strength.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {objections.map((obj, i) => (
          <div key={i} style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: 8, padding: '12px 14px',
            fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6,
          }}>{obj}</div>
        ))}
      </div>
    </div>
  );
}

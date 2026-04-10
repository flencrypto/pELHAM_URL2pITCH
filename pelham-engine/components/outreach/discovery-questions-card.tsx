'use client';

interface DiscoveryQuestionsCardProps {
  questions: string[];
}

export function DiscoveryQuestionsCard({ questions }: DiscoveryQuestionsCardProps) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--glass-border)',
      borderRadius: 12, padding: '20px 22px',
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>🔍 Discovery questions</div>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>Use these to validate the trigger, scope and buying motion before building a full proposal.</p>
      <ol style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {questions.map((q, i) => (
          <li key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{q}</li>
        ))}
      </ol>
    </div>
  );
}

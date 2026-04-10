'use client';

import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { getAttractivenessColor, getConfidenceColor, capitalise } from '@/lib/scoring';

export default function SavedPage() {
  const router = useRouter();
  const { savedAnalyses, deleteAnalysis } = useAppStore();

  if (savedAnalyses.length === 0) {
    return (
      <div style={{ padding: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>📁</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>No saved analyses</h2>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>Analyses are saved automatically when you run them.</p>
        <button
          onClick={() => router.push('/')}
          style={{
            padding: '10px 20px', background: 'var(--accent)', color: '#000',
            border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >Start a new analysis</button>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '32px 40px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>Saved analyses</h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>{savedAnalyses.length} saved</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {savedAnalyses.map(analysis => (
          <div
            key={analysis.id}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: 12, padding: '18px 22px',
              display: 'flex', alignItems: 'center', gap: 16,
              cursor: 'pointer',
              transition: 'border-color .15s',
            }}
            onClick={() => router.push(`/analysis/${analysis.id}`)}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 9,
              background: 'linear-gradient(135deg, var(--accent), var(--violet))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0,
            }}>
              {analysis.companyName.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>{analysis.companyName}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{analysis.sector} · {analysis.primaryAngle}</div>
            </div>

            <div style={{ display: 'flex', gap: 6 }}>
              <span className={getAttractivenessColor(analysis.attractiveness)} style={{
                padding: '3px 9px', borderRadius: 100, fontSize: 11, fontWeight: 600, border: '1px solid',
              }}>
                {capitalise(analysis.attractiveness)}
              </span>
              <span className={getConfidenceColor(analysis.confidence)} style={{
                padding: '3px 9px', borderRadius: 100, fontSize: 11, fontWeight: 600, border: '1px solid',
              }}>
                {capitalise(analysis.confidence)}
              </span>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); deleteAnalysis(analysis.id); }}
              style={{
                background: 'none', border: 'none', color: 'var(--text-muted)',
                cursor: 'pointer', fontSize: 18, flexShrink: 0,
                fontFamily: 'inherit',
              }}
            >×</button>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { AnalysisResult } from '@/lib/types';
import { getAttractivenessColor, getConfidenceColor, capitalise } from '@/lib/scoring';
import { getInitials } from '@/lib/formatters';

export function ProspectHeader({ result }: { result: AnalysisResult }) {
  const badgeBase: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center',
    padding: '4px 10px', borderRadius: 100,
    fontSize: 12, fontWeight: 600,
    border: '1px solid',
  };

  return (
    <div style={{
      padding: '20px 32px',
      borderBottom: '1px solid var(--glass-border)',
      background: 'rgba(20,23,32,0.9)',
      backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', gap: 16,
      flexShrink: 0,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: 'linear-gradient(135deg, var(--accent), var(--violet))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, fontWeight: 800, color: '#fff', flexShrink: 0,
      }}>
        {getInitials(result.companyName)}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>{result.companyName}</h1>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{result.sector}</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{result.website}</div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flexShrink: 0 }}>
        <span className={getAttractivenessColor(result.attractiveness)} style={badgeBase}>
          {capitalise(result.attractiveness)} attractiveness
        </span>
        <span className={getConfidenceColor(result.confidence)} style={badgeBase}>
          {capitalise(result.confidence)} confidence
        </span>
        <span style={{
          ...badgeBase,
          background: 'var(--accent-dim)',
          borderColor: 'rgba(0,212,255,.25)',
          color: 'var(--accent)',
        }}>
          {result.primaryAngle}
        </span>
      </div>
    </div>
  );
}

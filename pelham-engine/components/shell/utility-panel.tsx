'use client';

import { AnalysisResult } from '@/lib/types';

interface UtilityPanelProps {
  result: AnalysisResult;
  onCopyLinkedIn: () => void;
  onCopyEmail: () => void;
  onCreateDeck: () => void;
}

export function UtilityPanel({ result, onCopyLinkedIn, onCopyEmail, onCreateDeck }: UtilityPanelProps) {
  const panelCard = {
    background: 'var(--bg-card)',
    border: '1px solid var(--glass-border)',
    borderRadius: 10,
    padding: '13px 14px',
    marginBottom: 8,
  };

  const actionBtn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 8,
    width: '100%', padding: '8px 10px',
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    borderRadius: 7, color: 'var(--text-secondary)',
    fontSize: 12, cursor: 'pointer',
    marginBottom: 4, transition: 'all .15s',
    fontFamily: 'inherit',
    textAlign: 'left',
  };

  return (
    <aside style={{
      borderLeft: '1px solid var(--glass-border)',
      background: 'rgba(18,21,30,0.7)',
      backdropFilter: 'blur(20px)',
      overflowY: 'auto',
      padding: '20px 14px',
      width: 'var(--panel-w)',
      flexShrink: 0,
    }}>
      {/* Validation gaps */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>Validation gaps</div>
        <div style={panelCard}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>What still needs confirming</div>
          <ul style={{ paddingLeft: 14 }}>
            {result.validationGaps.map((gap, i) => (
              <li key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 4 }}>{gap}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trigger watch */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>Trigger watch</div>
        <div style={panelCard}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Most likely timing signal</div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{result.triggers[0]}</p>
        </div>
      </div>

      {/* Decision makers */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>Decision-maker functions</div>
        <div style={panelCard}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {result.decisionMakerFunctions.map((fn, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', padding: '3px 9px',
                borderRadius: 100, fontSize: 11, fontWeight: 500,
                background: 'rgba(255,255,255,.05)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-secondary)',
              }}>{fn}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>Quick actions</div>
        <button style={actionBtn} onClick={onCopyLinkedIn}>📋 Copy LinkedIn opener</button>
        <button style={actionBtn} onClick={onCopyEmail}>✉️ Copy email opener</button>
        <button style={{
          ...actionBtn,
          background: 'var(--accent-dim)',
          borderColor: 'rgba(0,212,255,.25)',
          color: 'var(--accent)',
        }} onClick={onCreateDeck}>🎯 Create pitch deck</button>
      </div>
    </aside>
  );
}

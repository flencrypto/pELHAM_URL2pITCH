'use client';

import { CopyActionButton } from '@/components/seller/copy-action-button';

interface MessageAssetCardProps {
  title: string;
  content: string;
  icon?: string;
}

export function MessageAssetCard({ title, content, icon = '💬' }: MessageAssetCardProps) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--glass-border)',
      borderRadius: 12, padding: '20px 22px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>{icon}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</span>
        </div>
        <CopyActionButton text={content} label="Copy" variant="primary" />
      </div>
      <pre style={{
        fontFamily: 'inherit', fontSize: 13,
        color: 'var(--text-secondary)', lineHeight: 1.65,
        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: 8, padding: '14px 16px',
      }}>{content}</pre>
    </div>
  );
}

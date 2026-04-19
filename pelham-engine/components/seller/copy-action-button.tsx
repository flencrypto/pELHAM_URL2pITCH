'use client';

import { useAppStore } from '@/lib/store';

interface CopyActionButtonProps {
  text: string;
  label?: string;
  variant?: 'default' | 'primary';
}

export function CopyActionButton({ text, label = 'Copy', variant = 'default' }: CopyActionButtonProps) {
  const { showToast } = useAppStore();

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      showToast('Copied to clipboard');
    } catch {
      showToast('Copy failed');
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        padding: '6px 13px',
        background: variant === 'primary' ? 'var(--accent-dim)' : 'var(--glass-bg)',
        border: `1px solid ${variant === 'primary' ? 'rgba(0,212,255,.25)' : 'var(--glass-border)'}`,
        borderRadius: 6,
        color: variant === 'primary' ? 'var(--accent)' : 'var(--text-secondary)',
        fontSize: 12, fontWeight: 600, cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'all .15s',
      }}
    >
      📋 {label}
    </button>
  );
}

'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export function Toast() {
  const { toastMessage, clearToast } = useAppStore();

  useEffect(() => {
    if (toastMessage) {
      const t = setTimeout(clearToast, 2500);
      return () => clearTimeout(t);
    }
  }, [toastMessage, clearToast]);

  if (!toastMessage) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24,
      background: '#22c55e', color: '#fff',
      padding: '10px 18px', borderRadius: 8,
      fontSize: 13, fontWeight: 600,
      boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      zIndex: 9999,
    }}>
      {toastMessage}
    </div>
  );
}

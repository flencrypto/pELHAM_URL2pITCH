'use client';

import { SidebarNav } from './sidebar-nav';
import { Toast } from './toast';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'var(--sidebar-w) 1fr',
      gridTemplateRows: '100vh',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <SidebarNav />
      <main style={{ overflow: 'hidden', height: '100%', position: 'relative' }}>
        {children}
      </main>
      <Toast />
    </div>
  );
}

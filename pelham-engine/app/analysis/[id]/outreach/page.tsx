'use client';

import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { MessageAssetCard } from '@/components/outreach/message-asset-card';
import { DiscoveryQuestionsCard } from '@/components/outreach/discovery-questions-card';
import { ObjectionsCard } from '@/components/outreach/objections-card';

export default function OutreachPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { currentResult, savedAnalyses } = useAppStore();

  const result = currentResult?.id === params.id
    ? currentResult
    : savedAnalyses.find(a => a.id === params.id);

  if (!result) {
    return <div style={{ padding: 40, color: 'var(--text-secondary)' }}>Analysis not found.</div>;
  }

  const brief = result.sellerBrief;

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '32px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <button
          onClick={() => router.push(`/analysis/${result.id}`)}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}
        >
          ← Seller brief
        </button>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>Outreach assets</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Use the strongest angle immediately across LinkedIn, email and first-call outreach.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: 16 }}>
        <MessageAssetCard title="LinkedIn opener" content={brief.linkedinOpener} icon="💼" />
        <MessageAssetCard title="Email opener" content={brief.emailOpener} icon="✉️" />
        {brief.bonusTools?.openerScript && (
          <MessageAssetCard title="Call opener" content={brief.bonusTools.openerScript} icon="📞" />
        )}
        {brief.bonusTools?.discoveryQuestions && (
          <DiscoveryQuestionsCard questions={brief.bonusTools.discoveryQuestions} />
        )}
        {brief.bonusTools?.objections && (
          <ObjectionsCard objections={brief.bonusTools.objections} />
        )}
        {brief.bonusTools?.miniPitchOutline && (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--glass-border)',
            borderRadius: 12, padding: '20px 22px',
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 14 }}>📊 Mini pitch outline</div>
            <ol style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {brief.bonusTools.miniPitchOutline.map((item, i) => (
                <li key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

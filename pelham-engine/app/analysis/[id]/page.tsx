'use client';

import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ProspectHeader } from '@/components/seller/prospect-header';
import { SummaryStrip } from '@/components/seller/summary-strip';
import { SellerBriefCard } from '@/components/seller/seller-brief-card';
import { CopyActionButton } from '@/components/seller/copy-action-button';
import { UtilityPanel } from '@/components/shell/utility-panel';

export default function AnalysisPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { currentResult, savedAnalyses, showToast } = useAppStore();

  const result = currentResult?.id === params.id
    ? currentResult
    : savedAnalyses.find(a => a.id === params.id);

  if (!result) {
    return (
      <div style={{ padding: 40, color: 'var(--text-secondary)' }}>
        <p>Analysis not found.{' '}
          <button
            style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            onClick={() => router.push('/')}
          >
            Start a new analysis →
          </button>
        </p>
      </div>
    );
  }

  const brief = result.sellerBrief;

  const handleCopyLinkedIn = () => {
    navigator.clipboard?.writeText(brief.linkedinOpener).then(() => showToast('LinkedIn opener copied'));
  };
  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(brief.emailOpener).then(() => showToast('Email opener copied'));
  };
  const handleCreateDeck = () => router.push(`/analysis/${result.id}/deck`);

  const bodyText: React.CSSProperties = {
    fontSize: 13,
    color: 'var(--text-secondary)',
    lineHeight: 1.7,
    whiteSpace: 'pre-wrap',
  };

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Main content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <ProspectHeader result={result} />
        <SummaryStrip result={result} />

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 32px' }}>
          <div style={{ marginBottom: 12 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>Seller brief</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 3 }}>The strongest Pelham route into this account.</p>
          </div>

          <SellerBriefCard num={1} title="Target" subtitle="Company overview and attractiveness" defaultOpen>
            <p style={bodyText}>{brief.target}</p>
          </SellerBriefCard>

          <SellerBriefCard num={2} title="Reason" subtitle="What makes this commercially interesting" defaultOpen>
            <p style={bodyText}>{brief.reason}</p>
          </SellerBriefCard>

          <SellerBriefCard num={3} title="Trigger" subtitle="Why now may be relevant" defaultOpen>
            <p style={bodyText}>{brief.trigger}</p>
          </SellerBriefCard>

          <SellerBriefCard num={4} title="Angle" subtitle="The strongest Pelham positioning" defaultOpen>
            <p style={bodyText}>{brief.angle}</p>
          </SellerBriefCard>

          <SellerBriefCard num={5} title="Contact strategy" subtitle="Who likely cares, who to approach first">
            <p style={bodyText}>{brief.contactStrategy}</p>
          </SellerBriefCard>

          <SellerBriefCard num={6} title="Next step" subtitle="What still needs validating">
            <p style={bodyText}>{brief.nextStep}</p>
          </SellerBriefCard>

          <SellerBriefCard num={7} title="Outreach message" subtitle="LinkedIn opener + email opener">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>💼 LinkedIn opener</span>
                  <CopyActionButton text={brief.linkedinOpener} label="Copy" variant="primary" />
                </div>
                <pre style={bodyText}>{brief.linkedinOpener}</pre>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>✉️ Email opener</span>
                  <CopyActionButton text={brief.emailOpener} label="Copy" variant="primary" />
                </div>
                <pre style={bodyText}>{brief.emailOpener}</pre>
              </div>
            </div>
          </SellerBriefCard>

          {brief.bonusTools && (
            <SellerBriefCard num={8} title="Bonus seller tools" subtitle="Scripts, objections, discovery questions">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {brief.bonusTools.openerScript && (
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>📞 Quick opener script</div>
                    <pre style={bodyText}>{brief.bonusTools.openerScript}</pre>
                  </div>
                )}
                {brief.bonusTools.discoveryQuestions && (
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>🔍 Discovery questions</div>
                    <ol style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {brief.bonusTools.discoveryQuestions.map((q, i) => (
                        <li key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{q}</li>
                      ))}
                    </ol>
                  </div>
                )}
                {brief.bonusTools.objections && (
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>🛡️ Likely objections</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {brief.bonusTools.objections.map((o, i) => (
                        <div key={i} style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 7, padding: '10px 12px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{o}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </SellerBriefCard>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 20, paddingBottom: 40 }}>
            <button
              onClick={handleCreateDeck}
              style={{
                padding: '10px 20px',
                background: 'var(--accent)', color: '#000',
                border: 'none', borderRadius: 8,
                fontSize: 13, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              🎯 Create pitch deck
            </button>
            <button
              onClick={() => router.push(`/analysis/${result.id}/outreach`)}
              style={{
                padding: '10px 20px',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: 8, color: 'var(--text-secondary)',
                fontSize: 13, cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              ✉️ Outreach assets
            </button>
          </div>
        </div>
      </div>

      {/* Utility panel */}
      <UtilityPanel
        result={result}
        onCopyLinkedIn={handleCopyLinkedIn}
        onCopyEmail={handleCopyEmail}
        onCreateDeck={handleCreateDeck}
      />
    </div>
  );
}

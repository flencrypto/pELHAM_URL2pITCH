'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { runAnalysis } from '@/lib/analysis-engine';
import { isValidUrl } from '@/lib/formatters';
import { AnalysisInput, OutputMode, ProjectType } from '@/lib/types';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 13px',
  background: 'rgba(255,255,255,.04)',
  border: '1px solid var(--glass-border)',
  borderRadius: 8, color: 'var(--text-primary)',
  fontSize: 14, outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color .15s',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11.5, fontWeight: 700,
  letterSpacing: '.06em', textTransform: 'uppercase',
  color: 'var(--text-secondary)', marginBottom: 6,
};

const cardStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--glass-border)',
  borderRadius: 14, padding: '28px 32px',
  maxWidth: 640,
};

export function AnalysisIntakeForm() {
  const router = useRouter();
  const { setCurrentResult, saveAnalysis, showToast } = useAppStore();

  const [url, setUrl] = useState('');
  const [company, setCompany] = useState('');
  const [mode, setMode] = useState<OutputMode>('seller_brief');
  const [projectType, setProjectType] = useState<ProjectType>('auto_detect');
  const [notes, setNotes] = useState('');
  const [urlError, setUrlError] = useState('');

  const handleAnalyse = () => {
    if (!isValidUrl(url)) {
      setUrlError('Please enter a valid website URL (e.g. https://example.com)');
      return;
    }
    setUrlError('');

    const input: AnalysisInput = {
      website: url,
      companyName: company,
      mode,
      brandContext: 'Pelham Interiors',
      projectType,
      extraNotes: notes,
    };

    const result = runAnalysis(input);
    setCurrentResult(result);
    saveAnalysis(result);

    // seller_brief → seller brief page; all other modes go straight to deck builder
    if (mode === 'seller_brief') {
      router.push(`/analysis/${result.id}`);
    } else {
      router.push(`/analysis/${result.id}/deck`);
    }
  };

  const handleLoadSample = () => {
    setUrl('https://www.acme-corp.com');
    setCompany('Acme Corporation');
    setMode('seller_brief');
    setNotes('Target as premium HQ fit-out opportunity');
    showToast('Sample loaded');
  };

  const selectStyle: React.CSSProperties = { ...inputStyle, cursor: 'pointer' };

  return (
    <div style={cardStyle}>
      <div style={{ marginBottom: 22 }}>
        <label style={labelStyle} htmlFor="inp-url">
          Company website <span style={{ color: 'var(--danger)' }}>*</span>
        </label>
        <input
          id="inp-url"
          style={{ ...inputStyle, borderColor: urlError ? 'var(--danger)' : 'var(--glass-border)' }}
          type="url"
          placeholder="https://companysite.com"
          value={url}
          onChange={e => { setUrl(e.target.value); if (urlError) setUrlError(''); }}
        />
        {urlError && <p aria-live="polite" style={{ color: 'var(--danger)', fontSize: 12, marginTop: 5 }}>{urlError}</p>}
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 5 }}>Enter a company homepage or main domain.</p>
      </div>

      <div style={{ marginBottom: 22 }}>
        <label style={labelStyle} htmlFor="inp-company">
          Company name <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none' }}>— optional</span>
        </label>
        <input
          id="inp-company"
          style={inputStyle}
          type="text"
          placeholder="Acme Corporation"
          value={company}
          onChange={e => setCompany(e.target.value)}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 22 }}>
        <div>
          <label style={labelStyle} htmlFor="inp-mode">Output mode</label>
          <select id="inp-mode" style={selectStyle} value={mode} onChange={e => setMode(e.target.value as OutputMode)}>
            <option value="seller_brief">Seller brief</option>
            <option value="customer_pitch">Customer pitch deck</option>
            <option value="internal_deck">Internal qualification deck</option>
            <option value="quote_stage">Quotation-stage proposal</option>
          </select>
        </div>
        <div>
          <label style={labelStyle} htmlFor="inp-project">Project type</label>
          <select id="inp-project" style={selectStyle} value={projectType} onChange={e => setProjectType(e.target.value as ProjectType)}>
            <option value="auto_detect">Auto-detect</option>
            <option value="fit_out">Fit-out</option>
            <option value="refurbishment">Refurbishment</option>
            <option value="relocation">Relocation</option>
            <option value="reconfiguration">Reconfiguration</option>
            <option value="expansion">Expansion</option>
            <option value="consolidation">Consolidation</option>
            <option value="workplace_consultancy">Workplace consultancy</option>
            <option value="furniture_move">Furniture / move management</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 26 }}>
        <label style={labelStyle} htmlFor="inp-notes">
          Notes / context <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none' }}>— optional</span>
        </label>
        <textarea
          id="inp-notes"
          style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
          placeholder="Add anything you already know about this company or what you are looking for…"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={handleAnalyse}
          style={{
            flex: 1, padding: '12px 20px',
            background: 'var(--accent)', color: '#000',
            border: 'none', borderRadius: 9,
            fontSize: 14, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontFamily: 'inherit',
          }}
        >
          🔍 Analyse company
        </button>
        <button
          onClick={handleLoadSample}
          style={{
            padding: '12px 18px',
            background: 'transparent',
            border: '1px solid var(--glass-border)',
            borderRadius: 9, color: 'var(--text-secondary)',
            fontSize: 14, cursor: 'pointer',
            fontFamily: 'inherit',
            whiteSpace: 'nowrap',
          }}
        >
          Load sample
        </button>
      </div>

      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 14, textAlign: 'center' }}>
        The first pass will generate a seller brief before any deck is created.
      </p>
    </div>
  );
}

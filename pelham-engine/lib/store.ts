'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AnalysisResult, AnalysisState, DeckMode, BrandMode, Tone, Density } from './types';

interface AppStore {
  analysisState: AnalysisState;
  setAnalysisState: (state: AnalysisState) => void;

  currentResult: AnalysisResult | null;
  setCurrentResult: (result: AnalysisResult) => void;

  savedAnalyses: AnalysisResult[];
  saveAnalysis: (result: AnalysisResult) => void;
  deleteAnalysis: (id: string) => void;

  expandedCards: Set<string>;
  toggleCard: (cardId: string) => void;

  deckMode: DeckMode;
  brandMode: BrandMode;
  tone: Tone;
  density: Density;
  deckTitle: string;
  selectedSlideId: string;
  setDeckMode: (mode: DeckMode) => void;
  setBrandMode: (mode: BrandMode) => void;
  setTone: (tone: Tone) => void;
  setDensity: (density: Density) => void;
  setDeckTitle: (title: string) => void;
  setSelectedSlideId: (id: string) => void;

  toastMessage: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      analysisState: { status: 'idle' },
      setAnalysisState: (state) => set({ analysisState: state }),

      currentResult: null,
      setCurrentResult: (result) => set({ currentResult: result }),

      savedAnalyses: [],
      saveAnalysis: (result) =>
        set((s) => ({
          savedAnalyses: [result, ...s.savedAnalyses.filter(a => a.id !== result.id)].slice(0, 20),
        })),
      deleteAnalysis: (id) =>
        set((s) => ({ savedAnalyses: s.savedAnalyses.filter(a => a.id !== id) })),

      expandedCards: new Set(['1', '2', '3', '4']),
      toggleCard: (cardId) =>
        set((s) => {
          const next = new Set(s.expandedCards);
          if (next.has(cardId)) next.delete(cardId);
          else next.add(cardId);
          return { expandedCards: next };
        }),

      deckMode: 'customer_pitch',
      brandMode: 'pelham',
      tone: 'commercial',
      density: 'standard',
      deckTitle: '',
      selectedSlideId: 's1',
      setDeckMode: (deckMode) => set({ deckMode }),
      setBrandMode: (brandMode) => set({ brandMode }),
      setTone: (tone) => set({ tone }),
      setDensity: (density) => set({ density }),
      setDeckTitle: (deckTitle) => set({ deckTitle }),
      setSelectedSlideId: (selectedSlideId) => set({ selectedSlideId }),

      toastMessage: null,
      showToast: (msg) => set({ toastMessage: msg }),
      clearToast: () => set({ toastMessage: null }),
    }),
    {
      name: 'pelham-engine-store',
      partialize: (state) => ({
        savedAnalyses: state.savedAnalyses,
        currentResult: state.currentResult,
        deckMode: state.deckMode,
        brandMode: state.brandMode,
        tone: state.tone,
        density: state.density,
      }),
    }
  )
);

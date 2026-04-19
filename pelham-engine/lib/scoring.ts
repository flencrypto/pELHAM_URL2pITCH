import { ConfidenceLevel, AttractivenessLevel } from './types';

export function getAttractivenessColor(level: AttractivenessLevel): string {
  return level === 'high' ? 'text-green-400 bg-green-400/10 border-green-400/20'
    : level === 'medium' ? 'text-amber-400 bg-amber-400/10 border-amber-400/20'
    : 'text-red-400 bg-red-400/10 border-red-400/20';
}

export function getConfidenceColor(level: ConfidenceLevel): string {
  return level === 'high' ? 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20'
    : level === 'medium' ? 'text-amber-400 bg-amber-400/10 border-amber-400/20'
    : 'text-slate-400 bg-slate-400/10 border-slate-400/20';
}

export function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

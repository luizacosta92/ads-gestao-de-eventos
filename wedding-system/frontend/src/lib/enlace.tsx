// src/lib/enlace.tsx
// Helpers de UI portados do protótipo Enlace (avatares, status pill, formatadores).
import { WeddingStatus, WEDDING_STATUS_LABELS } from '@/types/wedding';

// ---- paleta de gradientes para avatares (warm, derivada do acento) ----
const AV_COLORS: [string, string][] = [
  ['#BB6446', '#9A4E33'], ['#7E8A6C', '#5C6A48'], ['#B08A47', '#8C6A2C'],
  ['#9C5660', '#7A3C46'], ['#5A8090', '#3C5B68'], ['#A0664E', '#7E4632'],
  ['#86795F', '#645838'], ['#8A6CA0', '#664C7E'],
];

export function avColor(seed: string): [string, string] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return AV_COLORS[h % AV_COLORS.length];
}

export function initials(name: string): string {
  return (name || '?').trim().charAt(0).toUpperCase();
}

// ---- cores das categorias de fornecedor ----
export const VENDOR_CAT_COLOR: Record<string, string> = {
  BUFFET: '#BB6446', FOTOGRAFIA: '#5A8090', VIDEO: '#6C5A90', DECORACAO: '#7E8A6C',
  MUSICA: '#9C5660', BOLO: '#C07A8E', BEBIDAS: '#B08A47', CONVITES: '#4E8A7E',
  LEMBRANCINHAS: '#A0664E', ESPACO: '#5A8090', BELEZA: '#A05E84', CELEBRANTE: '#86795F',
  TRANSPORTE: '#6E7686',
};

export function catColor(cat: string): string {
  return VENDOR_CAT_COLOR[cat] ?? '#86795F';
}

// cor de pontinho por status (filtros / distribuição)
export const STATUS_DOT: Record<WeddingStatus, string> = {
  PLANNING: '#b78d3d',
  CONFIRMED: '#5a8090',
  IN_PROGRESS: 'var(--accent)',
  COMPLETED: 'var(--sage)',
  CANCELLED: '#a8766b',
};

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

export function parseDate(s?: string | null): Date | null {
  return s ? new Date(s.slice(0, 10) + 'T00:00:00') : null;
}

export function fmtShort(s?: string | null): string {
  const d = parseDate(s);
  if (!d) return '—';
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

export function fmtMoney(v?: number | null): string | null {
  if (v == null) return null;
  return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

export function daysUntil(s?: string | null): number | null {
  const d = parseDate(s);
  if (!d) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((d.getTime() - today.getTime()) / 86400000);
}

export function dayMonth(s?: string | null): { d: number; m: string } | null {
  const d = parseDate(s);
  if (!d) return null;
  return { d: d.getDate(), m: MONTHS[d.getMonth()] };
}

// ---- componentes ----
export function StatusPill({ status }: { status: WeddingStatus }) {
  return (
    <span className={`pill s-${status}`}>
      <span className="dot" />
      {WEDDING_STATUS_LABELS[status]}
    </span>
  );
}

export function CoupleAv({ a, b }: { a: string; b: string }) {
  const c1 = avColor(a);
  const c2 = avColor(b + 'x');
  return (
    <span className="couple-av">
      <span className="av" style={{ background: `linear-gradient(135deg, ${c1[0]}, ${c1[1]})` }}>
        {initials(a)}
      </span>
      <span className="av" style={{ background: `linear-gradient(135deg, ${c2[0]}, ${c2[1]})` }}>
        {initials(b)}
      </span>
    </span>
  );
}

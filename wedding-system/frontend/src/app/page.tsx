'use client';
// src/app/page.tsx — Painel (Dashboard) do Enlace
import Link from 'next/link';
import { useWeddings } from '@/hooks/use-weddings';
import { Wedding, WeddingStatus, WEDDING_STATUS_LABELS } from '@/types/wedding';
import {
  StatusPill, daysUntil, parseDate, dayMonth, fmtMoney, STATUS_DOT,
} from '@/lib/enlace';
import {
  Heart, CalendarDays, Wallet, Store, Plus, ArrowRight, Sparkles,
} from 'lucide-react';

const STATUS_ORDER: WeddingStatus[] = ['PLANNING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
const ACTIVE: WeddingStatus[] = ['PLANNING', 'CONFIRMED', 'IN_PROGRESS'];

export default function DashboardPage() {
  const { data, isLoading } = useWeddings(1, 100);
  const weddings: Wedding[] = data?.data ?? [];

  const active = weddings.filter((w) => ACTIVE.includes(w.status));
  const upcoming = weddings
    .filter((w) => {
      const d = daysUntil(w.wedding_date);
      return d != null && d >= 0 && w.status !== 'CANCELLED';
    })
    .sort((a, b) => (parseDate(a.wedding_date)!.getTime() - parseDate(b.wedding_date)!.getTime()));
  const next60 = upcoming.filter((w) => (daysUntil(w.wedding_date) ?? 999) <= 60);
  const managed = weddings
    .filter((w) => w.status !== 'CANCELLED')
    .reduce((s, w) => s + (Number(w.total_budget) || 0), 0);

  const dist = STATUS_ORDER.map((s) => ({ s, n: weddings.filter((w) => w.status === s).length }));
  const maxN = Math.max(...dist.map((d) => d.n), 1);

  const spotlight = upcoming[0];

  const today = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  const stats = [
    { ic: Heart, val: String(active.length), label: 'Casamentos ativos', trend: 'em gestão' },
    { ic: CalendarDays, val: String(next60.length), label: 'Eventos em 60 dias', trend: 'próximos da agenda' },
    {
      ic: Wallet,
      val: managed >= 1e6 ? `R$ ${(managed / 1e6).toFixed(2).replace('.', ',')} mi` : (fmtMoney(managed) ?? 'R$ 0'),
      label: 'Orçamento sob gestão',
      trend: `${active.length} projetos`,
    },
    { ic: Store, val: '21', label: 'Fornecedores ativos', trend: '13 categorias' },
  ];

  return (
    <div className="screen enter">
      <div className="topbar">
        <div>
          <div className="eyebrow">Painel · {today}</div>
          <h1 className="page-title">{greeting}, Jani</h1>
          <p className="page-sub">
            {isLoading
              ? 'Carregando suas celebrações…'
              : `Você tem ${next60.length} celebrações chegando e ${active.length} projetos em andamento.`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/fornecedores" className="btn btn-outline">
            <Store size={16} />
            Fornecedores
          </Link>
          <Link href="/casamentos/novo" className="btn btn-primary">
            <Plus size={16} />
            Novo casamento
          </Link>
        </div>
      </div>

      <div className="stat-grid">
        {stats.map((s, i) => {
          const Icon = s.ic;
          return (
            <div className="stat" key={i}>
              <div className="stat-ico">
                <Icon size={19} />
              </div>
              <div className="stat-val">{s.val}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-trend">{s.trend}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* próximas celebrações */}
        <div className="card">
          <div className="sec-head" style={{ padding: '18px 20px 4px', margin: 0 }}>
            <span className="sec-title">Próximas celebrações</span>
            <Link href="/casamentos" className="sec-link">
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>
          <div>
            {upcoming.length === 0 ? (
              <div className="empty" style={{ padding: '40px 20px' }}>
                <CalendarDays size={34} />
                <div>Nenhuma celebração futura agendada.</div>
              </div>
            ) : (
              upcoming.slice(0, 5).map((w) => {
                const dm = dayMonth(w.wedding_date)!;
                const days = daysUntil(w.wedding_date)!;
                return (
                  <Link className="tl-item" key={w.id} href={`/casamentos/${w.id}`}>
                    <div className="tl-date">
                      <div className="tl-d">{dm.d}</div>
                      <div className="tl-m">{dm.m}</div>
                    </div>
                    <div>
                      <div className="tl-name">
                        {w.bride_name} &amp; {w.groom_name}
                      </div>
                      <div className="tl-meta">
                        <span>{w.venue || w.city || 'Local a definir'}</span>
                        <span>{w.estimated_guests > 0 ? `${w.estimated_guests} convidados` : 'a definir'}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span
                        style={{
                          fontSize: 12.5,
                          color: 'var(--accent-ink)',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {days === 0 ? 'hoje' : `em ${days} dias`}
                      </span>
                      <StatusPill status={w.status} />
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* distribuição + destaque */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ padding: 20 }}>
            <div className="label-up" style={{ marginBottom: 16 }}>
              Distribuição por status
            </div>
            {dist.map(({ s, n }) => (
              <div className="dist-row" key={s}>
                <div className="dist-label">{WEDDING_STATUS_LABELS[s]}</div>
                <div className="dist-track">
                  <div
                    className="dist-fill"
                    style={{ width: `${(n / maxN) * 100}%`, background: STATUS_DOT[s] }}
                  />
                </div>
                <div className="dist-val">{n}</div>
              </div>
            ))}
          </div>

          {spotlight && (
            <div
              className="card"
              style={{
                padding: 20,
                background: 'linear-gradient(135deg, var(--ink), #463a30)',
                color: '#fff',
                border: 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  opacity: 0.75,
                  fontSize: 11,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                <Sparkles size={14} /> Destaque da semana
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 26,
                  fontWeight: 600,
                  marginTop: 12,
                  lineHeight: 1.05,
                }}
              >
                {spotlight.bride_name} &amp; {spotlight.groom_name}
              </div>
              <div style={{ fontSize: 13, opacity: 0.82, marginTop: 6 }}>
                {spotlight.venue || spotlight.city || 'Local a definir'} · em {daysUntil(spotlight.wedding_date)} dias
              </div>
              <Link
                href={`/casamentos/${spotlight.id}`}
                className="btn"
                style={{
                  marginTop: 16,
                  background: 'rgba(255,255,255,.16)',
                  color: '#fff',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                Abrir projeto <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';
// src/app/casamentos/[id]/page.tsx — detalhe do casamento (design Enlace)

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useWedding, useDeleteWedding } from '@/hooks/use-weddings';
import { Wedding } from '@/types/wedding';
import { WEDDING_VENDOR_FIELD_CONFIG, VENDOR_CATEGORY_LABELS } from '@/lib/api/vendors';
import { StatusPill, fmtShort, fmtMoney, daysUntil, catColor } from '@/lib/enlace';
import {
  ArrowLeft, Pencil, Trash2, Calendar, MapPin, Users, Wallet, Mail, Phone, Store, ArrowRight,
} from 'lucide-react';

function InfoCard({
  icon: Icon, label, value,
}: {
  icon: any;
  label: string;
  value: string | null | undefined;
}) {
  const empty = !value;
  return (
    <div className="info-card">
      <div className="info-ico">
        <Icon size={18} />
      </div>
      <div>
        <div className="info-label">{label}</div>
        <div className={'info-value' + (empty ? ' empty' : '')}>{value || 'Não informado'}</div>
      </div>
    </div>
  );
}

export default function WeddingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [showDelete, setShowDelete] = useState(false);

  const { data: wedding, isLoading } = useWedding(id);
  const deleteMutation = useDeleteWedding();

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(id);
    router.push('/casamentos');
  };

  if (isLoading) return <div className="screen">Carregando…</div>;
  if (!wedding) return <div className="screen" style={{ color: '#a44a3a' }}>Casamento não encontrado.</div>;

  const w: Wedding = wedding;
  const days = daysUntil(w.wedding_date);
  const loc =
    [w.venue, [w.city, w.state].filter(Boolean).join('/')].filter(Boolean).join(' · ') || null;

  const dateLong = w.wedding_date
    ? format(new Date(w.wedding_date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })
    : null;

  // fornecedores vinculados (campos planos preenchidos)
  const linkedVendors = WEDDING_VENDOR_FIELD_CONFIG
    .map((cfg) => ({ cfg, value: (w as any)[cfg.name] as string | null | undefined }))
    .filter((x) => x.value && x.value !== '');

  return (
    <div className="screen enter" style={{ maxWidth: 940 }}>
      <Link href="/casamentos" className="btn btn-ghost" style={{ paddingLeft: 6, marginBottom: 14 }}>
        <ArrowLeft size={16} /> Voltar para casamentos
      </Link>

      <div className="detail-hero">
        {days != null && days >= 0 && w.status !== 'CANCELLED' && (
          <div className="countdown">
            <div className="cd-num">{days === 0 ? '🎉' : days}</div>
            <div className="cd-label">{days === 0 ? 'é hoje' : days === 1 ? 'dia restante' : 'dias restantes'}</div>
          </div>
        )}
        <StatusPill status={w.status} />
        <div className="hero-couple" style={{ marginTop: 14 }}>
          {w.bride_name} <span style={{ opacity: 0.6, fontStyle: 'italic' }}>&amp;</span> {w.groom_name}
        </div>
        <div className="hero-meta">
          <span>
            <Calendar size={16} />
            {fmtShort(w.wedding_date)}
          </span>
          {loc && (
            <span>
              <MapPin size={16} />
              {w.venue || w.city}
            </span>
          )}
          {w.estimated_guests > 0 && (
            <span>
              <Users size={16} />
              {w.estimated_guests} convidados
            </span>
          )}
          {linkedVendors.length > 0 && (
            <span>
              <Store size={16} />
              {linkedVendors.length} fornecedores
            </span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginBottom: 24 }}>
        <Link href={`/casamentos/${id}/editar`} className="btn btn-outline">
          <Pencil size={15} />
          Editar
        </Link>
        <button className="btn btn-danger" onClick={() => setShowDelete(true)}>
          <Trash2 size={15} />
          Excluir
        </button>
      </div>

      <div className="label-up" style={{ marginBottom: 12 }}>
        Dados do casal
      </div>
      <div className="info-grid" style={{ marginBottom: 26 }}>
        <InfoCard icon={Mail} label="E-mail do casal" value={w.couple_email} />
        <InfoCard icon={Phone} label="Telefone / WhatsApp" value={w.couple_phone} />
      </div>

      <div className="label-up" style={{ marginBottom: 12 }}>
        Informações do evento
      </div>
      <div className="info-grid" style={{ marginBottom: 26 }}>
        <InfoCard icon={Calendar} label="Data do casamento" value={dateLong} />
        <InfoCard icon={MapPin} label="Local" value={loc} />
        <InfoCard
          icon={Users}
          label="Convidados"
          value={w.estimated_guests > 0 ? `${w.estimated_guests} pessoas` : null}
        />
        <InfoCard icon={Wallet} label="Orçamento total" value={fmtMoney(w.total_budget)} />
      </div>

      {/* Fornecedores do evento */}
      <div className="sec-head" style={{ margin: '0 0 12px' }}>
        <span className="label-up">Fornecedores do evento</span>
        <Link href="/fornecedores" className="sec-link">
          Ver catálogo <ArrowRight size={14} />
        </Link>
      </div>

      <div className="card" style={{ overflow: 'hidden', padding: 0, marginBottom: 26 }}>
        {linkedVendors.length === 0 ? (
          <div className="empty" style={{ padding: '40px 20px' }}>
            <Store size={34} />
            <div>Nenhum fornecedor vinculado a este casamento ainda.</div>
          </div>
        ) : (
          linkedVendors.map(({ cfg, value }) => {
            const c = catColor(cfg.category);
            return (
              <div className="lk-row" key={cfg.name}>
                <div className="lk-logo" style={{ background: `linear-gradient(135deg, ${c}, ${c}cc)` }}>
                  {(value as string).charAt(0)}
                </div>
                <div>
                  <div className="lk-name">{value}</div>
                  <div className="lk-cat">
                    <span className="dot" style={{ background: c }} />
                    {VENDOR_CATEGORY_LABELS[cfg.category] ?? cfg.label}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {w.notes && (
        <div className="card" style={{ padding: 22 }}>
          <div className="label-up" style={{ marginBottom: 10 }}>
            Observações
          </div>
          <p style={{ margin: 0, color: 'var(--ink-soft)', lineHeight: 1.6, fontSize: 15, whiteSpace: 'pre-wrap' }}>
            {w.notes}
          </p>
        </div>
      )}

      {showDelete && (
        <div className="modal-back" onClick={() => setShowDelete(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmar exclusão</h3>
            <p>
              Tem certeza que deseja excluir o casamento de{' '}
              <strong>
                {w.bride_name} &amp; {w.groom_name}
              </strong>
              ? Esta ação não pode ser desfeita.
            </p>
            <div className="modal-foot">
              <button className="btn btn-outline" onClick={() => setShowDelete(false)}>
                Cancelar
              </button>
              <button className="btn" style={{ background: '#a44a3a', color: '#fff' }} onClick={handleDelete}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';
// src/app/casamentos/page.tsx — lista de casamentos (design Enlace)

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWeddings, useDeleteWedding } from '@/hooks/use-weddings';
import {
  WEDDING_STATUS_LABELS, WeddingStatus, Wedding,
} from '@/types/wedding';
import { StatusPill, CoupleAv, fmtShort, fmtMoney, STATUS_DOT } from '@/lib/enlace';
import { Plus, Search, Eye, Pencil, Trash2 } from 'lucide-react';

const STATUS_ORDER: WeddingStatus[] = ['PLANNING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

export default function WeddingsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [statusF, setStatusF] = useState<WeddingStatus | ''>('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Wedding | null>(null);

  const { data, isLoading } = useWeddings(page, 10, search || undefined);
  const deleteMutation = useDeleteWedding();

  const rows = (data?.data ?? []).filter((w) => !statusF || w.status === statusF);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="screen enter">
      <div className="topbar">
        <div>
          <div className="eyebrow">Projetos</div>
          <h1 className="page-title">Casamentos</h1>
          <p className="page-sub">Gerencie cada celebração — do primeiro contato ao grande dia.</p>
        </div>
        <Link href="/casamentos/novo" className="btn btn-primary">
          <Plus size={16} />
          Novo casamento
        </Link>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          marginBottom: 18,
          flexWrap: 'wrap',
        }}
      >
        <div className="chips">
          <button className={'chip' + (!statusF ? ' active' : '')} onClick={() => setStatusF('')}>
            Todos
          </button>
          {STATUS_ORDER.map((s) => (
            <button
              key={s}
              className={'chip' + (statusF === s ? ' active' : '')}
              onClick={() => setStatusF(statusF === s ? '' : s)}
            >
              <span className="dot" style={{ background: STATUS_DOT[s] }} />
              {WEDDING_STATUS_LABELS[s]}
            </button>
          ))}
        </div>
        <div className="search">
          <Search />
          <input
            placeholder="Buscar casal, local, cidade…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th>Casal</th>
              <th>Data</th>
              <th>Local</th>
              <th className="t-center">Convidados</th>
              <th>Orçamento</th>
              <th>Status</th>
              <th className="t-right">Ações</th>
            </tr>
          </thead>
          <tbody className="stagger">
            {isLoading ? (
              <tr>
                <td colSpan={7}>
                  <div className="empty">Carregando…</div>
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="empty">
                    <Search size={36} />
                    <div>Nenhum casamento encontrado.</div>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((w) => (
                <tr key={w.id} onClick={() => router.push(`/casamentos/${w.id}`)}>
                  <td>
                    <div className="cell-couple">
                      <CoupleAv a={w.bride_name} b={w.groom_name} />
                      <div>
                        <div className="cell-strong">
                          {w.bride_name} &amp; {w.groom_name}
                        </div>
                        <div className="cell-sub">{w.couple_email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="num">{fmtShort(w.wedding_date)}</span>
                  </td>
                  <td>
                    <div>{w.venue || <span style={{ color: 'var(--muted)' }}>—</span>}</div>
                    {(w.city || w.state) && (
                      <div className="cell-sub">
                        {w.city}
                        {w.state ? `/${w.state}` : ''}
                      </div>
                    )}
                  </td>
                  <td className="t-center num">
                    {w.estimated_guests > 0 ? w.estimated_guests : <span style={{ color: 'var(--muted)' }}>—</span>}
                  </td>
                  <td className="num">{fmtMoney(w.total_budget) ?? <span style={{ color: 'var(--muted)' }}>—</span>}</td>
                  <td>
                    <StatusPill status={w.status} />
                  </td>
                  <td className="t-right">
                    <div className="row-actions" onClick={(e) => e.stopPropagation()}>
                      <Link href={`/casamentos/${w.id}`} className="btn-icon" title="Ver">
                        <Eye size={17} />
                      </Link>
                      <Link href={`/casamentos/${w.id}/editar`} className="btn-icon" title="Editar">
                        <Pencil size={16} />
                      </Link>
                      <button
                        className="btn-icon"
                        title="Excluir"
                        style={{ color: '#a44a3a' }}
                        onClick={() => setDeleteTarget(w)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {data?.meta && (
        <div className="pager">
          <span>
            Mostrando {rows.length} de {data.meta.total} casamentos
          </span>
          <div className="grp">
            <button
              className="btn btn-outline"
              disabled={page === 1}
              style={page === 1 ? { opacity: 0.5 } : undefined}
              onClick={() => setPage((p) => p - 1)}
            >
              Anterior
            </button>
            <button
              className="btn btn-outline"
              disabled={page >= data.meta.lastPage}
              style={page >= data.meta.lastPage ? { opacity: 0.5 } : undefined}
              onClick={() => setPage((p) => p + 1)}
            >
              Próxima
            </button>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="modal-back" onClick={() => setDeleteTarget(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmar exclusão</h3>
            <p>
              Tem certeza que deseja excluir o casamento de{' '}
              <strong>
                {deleteTarget.bride_name} &amp; {deleteTarget.groom_name}
              </strong>
              ? Esta ação não pode ser desfeita.
            </p>
            <div className="modal-foot">
              <button className="btn btn-outline" onClick={() => setDeleteTarget(null)}>
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

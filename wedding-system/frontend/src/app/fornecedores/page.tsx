'use client';
// src/app/fornecedores/page.tsx — catálogo de fornecedores (design Enlace)
// Busca da API; se o backend estiver offline, usa dados mockados.

import { useState, useEffect } from 'react';
import {
  vendorsApi, Vendor, PaginatedVendors,
  MOCK_VENDORS, VENDOR_CATEGORY_LABELS,
} from '@/lib/api/vendors';
import { catColor } from '@/lib/enlace';
import { Plus, Search, Phone, Globe, MapPin } from 'lucide-react';

const ALL_CATEGORIES = Object.keys(VENDOR_CATEGORY_LABELS);

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, lastPage: 1 });
  const LIMIT = 12;

  useEffect(() => {
    setIsLoading(true);
    vendorsApi
      .list(page, LIMIT, search || undefined, cat || undefined)
      .then((res: PaginatedVendors) => {
        setVendors(res.data);
        setMeta({ total: res.meta.total, lastPage: res.meta.lastPage });
      })
      .catch(() => {
        const q = search.toLowerCase();
        const filtered = MOCK_VENDORS.filter((v) => {
          const matchCat = !cat || v.service_category === cat;
          const matchSearch =
            !search ||
            v.name.toLowerCase().includes(q) ||
            v.service_category.toLowerCase().includes(q) ||
            (v.city ?? '').toLowerCase().includes(q) ||
            (v.email ?? '').toLowerCase().includes(q);
          return matchCat && matchSearch;
        });
        const start = (page - 1) * LIMIT;
        setVendors(filtered.slice(start, start + LIMIT));
        setMeta({ total: filtered.length, lastPage: Math.ceil(filtered.length / LIMIT) || 1 });
      })
      .finally(() => setIsLoading(false));
  }, [page, search, cat]);

  return (
    <div className="screen enter">
      <div className="topbar">
        <div>
          <div className="eyebrow">Rede de parceiros</div>
          <h1 className="page-title">Fornecedores</h1>
          <p className="page-sub">
            Buffet, decoração, música, fotografia e tudo o que uma celebração precisa.
          </p>
        </div>
        <button className="btn btn-primary" type="button">
          <Plus size={16} />
          Novo fornecedor
        </button>
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
          <button
            className={'chip' + (!cat ? ' active' : '')}
            onClick={() => {
              setCat('');
              setPage(1);
            }}
          >
            Todas
          </button>
          {ALL_CATEGORIES.map((c) => (
            <button
              key={c}
              className={'chip' + (cat === c ? ' active' : '')}
              onClick={() => {
                setCat(cat === c ? '' : c);
                setPage(1);
              }}
            >
              <span className="dot" style={{ background: catColor(c) }} />
              {VENDOR_CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
        <div className="search">
          <Search />
          <input
            placeholder="Buscar fornecedor, cidade…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="card">
          <div className="empty">Carregando…</div>
        </div>
      ) : vendors.length === 0 ? (
        <div className="card">
          <div className="empty">
            <Search size={36} />
            <div>Nenhum fornecedor encontrado.</div>
          </div>
        </div>
      ) : (
        <div className="vendor-grid stagger">
          {vendors.map((v) => {
            const c = catColor(v.service_category);
            return (
              <div className="vendor" key={v.id}>
                <div className="vendor-top">
                  <div className="vendor-logo" style={{ background: `linear-gradient(135deg, ${c}, ${c}cc)` }}>
                    {v.name.charAt(0)}
                  </div>
                  <span className="cat-tag" style={{ background: c + '1f', color: c }}>
                    <span className="dot" style={{ background: c }} />
                    {VENDOR_CATEGORY_LABELS[v.service_category] ?? v.service_category}
                  </span>
                </div>
                <div className="vendor-name">{v.name}</div>
                <div className="vendor-loc">
                  <MapPin size={13} />
                  {v.city}
                  {v.state ? `/${v.state}` : ''}
                  {!v.is_active && <span style={{ color: 'var(--muted)', marginLeft: 6 }}>· inativo</span>}
                </div>
                {v.notes && <div className="vendor-notes">{v.notes}</div>}
                <div className="vendor-foot">
                  {v.whatsapp && (
                    <span>
                      <Phone size={14} />
                      {v.whatsapp}
                    </span>
                  )}
                  {v.website && (
                    <span style={{ color: 'var(--accent-ink)' }}>
                      <Globe size={14} />
                      {v.website.replace(/^https?:\/\//, '')}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="pager">
        <span>
          Mostrando {vendors.length} de {meta.total} fornecedores
        </span>
        {meta.lastPage > 1 && (
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
              disabled={page >= meta.lastPage}
              style={page >= meta.lastPage ? { opacity: 0.5 } : undefined}
              onClick={() => setPage((p) => p + 1)}
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

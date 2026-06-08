'use client';
// src/app/fornecedores/page.tsx
//
// Lista todos os fornecedores cadastrados.
// Tenta buscar da API; se o backend não estiver rodando, usa os dados mockados.

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { SearchIcon, PhoneIcon, MailIcon, GlobeIcon, BuildingIcon } from 'lucide-react';
import {
  vendorsApi, Vendor, PaginatedVendors,
  MOCK_VENDORS, VENDOR_CATEGORY_LABELS, VENDOR_CATEGORY_COLORS,
} from '@/lib/api/vendors';

const dash = (v: unknown) => (v === null || v === undefined || v === '' ? '—' : String(v));

const ALL_CATEGORIES = Object.keys(VENDOR_CATEGORY_LABELS);

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, lastPage: 1 });
  const LIMIT = 12;

  useEffect(() => {
    setIsLoading(true);
    vendorsApi
      .list(page, LIMIT, search || undefined, selectedCategory || undefined)
      .then((res: PaginatedVendors) => {
        setVendors(res.data);
        setMeta({ total: res.meta.total, lastPage: res.meta.lastPage });
        setUsingMock(false);
      })
      .catch(() => {
        // Backend indisponível — usa mock filtrado localmente
        const filtered = MOCK_VENDORS.filter((v) => {
          const matchCat = !selectedCategory || v.service_category === selectedCategory;
          const q = search.toLowerCase();
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
        setUsingMock(true);
      })
      .finally(() => setIsLoading(false));
  }, [page, search, selectedCategory]);

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleCategory = (cat: string) => {
    setSelectedCategory(cat === selectedCategory ? '' : cat);
    setPage(1);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fornecedores</h1>
          <p className="text-gray-500 mt-1">
            Prestadores de serviço para casamentos — decoração, bolo, música e muito mais
          </p>
        </div>
        {usingMock && (
          <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200 font-medium">
            Dados de demonstração (backend offline)
          </span>
        )}
      </div>

      {/* Filtros de categoria */}
      <div className="flex flex-wrap gap-2 mb-4">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              selectedCategory === cat
                ? 'bg-rose-600 text-white border-rose-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-rose-300 hover:text-rose-600'
            }`}
          >
            {VENDOR_CATEGORY_LABELS[cat]}
          </button>
        ))}
        {selectedCategory && (
          <button
            onClick={() => { setSelectedCategory(''); setPage(1); }}
            className="px-3 py-1.5 rounded-full text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50"
          >
            Limpar filtro ✕
          </button>
        )}
      </div>

      {/* Busca */}
      <div className="relative mb-6 max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar por nome, cidade, e-mail..."
          className="pl-9"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Tabela */}
      <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Fornecedor</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Observações</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-gray-400">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : !vendors.length ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-gray-400">
                  Nenhum fornecedor encontrado.
                </TableCell>
              </TableRow>
            ) : (
              vendors.map((v) => (
                <TableRow key={v.id} className="hover:bg-rose-50/30 transition-colors">
                  {/* Nome + CNPJ */}
                  <TableCell>
                    <div className="font-medium text-gray-900">{v.name}</div>
                    {v.tax_id && (
                      <div className="text-xs text-gray-400 mt-0.5">{v.tax_id}</div>
                    )}
                  </TableCell>

                  {/* Categoria badge */}
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        VENDOR_CATEGORY_COLORS[v.service_category] ?? 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {VENDOR_CATEGORY_LABELS[v.service_category] ?? v.service_category}
                    </span>
                  </TableCell>

                  {/* Localização */}
                  <TableCell>
                    <div className="text-sm">
                      {v.city && v.state ? `${v.city}/${v.state}` : dash(v.city ?? v.state)}
                    </div>
                    {v.address && (
                      <div className="text-xs text-gray-400 mt-0.5 max-w-[180px] truncate">
                        {v.address}
                      </div>
                    )}
                  </TableCell>

                  {/* Contato */}
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      {v.whatsapp && (
                        <div className="flex items-center gap-1 text-gray-700">
                          <PhoneIcon className="w-3.5 h-3.5 text-green-500 shrink-0" />
                          {v.whatsapp}
                        </div>
                      )}
                      {v.email && (
                        <div className="flex items-center gap-1 text-gray-700">
                          <MailIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span className="truncate max-w-[180px]">{v.email}</span>
                        </div>
                      )}
                      {v.website && (
                        <div className="flex items-center gap-1">
                          <GlobeIcon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <a
                            href={v.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-rose-600 hover:underline truncate max-w-[180px]"
                          >
                            {v.website.replace('https://', '')}
                          </a>
                        </div>
                      )}
                    </div>
                  </TableCell>

                  {/* Observações */}
                  <TableCell>
                    <p className="text-sm text-gray-600 max-w-[240px] line-clamp-2">
                      {dash(v.notes)}
                    </p>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        v.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {v.is_active ? 'Ativo' : 'Inativo'}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      {meta.lastPage > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>
            Mostrando {((page - 1) * LIMIT) + 1}–{Math.min(page * LIMIT, meta.total)} de {meta.total}
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              Anterior
            </Button>
            <Button variant="outline" size="sm" disabled={page === meta.lastPage} onClick={() => setPage(p => p + 1)}>
              Próxima
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// src/lib/api/vendors.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export interface Vendor {
  id: number;
  name: string;
  service_category: string;
  tax_id?: string | null;
  whatsapp?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  social_links?: string | null;
  website?: string | null;
  portfolio_urls?: string | null;
  notes?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginatedVendors {
  data: Vendor[];
  meta: { total: number; page: number; limit: number; lastPage: number };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Erro desconhecido' }));
    throw new Error(error.message ?? `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const vendorsApi = {
  list: async (page = 1, limit = 12, search?: string, category?: string): Promise<PaginatedVendors> => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    const res = await fetch(`${API_URL}/vendors?${params}`);
    return handleResponse(res);
  },

  categories: async (): Promise<string[]> => {
    const res = await fetch(`${API_URL}/vendors/categories`);
    return handleResponse(res);
  },

  get: async (id: number): Promise<Vendor> => {
    const res = await fetch(`${API_URL}/vendors/${id}`);
    return handleResponse(res);
  },
};

// -----------------------------------------------------------------------
// Dados mockados — usados como fallback quando o backend não está rodando
// (útil para demo em aula)
// -----------------------------------------------------------------------
export const MOCK_VENDORS: Vendor[] = [
  {
    id: 1, name: 'Buffet Sabor & Arte', service_category: 'BUFFET',
    tax_id: '12.345.678/0001-90', whatsapp: '(48) 99811-2233', phone: '(48) 3222-1100',
    email: 'contato@saborarte.com.br', address: 'Rua das Palmeiras, 250 — Centro',
    city: 'Florianópolis', state: 'SC', website: 'https://saborarte.com.br',
    social_links: '@buffetsaborarte', portfolio_urls: null,
    notes: 'Especialista em cardápio contemporâneo e finger food. Atende até 400 pessoas.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 2, name: 'Mesa Posta Gastronomia', service_category: 'BUFFET',
    tax_id: '23.456.789/0001-12', whatsapp: '(48) 99765-4321', phone: null,
    email: 'reservas@mesaposta.com.br', address: null,
    city: 'São José', state: 'SC', website: 'https://mesaposta.com.br',
    social_links: '@mesapostaoficial', portfolio_urls: null,
    notes: 'Cozinha italiana e mediterrânea. Equipe própria de garçons.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 3, name: 'Estúdio Luz & Memória', service_category: 'FOTOGRAFIA',
    tax_id: '34.567.890/0001-34', whatsapp: '(48) 99988-7766', phone: null,
    email: 'oi@luzememoria.com', address: 'Av. Beira-Mar Norte, 1500 — sala 302',
    city: 'Florianópolis', state: 'SC', website: 'https://luzememoria.com',
    social_links: '@luzememoria.estudio', portfolio_urls: 'https://luzememoria.com/portfolio',
    notes: 'Fotografia documental e álbum impresso premium incluso.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 4, name: 'Bruno Marques Filmes', service_category: 'VIDEO',
    tax_id: null, whatsapp: '(48) 99654-3210', phone: null,
    email: 'bruno@brunomarquesfilmes.com', address: null,
    city: 'Florianópolis', state: 'SC', website: 'https://brunomarquesfilmes.com',
    social_links: '@brunomarquesfilmes', portfolio_urls: 'https://vimeo.com/brunomarquesfilmes',
    notes: 'Cinematografia para casamentos. Entrega trailer + filme longo em 4K.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 5, name: 'Florescer Decorações', service_category: 'DECORACAO',
    tax_id: '45.678.901/0001-56', whatsapp: '(48) 99876-5432', phone: '(48) 3333-2244',
    email: 'contato@florescer.com.br', address: 'Rua Lauro Linhares, 800 — Trindade',
    city: 'Florianópolis', state: 'SC', website: 'https://florescerdecoracoes.com.br',
    social_links: '@florescer.decoracoes', portfolio_urls: 'https://florescerdecoracoes.com.br/portfolio',
    notes: 'Estilo rústico-chique, boho e clássico. Flores naturais e estruturas próprias.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 6, name: 'Atelier Botânico', service_category: 'DECORACAO',
    tax_id: null, whatsapp: '(48) 99543-1122', phone: null,
    email: 'atelier@botanico.com.br', address: null,
    city: 'Florianópolis', state: 'SC', website: null,
    social_links: '@atelierbotanico.fln', portfolio_urls: null,
    notes: 'Especializado em decoração minimalista e arranjos com flores do campo.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 7, name: 'DJ Rafael Costa', service_category: 'MUSICA',
    tax_id: null, whatsapp: '(48) 99432-1098', phone: null,
    email: 'rafael@djrafaelcosta.com.br', address: null,
    city: 'Florianópolis', state: 'SC', website: 'https://djrafaelcosta.com.br',
    social_links: '@djrafaelcosta', portfolio_urls: 'https://soundcloud.com/djrafaelcosta',
    notes: 'DJ residente em eventos sociais há 12 anos. Estrutura de som e iluminação.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 8, name: 'Quarteto de Cordas Adagio', service_category: 'MUSICA',
    tax_id: null, whatsapp: '(48) 99321-0987', phone: null,
    email: 'contato@quartetoadagio.com.br', address: null,
    city: 'Florianópolis', state: 'SC', website: null,
    social_links: '@quartetoadagio', portfolio_urls: null,
    notes: 'Música clássica e contemporânea para cerimônia. Repertório customizável.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 9, name: 'Banda Acústica Folk House', service_category: 'MUSICA',
    tax_id: null, whatsapp: '(48) 99210-9876', phone: null,
    email: 'folkhouse@gmail.com', address: null,
    city: 'Balneário Camboriú', state: 'SC', website: null,
    social_links: '@folkhouseband', portfolio_urls: 'https://youtube.com/@folkhouseband',
    notes: 'Banda acústica voz + violão + cajón para recepção.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 10, name: 'Confeitaria Doce Verso', service_category: 'BOLO',
    tax_id: '56.789.012/0001-78', whatsapp: '(48) 99109-8765', phone: '(48) 3344-5566',
    email: 'pedidos@doceverso.com.br', address: 'Rua Felipe Schmidt, 420 — Centro',
    city: 'Florianópolis', state: 'SC', website: 'https://doceverso.com.br',
    social_links: '@doceverso.fln', portfolio_urls: 'https://doceverso.com.br/galeria',
    notes: 'Bolos artísticos e mesa de doces finos. Sabores autorais.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 11, name: 'Mesa de Doces da Vovó', service_category: 'BOLO',
    tax_id: null, whatsapp: '(48) 99098-7654', phone: null,
    email: 'davovo@docesdavovo.com', address: null,
    city: 'Palhoça', state: 'SC', website: null,
    social_links: '@docesdavovo', portfolio_urls: null,
    notes: 'Doces tradicionais de festa: brigadeiro, beijinho, casadinho. Mínimo 200 unidades.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 12, name: 'Open Bar Premium SC', service_category: 'BEBIDAS',
    tax_id: '67.890.123/0001-90', whatsapp: '(48) 98987-6543', phone: null,
    email: 'eventos@openbarpremium.com.br', address: null,
    city: 'Florianópolis', state: 'SC', website: 'https://openbarpremium.com.br',
    social_links: '@openbarpremium.sc', portfolio_urls: null,
    notes: 'Open bar com destilados nacionais e importados. Bartenders e estrutura completa.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 13, name: 'Cervejaria Manezinha', service_category: 'BEBIDAS',
    tax_id: null, whatsapp: '(48) 98876-5432', phone: null,
    email: 'eventos@manezinha.com.br', address: null,
    city: 'Florianópolis', state: 'SC', website: 'https://manezinha.com.br',
    social_links: '@cervejariamanezinha', portfolio_urls: null,
    notes: 'Cerveja artesanal local em chopeira ou garrafa. Atende eventos a partir de 50 pessoas.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 14, name: 'Papelaria Encantada', service_category: 'CONVITES',
    tax_id: null, whatsapp: '(48) 98765-4321', phone: null,
    email: 'pedidos@papelariaencantada.com.br', address: null,
    city: 'Florianópolis', state: 'SC', website: 'https://papelariaencantada.com.br',
    social_links: '@papelariaencantada', portfolio_urls: 'https://papelariaencantada.com.br/portfolio',
    notes: 'Convites impressos e digitais personalizados. Papéis especiais e hot-stamping.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 15, name: 'Mini Mimo Lembrancinhas', service_category: 'LEMBRANCINHAS',
    tax_id: null, whatsapp: '(48) 98654-3210', phone: null,
    email: 'contato@minimimo.com.br', address: null,
    city: 'São José', state: 'SC', website: null,
    social_links: '@minimimo.lembrancinhas', portfolio_urls: null,
    notes: 'Lembrancinhas artesanais: sabonetes, mini-velas, geleias. Pedido mínimo 80 unidades.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 16, name: 'Espaço Villa Jardins', service_category: 'ESPACO',
    tax_id: '78.901.234/0001-12', whatsapp: '(48) 98543-2109', phone: '(48) 3355-7788',
    email: 'reservas@villajardins.com.br', address: 'Rod. SC-401, km 5 — Santo Antônio de Lisboa',
    city: 'Florianópolis', state: 'SC', website: 'https://villajardins.com.br',
    social_links: '@espacovillajardins', portfolio_urls: 'https://villajardins.com.br/galeria',
    notes: 'Espaço ao ar livre com vista para a baía. Capacidade até 300 convidados.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 17, name: 'Recanto das Acácias', service_category: 'ESPACO',
    tax_id: null, whatsapp: '(48) 98432-1098', phone: null,
    email: 'eventos@recantoacacias.com.br', address: null,
    city: 'Biguaçu', state: 'SC', website: 'https://recantoacacias.com.br',
    social_links: '@recanto.acacias', portfolio_urls: null,
    notes: 'Sítio rústico para casamentos de dia. Hospedagem para padrinhos inclusa.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 18, name: 'Studio Beauty Day', service_category: 'BELEZA',
    tax_id: null, whatsapp: '(48) 98321-0987', phone: null,
    email: 'agenda@beautyday.com.br', address: 'Rua Bocaiúva, 1810 — Centro',
    city: 'Florianópolis', state: 'SC', website: 'https://beautyday.com.br',
    social_links: '@studiobeautyday', portfolio_urls: 'https://beautyday.com.br/noivas',
    notes: 'Maquiagem e penteado para noivas e madrinhas. Atendimento a domicílio.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 19, name: 'Carla Vasques Makeup', service_category: 'BELEZA',
    tax_id: null, whatsapp: '(48) 98210-9876', phone: null,
    email: 'carla@carlavasques.com', address: null,
    city: 'Florianópolis', state: 'SC', website: null,
    social_links: '@carlavasquesmakeup', portfolio_urls: 'https://instagram.com/carlavasquesmakeup',
    notes: 'Maquiadora especialista em noivas. Inclui prova de maquiagem.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 20, name: 'Celebrante Pedro Alencar', service_category: 'CELEBRANTE',
    tax_id: null, whatsapp: '(48) 98109-8765', phone: null,
    email: 'pedro@celebrantepedro.com.br', address: null,
    city: 'Florianópolis', state: 'SC', website: 'https://celebrantepedro.com.br',
    social_links: '@celebrantepedroalencar', portfolio_urls: null,
    notes: 'Cerimônias civis e simbólicas personalizadas. Roteiro construído com o casal.',
    is_active: true, created_at: '', updated_at: '',
  },
  {
    id: 21, name: 'Carro Clássico Locações', service_category: 'TRANSPORTE',
    tax_id: null, whatsapp: '(48) 97998-7654', phone: null,
    email: 'contato@carroclassico.com.br', address: null,
    city: 'Florianópolis', state: 'SC', website: null,
    social_links: '@carroclassico.fln', portfolio_urls: null,
    notes: 'Aluguel de carros antigos para a entrada da noiva. Frota com Fusca, Mustang e Beetle.',
    is_active: true, created_at: '', updated_at: '',
  },
];

export const VENDOR_CATEGORY_LABELS: Record<string, string> = {
  BUFFET: 'Buffet / Gastronomia',
  FOTOGRAFIA: 'Fotografia',
  VIDEO: 'Vídeo / Filme',
  DECORACAO: 'Decoração / Flores',
  MUSICA: 'Música / DJ',
  BOLO: 'Bolo / Doces',
  BEBIDAS: 'Bebidas / Bar',
  CONVITES: 'Convites',
  LEMBRANCINHAS: 'Lembrancinhas',
  ESPACO: 'Espaço / Local',
  BELEZA: 'Beleza / Noiva',
  CELEBRANTE: 'Celebrante',
  TRANSPORTE: 'Transporte',
};

export const VENDOR_CATEGORY_COLORS: Record<string, string> = {
  BUFFET: 'bg-orange-100 text-orange-800',
  FOTOGRAFIA: 'bg-blue-100 text-blue-800',
  VIDEO: 'bg-indigo-100 text-indigo-800',
  DECORACAO: 'bg-green-100 text-green-800',
  MUSICA: 'bg-purple-100 text-purple-800',
  BOLO: 'bg-pink-100 text-pink-800',
  BEBIDAS: 'bg-amber-100 text-amber-800',
  CONVITES: 'bg-teal-100 text-teal-800',
  LEMBRANCINHAS: 'bg-rose-100 text-rose-800',
  ESPACO: 'bg-cyan-100 text-cyan-800',
  BELEZA: 'bg-fuchsia-100 text-fuchsia-800',
  CELEBRANTE: 'bg-yellow-100 text-yellow-800',
  TRANSPORTE: 'bg-slate-100 text-slate-800',
};

export type VendorCategory = keyof typeof VENDOR_CATEGORY_LABELS;

export const getVendorOptionsByCategory = (category: VendorCategory) =>
  MOCK_VENDORS
    .filter((vendor) => vendor.service_category === category && vendor.is_active)
    .map((vendor) => ({
      value: vendor.name,
      label: vendor.city && vendor.state ? `${vendor.name} - ${vendor.city}/${vendor.state}` : vendor.name,
    }));

export const getVendorNamesByCategory = (category: VendorCategory) =>
  new Set(getVendorOptionsByCategory(category).map((option) => option.value));

export const WEDDING_VENDOR_FIELD_CONFIG = [
  { name: 'venue', label: 'Local / Espaço', category: 'ESPACO', placeholder: 'Selecione' },
  { name: 'buffet_vendor', label: 'Buffet / Gastronomia', category: 'BUFFET', placeholder: 'Selecione' },
  { name: 'photography_vendor', label: 'Fotografia', category: 'FOTOGRAFIA', placeholder: 'Selecione' },
  { name: 'video_vendor', label: 'Vídeo / Filme', category: 'VIDEO', placeholder: 'Selecione' },
  { name: 'decoracao_vendor', label: 'Decoração / Flores', category: 'DECORACAO', placeholder: 'Selecione' },
  { name: 'musica_vendor', label: 'Música / DJ', category: 'MUSICA', placeholder: 'Selecione' },
  { name: 'bolo_vendor', label: 'Bolo / Doces', category: 'BOLO', placeholder: 'Selecione' },
  { name: 'bebidas_vendor', label: 'Bebidas / Bar', category: 'BEBIDAS', placeholder: 'Selecione' },
  { name: 'convites_vendor', label: 'Convites', category: 'CONVITES', placeholder: 'Selecione' },
  { name: 'lembrancinhas_vendor', label: 'Lembrancinhas', category: 'LEMBRANCINHAS', placeholder: 'Selecione' },
  { name: 'beleza_vendor', label: 'Beleza / Noiva', category: 'BELEZA', placeholder: 'Selecione' },
  { name: 'celebrante_vendor', label: 'Celebrante', category: 'CELEBRANTE', placeholder: 'Selecione' },
  { name: 'transporte_vendor', label: 'Transporte', category: 'TRANSPORTE', placeholder: 'Selecione' },
] as const;

export const ESPACO_VENDOR_OPTIONS = getVendorOptionsByCategory('ESPACO');

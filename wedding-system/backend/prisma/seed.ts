// prisma/seed.ts
// -----------------------------------------------------------------------------
// Seed do banco — popula a tabela `vendors` com dados mockados realistas
// para a região de Florianópolis/SC.
//
// Rodar com:  npm run db:seed
// (re-roda sem duplicar porque limpamos a tabela antes)
// -----------------------------------------------------------------------------
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const vendors: Prisma.VendorCreateInput[] = [
  // -------------------- BUFFET / GASTRONOMIA --------------------
  {
    name: 'Buffet Sabor & Arte',
    service_category: 'BUFFET',
    tax_id: '12.345.678/0001-90',
    whatsapp: '(48) 99811-2233',
    phone: '(48) 3222-1100',
    email: 'contato@saborarte.com.br',
    address: 'Rua das Palmeiras, 250 — Centro',
    city: 'Florianópolis',
    state: 'SC',
    website: 'https://saborarte.com.br',
    social_links: '@buffetsaborarte | facebook.com/saborarte',
    portfolio_urls: 'https://drive.google.com/drive/folders/saborarte-cardapio',
    notes: 'Especialista em cardápio contemporâneo e finger food. Atende até 400 pessoas.',
    is_active: true,
  },
  {
    name: 'Mesa Posta Gastronomia',
    service_category: 'BUFFET',
    tax_id: '23.456.789/0001-12',
    whatsapp: '(48) 99765-4321',
    email: 'reservas@mesaposta.com.br',
    city: 'São José',
    state: 'SC',
    website: 'https://mesaposta.com.br',
    social_links: '@mesapostaoficial',
    notes: 'Cozinha italiana e mediterrânea. Equipe própria de garçons.',
    is_active: true,
  },

  // -------------------- FOTOGRAFIA / VÍDEO --------------------
  {
    name: 'Estúdio Luz & Memória',
    service_category: 'FOTOGRAFIA',
    tax_id: '34.567.890/0001-34',
    whatsapp: '(48) 99988-7766',
    email: 'oi@luzememoria.com',
    address: 'Av. Beira-Mar Norte, 1500 — sala 302',
    city: 'Florianópolis',
    state: 'SC',
    website: 'https://luzememoria.com',
    social_links: '@luzememoria.estudio | instagram.com/luzememoria.estudio',
    portfolio_urls: 'https://luzememoria.com/portfolio',
    notes: 'Fotografia documental e álbum impresso premium incluso.',
    is_active: true,
  },
  {
    name: 'Bruno Marques Filmes',
    service_category: 'VIDEO',
    whatsapp: '(48) 99654-3210',
    email: 'bruno@brunomarquesfilmes.com',
    city: 'Florianópolis',
    state: 'SC',
    website: 'https://brunomarquesfilmes.com',
    social_links: '@brunomarquesfilmes',
    portfolio_urls: 'https://vimeo.com/brunomarquesfilmes',
    notes: 'Cinematografia para casamentos. Entrega trailer + filme longo em 4K.',
    is_active: true,
  },

  // -------------------- DECORAÇÃO / FLORES --------------------
  {
    name: 'Florescer Decorações',
    service_category: 'DECORACAO',
    tax_id: '45.678.901/0001-56',
    whatsapp: '(48) 99876-5432',
    phone: '(48) 3333-2244',
    email: 'contato@florescer.com.br',
    address: 'Rua Lauro Linhares, 800 — Trindade',
    city: 'Florianópolis',
    state: 'SC',
    website: 'https://florescerdecoracoes.com.br',
    social_links: '@florescer.decoracoes',
    portfolio_urls: 'https://florescerdecoracoes.com.br/portfolio',
    notes: 'Estilo rústico-chique, boho e clássico. Flores naturais e estruturas próprias.',
    is_active: true,
  },
  {
    name: 'Atelier Botânico',
    service_category: 'DECORACAO',
    whatsapp: '(48) 99543-1122',
    email: 'atelier@botanico.com.br',
    city: 'Florianópolis',
    state: 'SC',
    social_links: '@atelierbotanico.fln',
    notes: 'Especializado em decoração minimalista e arranjos com flores do campo.',
    is_active: true,
  },

  // -------------------- MÚSICA / DJ --------------------
  {
    name: 'DJ Rafael Costa',
    service_category: 'MUSICA',
    whatsapp: '(48) 99432-1098',
    email: 'rafael@djrafaelcosta.com.br',
    city: 'Florianópolis',
    state: 'SC',
    website: 'https://djrafaelcosta.com.br',
    social_links: '@djrafaelcosta',
    portfolio_urls: 'https://soundcloud.com/djrafaelcosta',
    notes: 'DJ residente em eventos sociais há 12 anos. Estrutura de som e iluminação.',
    is_active: true,
  },
  {
    name: 'Quarteto de Cordas Adagio',
    service_category: 'MUSICA',
    whatsapp: '(48) 99321-0987',
    email: 'contato@quartetoadagio.com.br',
    city: 'Florianópolis',
    state: 'SC',
    social_links: '@quartetoadagio',
    notes: 'Música clássica e contemporânea para cerimônia. Repertório customizável.',
    is_active: true,
  },
  {
    name: 'Banda Acústica Folk House',
    service_category: 'MUSICA',
    whatsapp: '(48) 99210-9876',
    email: 'folkhouse@gmail.com',
    city: 'Balneário Camboriú',
    state: 'SC',
    social_links: '@folkhouseband',
    portfolio_urls: 'https://youtube.com/@folkhouseband',
    notes: 'Banda acústica voz + violão + cajón para recepção.',
    is_active: true,
  },

  // -------------------- BOLO / DOCES --------------------
  {
    name: 'Confeitaria Doce Verso',
    service_category: 'BOLO',
    tax_id: '56.789.012/0001-78',
    whatsapp: '(48) 99109-8765',
    phone: '(48) 3344-5566',
    email: 'pedidos@doceverso.com.br',
    address: 'Rua Felipe Schmidt, 420 — Centro',
    city: 'Florianópolis',
    state: 'SC',
    website: 'https://doceverso.com.br',
    social_links: '@doceverso.fln',
    portfolio_urls: 'https://doceverso.com.br/galeria',
    notes: 'Bolos artísticos e mesa de doces finos. Sabores autorais.',
    is_active: true,
  },
  {
    name: 'Mesa de Doces da Vovó',
    service_category: 'BOLO',
    whatsapp: '(48) 99098-7654',
    email: 'davovo@docesdavovo.com',
    city: 'Palhoça',
    state: 'SC',
    social_links: '@docesdavovo',
    notes: 'Doces tradicionais de festa: brigadeiro, beijinho, casadinho. Mínimo 200 unidades.',
    is_active: true,
  },

  // -------------------- BEBIDAS / BAR --------------------
  {
    name: 'Open Bar Premium SC',
    service_category: 'BEBIDAS',
    tax_id: '67.890.123/0001-90',
    whatsapp: '(48) 98987-6543',
    email: 'eventos@openbarpremium.com.br',
    city: 'Florianópolis',
    state: 'SC',
    website: 'https://openbarpremium.com.br',
    social_links: '@openbarpremium.sc',
    notes: 'Open bar com destilados nacionais e importados. Bartenders e estrutura completa.',
    is_active: true,
  },
  {
    name: 'Cervejaria Manezinha',
    service_category: 'BEBIDAS',
    whatsapp: '(48) 98876-5432',
    email: 'eventos@manezinha.com.br',
    city: 'Florianópolis',
    state: 'SC',
    website: 'https://manezinha.com.br',
    social_links: '@cervejariamanezinha',
    notes: 'Cerveja artesanal local em chopeira ou garrafa. Atende eventos a partir de 50 pessoas.',
    is_active: true,
  },

  // -------------------- LEMBRANCINHAS / CONVITES --------------------
  {
    name: 'Papelaria Encantada',
    service_category: 'CONVITES',
    whatsapp: '(48) 98765-4321',
    email: 'pedidos@papelariaencantada.com.br',
    city: 'Florianópolis',
    state: 'SC',
    website: 'https://papelariaencantada.com.br',
    social_links: '@papelariaencantada',
    portfolio_urls: 'https://papelariaencantada.com.br/portfolio',
    notes: 'Convites impressos e digitais personalizados. Papéis especiais e hot-stamping.',
    is_active: true,
  },
  {
    name: 'Mini Mimo Lembrancinhas',
    service_category: 'LEMBRANCINHAS',
    whatsapp: '(48) 98654-3210',
    email: 'contato@minimimo.com.br',
    city: 'São José',
    state: 'SC',
    social_links: '@minimimo.lembrancinhas',
    notes: 'Lembrancinhas artesanais: sabonetes, mini-velas, geleias. Pedido mínimo 80 unidades.',
    is_active: true,
  },

  // -------------------- ESPAÇO / LOCAÇÃO --------------------
  {
    name: 'Espaço Villa Jardins',
    service_category: 'ESPACO',
    tax_id: '78.901.234/0001-12',
    whatsapp: '(48) 98543-2109',
    phone: '(48) 3355-7788',
    email: 'reservas@villajardins.com.br',
    address: 'Rod. SC-401, km 5 — Santo Antônio de Lisboa',
    city: 'Florianópolis',
    state: 'SC',
    website: 'https://villajardins.com.br',
    social_links: '@espacovillajardins',
    portfolio_urls: 'https://villajardins.com.br/galeria',
    notes: 'Espaço ao ar livre com vista para a baía. Capacidade até 300 convidados.',
    is_active: true,
  },
  {
    name: 'Recanto das Acácias',
    service_category: 'ESPACO',
    whatsapp: '(48) 98432-1098',
    email: 'eventos@recantoacacias.com.br',
    city: 'Biguaçu',
    state: 'SC',
    website: 'https://recantoacacias.com.br',
    social_links: '@recanto.acacias',
    notes: 'Sítio rústico para casamentos de dia. Hospedagem para padrinhos inclusa.',
    is_active: true,
  },

  // -------------------- BELEZA / NOIVA --------------------
  {
    name: 'Studio Beauty Day',
    service_category: 'BELEZA',
    whatsapp: '(48) 98321-0987',
    email: 'agenda@beautyday.com.br',
    address: 'Rua Bocaiúva, 1810 — Centro',
    city: 'Florianópolis',
    state: 'SC',
    website: 'https://beautyday.com.br',
    social_links: '@studiobeautyday',
    portfolio_urls: 'https://beautyday.com.br/noivas',
    notes: 'Maquiagem e penteado para noivas e madrinhas. Atendimento a domicílio.',
    is_active: true,
  },
  {
    name: 'Carla Vasques Makeup',
    service_category: 'BELEZA',
    whatsapp: '(48) 98210-9876',
    email: 'carla@carlavasques.com',
    city: 'Florianópolis',
    state: 'SC',
    social_links: '@carlavasquesmakeup',
    portfolio_urls: 'https://instagram.com/carlavasquesmakeup',
    notes: 'Maquiadora especialista em noivas. Inclui prova de maquiagem.',
    is_active: true,
  },

  // -------------------- CELEBRANTE --------------------
  {
    name: 'Celebrante Pedro Alencar',
    service_category: 'CELEBRANTE',
    whatsapp: '(48) 98109-8765',
    email: 'pedro@celebrantepedro.com.br',
    city: 'Florianópolis',
    state: 'SC',
    website: 'https://celebrantepedro.com.br',
    social_links: '@celebrantepedroalencar',
    notes: 'Cerimônias civis e simbólicas personalizadas. Roteiro construído com o casal.',
    is_active: true,
  },

  // -------------------- TRANSPORTE --------------------
  {
    name: 'Carro Clássico Locações',
    service_category: 'TRANSPORTE',
    whatsapp: '(48) 97998-7654',
    email: 'contato@carroclassico.com.br',
    city: 'Florianópolis',
    state: 'SC',
    social_links: '@carroclassico.fln',
    notes: 'Aluguel de carros antigos para a entrada da noiva. Frota com Fusca, Mustang e Beetle.',
    is_active: true,
  },

  // -------------------- INATIVO (exemplo) --------------------
  {
    name: 'Doces da Tia Bia (encerrado)',
    service_category: 'BOLO',
    email: 'tiabia@oldemail.com',
    city: 'Florianópolis',
    state: 'SC',
    notes: 'Fornecedor descontinuou as atividades em 2025. Mantido no histórico.',
    is_active: false,
  },
];

async function main() {
  console.log('🌱 Iniciando seed de fornecedores...');

  // limpa para evitar duplicação ao re-rodar
  const deleted = await prisma.vendor.deleteMany();
  console.log(`   ${deleted.count} fornecedores antigos removidos.`);

  for (const data of vendors) {
    const v = await prisma.vendor.create({ data });
    console.log(`   ✓ ${v.name}  (${v.service_category})`);
  }

  console.log(`✅ Seed concluído: ${vendors.length} fornecedores criados.`);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

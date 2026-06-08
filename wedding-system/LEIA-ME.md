# Sistema de Gestão de Casamentos — Jani do Vale Cerimonial

## Estrutura do Projeto

```
wedding-system/
├── backend/          → NestJS + Prisma + PostgreSQL
├── frontend/         → Next.js 14 + shadcn/ui + TanStack Query
└── documento-sistema-casamentos.docx
```

---

## 🆕 Novidades desta versão

### 1) Wizard de 2 etapas no cadastro de casamento
A tela de "Novo Casamento" foi dividida em duas etapas com stepper visual:
- **Etapa 1 — Casal**: nome da noiva, nome do noivo, e-mail e telefone. **Todos obrigatórios.**
- **Etapa 2 — Infos do Evento**: data, local, cidade, UF, convidados, orçamento, status, observações. **Todos opcionais** — podem ficar em branco e ser preenchidos depois via edição.

A mesma estrutura é usada na tela de edição.

### 2) Entidade Fornecedores (`vendors`)
Novo CRUD completo no backend, com 22 fornecedores mockados via seed cobrindo todas as categorias típicas de um casamento (buffet, fotografia, vídeo, decoração, música/DJ, bolo, bebidas, convites, lembrancinhas, espaços, beleza, celebrante, transporte).

### 3) Ajustes no backend para suportar as duas mudanças
- DTO `CreateWeddingDto` com `@IsOptional()` em todos os campos da etapa 2.
- Schema Prisma com os campos do evento como nullable.
- Migration que faz `ALTER TABLE` removendo NOT NULL e cria a tabela `vendors`.
- Service tratando `wedding_date` opcional e ordenação com `nulls: 'last'`.

---

## Como Rodar

**Observação sobre o ambiente / comandos**

- Os comandos abaixo estão escritos na sintaxe típica de Linux/macOS (por exemplo, `cp`).
- No Windows você pode usar PowerShell, `cmd` ou subsistemas Unix (WSL/Git Bash). Exemplos úteis em Windows:
  - PowerShell: `Copy-Item .env.example .env`
  - cmd.exe: `copy .env.example .env`
  - Se preferir um ambiente Linux-like no Windows, use WSL ou Git Bash.
  - Se o PowerShell bloquear execução de scripts (`npm.ps1`), execute o `npm` via `npm.cmd` ou use o prompt de comando (`cmd`), por exemplo: `npm.cmd install`.

- Os comandos do Docker são os mesmos em PowerShell/cmd (por exemplo, `docker run ...`).

### Backend

```bash
cd backend

# 1. Instalar dependências
npm install

# 2. Configurar banco de dados
cp .env.example .env
# Edite .env com sua string de conexão PostgreSQL local

# 3. Gerar client Prisma e rodar migration
npm run db:generate
npm run db:migrate

# 4. Popular o banco com fornecedores mockados (22 vendors)
npm run db:seed

# 5. Iniciar servidor (porta 3001)
npm run start:dev
```

> Swagger disponível em: http://localhost:3001/api/docs

### Frontend

```bash
cd frontend

# 1. Instalar dependências
npm install
```

> Nota: se surgir erro de "Module not found" para `@radix-ui/react-label` (usado pelo formulário), instale explicitamente dentro da pasta `frontend`:
> `npm install @radix-ui/react-label`

```bash
# 2. Configurar variável de ambiente
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3001/api

# 3. Iniciar (porta 3000)
npm run dev
```

> Acesse: http://localhost:3000

---

## Banco de Dados Local (PostgreSQL)

Se não tiver PostgreSQL instalado localmente, a forma mais fácil é via Docker:

```bash
docker run --name wedding-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=wedding_db \
  -p 5432:5432 \
  -d postgres:16
```

String de conexão para o `.env`:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/wedding_db"
```

---

## CRUD de Casamentos — Rotas da API

| Método | Rota              | Descrição              |
|--------|-------------------|------------------------|
| POST   | /api/weddings     | Cadastrar casamento (só casal é obrigatório) |
| GET    | /api/weddings     | Listar (com paginação) |
| GET    | /api/weddings/:id | Buscar por ID          |
| PUT    | /api/weddings/:id | Atualizar              |
| DELETE | /api/weddings/:id | Excluir                |

### Exemplo de body mínimo para POST /api/weddings

Como agora só os 4 campos do casal são obrigatórios, este body é suficiente:

```json
{
  "bride_name": "Maria Silva",
  "groom_name": "João Souza",
  "couple_email": "maria.joao@email.com",
  "couple_phone": "(48) 99999-0000"
}
```

Body completo (com a etapa 2 preenchida):

```json
{
  "bride_name": "Maria Silva",
  "groom_name": "João Souza",
  "couple_email": "maria.joao@email.com",
  "couple_phone": "(48) 99999-0000",
  "wedding_date": "2026-12-15",
  "venue": "Espaço Villa Jardins",
  "city": "Florianópolis",
  "state": "SC",
  "estimated_guests": 150,
  "total_budget": 80000.00,
  "status": "PLANNING",
  "notes": "Cerimônia ao ar livre, tema provençal."
}
```

---

## CRUD de Fornecedores — Rotas da API

| Método | Rota                       | Descrição                                |
|--------|----------------------------|------------------------------------------|
| POST   | /api/vendors               | Cadastrar fornecedor                     |
| GET    | /api/vendors               | Listar (com `page`, `limit`, `search`, `category`) |
| GET    | /api/vendors/categories    | Listar categorias distintas em uso       |
| GET    | /api/vendors/:id           | Buscar por ID                            |
| PUT    | /api/vendors/:id           | Atualizar                                |
| DELETE | /api/vendors/:id           | Excluir                                  |

### Campos do fornecedor

Obrigatórios: `name`, `service_category`.

Opcionais: `tax_id` (CNPJ/CPF), `whatsapp`, `phone`, `email`, `address`, `city`, `state`, `social_links`, `website`, `portfolio_urls`, `notes`, `is_active` (default `true`).

### Categorias mockadas no seed

`BUFFET`, `FOTOGRAFIA`, `VIDEO`, `DECORACAO`, `MUSICA`, `BOLO`, `BEBIDAS`, `CONVITES`, `LEMBRANCINHAS`, `ESPACO`, `BELEZA`, `CELEBRANTE`, `TRANSPORTE`.

### Exemplos rápidos

```bash
# listar buffets
curl "http://localhost:3001/api/vendors?category=BUFFET"

# buscar por nome ou cidade
curl "http://localhost:3001/api/vendors?search=florianopolis"

# listar categorias em uso
curl "http://localhost:3001/api/vendors/categories"
```

---

## Dependências para instalar (shadcn/ui)

Após `npm install` no frontend, inicialize o shadcn/ui (caso ainda não tenha sido feito):

```bash
cd frontend
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input textarea select table alert-dialog badge form
```

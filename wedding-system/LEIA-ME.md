# Sistema de Gestão de Casamentos — Jani do Vale Cerimonial

## Estrutura do Projeto

```
wedding-system/
├── backend/          → NestJS + Prisma + PostgreSQL
├── frontend/         → Next.js 14 + shadcn/ui + TanStack Query
└── documento-sistema-casamentos.docx
```

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

# 4. Iniciar servidor (porta 3001)
npm run start:dev
```

> Swagger disponível em: http://localhost:3001/api/docs

### Frontend

```bash
cd frontend

# 1. Instalar dependências
npm install

Nota: se surgir erro de "Module not found" para `@radix-ui/react-label` (usado pelo formulário), instale explicitamente dentro da pasta `frontend`:

```bash
npm install @radix-ui/react-label
```

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
| POST   | /api/weddings     | Cadastrar casamento    |
| GET    | /api/weddings     | Listar (com paginação) |
| GET    | /api/weddings/:id | Buscar por ID          |
| PUT    | /api/weddings/:id | Atualizar              |
| DELETE | /api/weddings/:id | Excluir                |

---

## Dependências para instalar (shadcn/ui)

Após `npm install` no frontend, inicialize o shadcn/ui:

```bash
cd frontend
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input textarea select table alert-dialog badge form
```

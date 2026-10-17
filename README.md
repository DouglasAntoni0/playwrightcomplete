# Zombie+ — testes E2E com Playwright

[![CI](https://github.com/DouglasAntoni0/playwrightcomplete/actions/workflows/playwright.yml/badge.svg)](https://github.com/DouglasAntoni0/playwrightcomplete/actions/workflows/playwright.yml)

Automação de login administrativo, leads, filmes e séries do Zombie+, com JavaScript, Playwright, fixtures, actions e preparação de dados por API/PostgreSQL. Aplicação e exercícios utilizados nos estudos de Playwright do ecossistema QAx.

## Escopo atual

| Domínio | Cenários versionados |
| --- | ---: |
| Login | 6 |
| Leads | 6 |
| Filmes | 5 |
| Séries | 5 |
| Total | 22 |

A configuração habilita **somente Chromium**. Outros navegadores e emulação de dispositivos são possibilidades de evolução.

## Pré-requisitos e clone

Node.js 22.13+ na linha 22, npm, Docker/Compose e portas 3000, 3333, 5432 e 16543 livres. Faker 10 também aceita Node 20.19+ ou 24+.

```bash
git clone https://github.com/DouglasAntoni0/playwrightcomplete.git
cd playwrightcomplete
docker compose -f apps/zombieplus/docker-compose.yml up -d
```

O Compose prepara PostgreSQL e pgAdmin; os processos de API e Web rodam em terminais próprios. Todos os blocos abaixo começam na raiz do clone.

## API — terminal 1

PowerShell:

```powershell
Copy-Item apps/zombieplus/api/.env.example apps/zombieplus/api/.env
```

No Bash, use `cp` com os mesmos caminhos. Confira a conexão do banco no arquivo e execute:

```bash
cd apps/zombieplus/api
npm install
npx sequelize db:migrate
npx sequelize db:seed:all
npm run dev
```

API: `http://localhost:3333`. Aguarde o PostgreSQL iniciar antes das migrations. O seed prepara os dados esperados pela aplicação; use banco local de estudos.

## Web — terminal 2

```bash
cd apps/zombieplus/web
npm install
npm run dev
```

Web: `http://localhost:3000`. pgAdmin: `http://localhost:16543`.

## Automação — terminal 3

Copie `.env.example` para `.env` na raiz, usando `Copy-Item` no PowerShell ou `cp` no Bash. A alternativa é copiar `projects/zombieplus/.env.example` para `projects/zombieplus/.env`; esse arquivo tem precedência quando ambos existem.

```bash
cd projects/zombieplus
npm install
npx playwright install chromium
npx playwright test
```

Comandos adicionais, nessa mesma pasta:

```bash
npx playwright test tests/e2e/login.spec.js
npx playwright test --project=chromium
npx playwright show-report
```

## Configuração

| Variável | Uso |
| --- | --- |
| `BASE_URL` | Web local, normalmente `http://localhost:3000` |
| `BASE_API`, `API_URL` | API local, normalmente `http://localhost:3333` |
| `DB_HOST`, `DB_DATABASE`, `DB_USER`, `DB_PASSWORD`, `DB_PORT` | Banco usado pelos helpers de teste |
| `PGSSLMODE` | `disable` no Compose local |
| `TOKEN` | Opcional; habilita o reporter Tesults quando preenchido |

A API usa seu próprio `.env`, incluindo `DB_NAME`, `DB_PASS` e `DB_DIALECT`. Ele e o ambiente de testes devem apontar para o mesmo banco. Os helpers executam limpeza de massa nesse banco.

## Evidências e CI

O Playwright gera HTML em `projects/zombieplus/playwright-report/` e resultados em `projects/zombieplus/test-results/`. Capturas e vídeos são retidos em falha; o trace `on-first-retry` depende de uma repetição, habilitada no CI. Sem `TOKEN`, permanecem ativos os reporters de terminal e HTML.

O workflow executa em push/pull request para `main`: inicia PostgreSQL, instala API/Web/testes, aplica migrations e seed, instala Chromium, aguarda os serviços e executa a suíte. O HTML é enviado como artefato `playwright-report` por sete dias. Consulte a execução pelo badge para conhecer o resultado atual.

## Organização

- `apps/zombieplus/`: sistema sob teste e Compose.
- `projects/zombieplus/tests/e2e/`: specs por domínio.
- `projects/zombieplus/tests/support/`: actions, API, fixtures e banco.
- `.github/workflows/playwright.yml`: integração contínua.

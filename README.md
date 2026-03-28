# 🧟‍♂️ ZombiePlus - Automação E2E com Playwright 🎭

[![Playwright Tests](https://github.com/DouglasAntoni0/playwrightcomplete/actions/workflows/playwright.yml/badge.svg)](https://github.com/DouglasAntoni0/playwrightcomplete/actions/workflows/playwright.yml)
[![Node.js Version](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-Enabled-blue.svg)](https://playwright.dev/)

Bem-vindo ao repositório de testes automatizados do **ZombiePlus**! 🎬🧟‍♀️ 

Este projeto foi desenvolvido com o objetivo de criar uma suíte de testes End-to-End (E2E) robusta, rápida e confiável para uma aplicação web de filmes e séries de zumbis, aplicando as melhores práticas do mercado de Qualidade de Software (QA).

## 🚀 Sobre o Projeto

O foco principal aqui não é apenas "automatizar cliques", mas construir uma arquitetura de testes escalável. Para evitar o temido *flaky test* (testes intermitentes) e lentidão, o projeto manipula o estado da aplicação diretamente via **Banco de Dados (PostgreSQL)** e **Requests de API**, garantindo que cada cenário de teste seja independente e tenha suas pré-condições atendidas em milissegundos.

## 🛠️ Arquitetura e Padrões Aplicados

- **App Actions (Custom Page Object Model):** Em vez do POM tradicional, utilizamos o padrão de *Actions* (`tests/support/actions/`) e *Components*, isolando a lógica de interação com a UI e tornando os testes mais semânticos e fáceis de dar manutenção.
- **Data Preparation via API & DB:** Criação e limpeza de massa de dados diretamente no banco de dados (`tests/support/database.js`) e via API (`tests/support/api/index.js`) antes da execução da UI.
- **Geração de Dados Dinâmicos:** Uso da biblioteca Faker.js para criar dados de teste aleatórios e únicos.
- **Continuous Integration (CI):** Pipeline configurada com GitHub Actions para rodar os testes automaticamente a cada push.
- **Relatórios:** Configurado com `playwright-tesults-reporter` para visualização clara dos resultados.

## 💻 Tecnologias Utilizadas

- **[Playwright](https://playwright.dev/):** Framework principal para automação web.
- **Node.js & JavaScript:** Base do projeto.
- **Faker.js:** Para geração de dados fictícios.
- **Dotenv:** Para gerenciamento seguro das variáveis de ambiente.
- **PostgreSQL (pg):** Para conexão direta e queries no banco de dados da aplicação.
- **Docker & Docker Compose:** Para subir o banco de dados (Postgres) e o gerenciador (pgAdmin) isolados em uma rede customizada (Skynet 🤖).

## 🧪 O que foi testado?

A suíte cobre os principais fluxos de negócio do ZombiePlus:
- 🚪 **Login:** Fluxos de autenticação, sucesso, senhas inválidas e bloqueios.
- 📬 **Leads:** Captação de e-mails na landing page (validações de campos obrigatórios e duplicidade).
- 🎬 **Filmes (Movies):** Cadastro, listagem, remoção e validação de regras de negócio de filmes.
- 📺 **Séries (TV Shows):** Fluxos completos de CRUD para séries de TV.

## ⚙️ Como executar na sua máquina

### Pré-requisitos
- Node.js (v18 ou superior)
- Docker e Docker Compose instalados

### 1. Clonando o repositório
```bash
git clone [https://github.com/DouglasAntoni0/playwrightcomplete.git](https://github.com/DouglasAntoni0/playwrightcomplete.git)
cd playwrightcomplete

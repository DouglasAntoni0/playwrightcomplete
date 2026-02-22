# 🧟‍♂️ Zombie+ | Framework de Automação E2E e API com Playwright

<div align="center">
  <img alt="Playwright" src="https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
  <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
</div>

## 📌 Sobre o Projeto

Este repositório é o resultado do meu desenvolvimento e evolução no curso avançado **"Playwright - Zombie Edition"**. 

O objetivo aqui vai muito além de testes básicos: o foco é aplicar **Engenharia de Qualidade** em uma aplicação web completa (Zombie+), uma plataforma de streaming de vídeo. O framework foi construído para validar o fluxo de ponta a ponta (E2E), garantindo a integridade desde a interface (React) até a camada de serviços (API em Node.js) e o banco de dados (PostgreSQL).

## 🚀 Diferenciais Técnicos e Arquitetura Aplicada

Para que os testes sejam rápidos, estáveis e escaláveis, apliquei os seguintes conceitos e padrões de projeto exigidos pelo mercado:

- **Custom Fixtures:** Criação de fixtures personalizadas no Playwright para encapsular a inicialização de páginas e massa de dados, deixando os arquivos de teste (`.spec`) limpos e focados apenas na regra de negócio.
- **Data Preparation via API/DB:** Consumo de rotas de API e queries diretas no banco de dados para preparar cenários (ex: criar um usuário via API antes de testar o login na UI), evitando a lentidão de fazer setups inteiramente pela interface.
- **Network Interception (Mocking):** Interceptação de rotas e manipulação de respostas de rede para simular cenários de erro do servidor (HTTP 500, etc) sem precisar derrubar o backend real.
- **Padrão Actions/Page Objects:** Abstração dos seletores e ações de tela para facilitar a manutenção contínua do projeto.
- **Orquestração com Docker:** Banco de dados e serviços locais subindo via `docker-compose`, garantindo que o ambiente de testes seja imutável e fácil de reproduzir em qualquer máquina.

## 📂 Estrutura do Ecossistema

O repositório abriga tanto a aplicação (SUT - System Under Test) quanto o framework de automação:

```text
📦 playwrightcomplete
 ┣ 📂 apps/zombieplus           # Código fonte da aplicação alvo
 ┃ ┣ 📂 api                     # Backend RESTful (Node.js/Express)
 ┃ ┣ 📂 web                     # Frontend (React)
 ┃ ┗ 📜 docker-compose.yml      # Infra e Banco de Dados (Postgres/Redis)
 ┣ 📂 projects/zombieplus       # Framework de Automação (Playwright)
 ┃ ┣ 📂 tests                   # Suítes de testes E2E e de Integração
 ┃ ┣ 📂 support                 # Custom Fixtures, Actions e Conexões com Banco
 ┃ ┗ 📜 playwright.config.js    # Configurações globais, retries, traces e workers

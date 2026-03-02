import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'; // Padrão import chique!
import { LandingPage } from '../pages/LandingPage';
import { Toast } from '../pages/components';

let landingPage;
let toast;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
  toast = new Toast(page);
});

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await toast.haveText(message);
});

test('não deve cadastrar quando um email ja existe', async ({ page, request }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  // Criando o lead direto na API (Jogada de sênior!)
  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  });

  expect(newLead.ok()).toBeTruthy();

  // Tentando cadastrar de novo pela interface
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.';
  await toast.haveText(message);
});

test('não deve cadastrar com email incorreto', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Douglas Antonio', 'dougla.com');

  await landingPage.alertHaveText('Email incorreto');
});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', 'douglas@zombieplus.com');

  await landingPage.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Douglas Antonio', '');

  await landingPage.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', '');

  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);
});
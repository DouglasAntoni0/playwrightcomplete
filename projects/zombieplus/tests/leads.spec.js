// @ts-check
import { test, expect } from '@playwright/test';
import { LandingPage } from './pages/LandingPage';


test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.visit();

  await landingPage.openLeadModal();

  await landingPage.submitLeadForm('Douglas Antonio', 'douglas@zombieplus.com');

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';

  await landingPage.toastHaveText(message);
});

test('não deve cadastrar com email incorreto', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.visit();

  await landingPage.openLeadModal();

  await landingPage.submitLeadForm('Douglas Antonio', 'dougla.com');

  await expect(page.locator('.alert')).toHaveText('Email incorreto');
});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.visit();

  await landingPage.openLeadModal();

  await landingPage.submitLeadForm('', 'douglas@zombieplus.com');

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório');
});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.visit();

  await landingPage.openLeadModal();

  await landingPage.submitLeadForm('Douglas Antonio', '');

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório');
});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.visit();

  await landingPage.openLeadModal();

  await landingPage.submitLeadForm('', '');

  await expect(page.locator('.alert')).toContainText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);
});



// @ts-check
import { test, expect } from '@playwright/test';
import { time } from 'console';

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', {name: /Aperte o play/}).click();

  expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera');

  await page.locator('#name').fill('Douglas Antonio');

  await page.getByPlaceholder('Seu email principal').fill('douglas@zombieplus.com');

  await page.getByTestId('modal')
   .getByText('Quero entrar na fila!').click();

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

  await expect(page.locator('.toast')).toHaveText(message)

  await expect(page.locator('.toast')).toBeHidden({timeout: 5000});

});

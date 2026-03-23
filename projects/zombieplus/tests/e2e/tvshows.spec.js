import { expect, test } from '../support';
import data from '../support/fixtures/tvshows.json';
import { executeSQL } from '../support/database';

test('deve cadastrar uma nova série', async ({ page }) => {
  const tvshow = data.create;

  await executeSQL(`DELETE FROM tvshows WHERE title = '${tvshow.title}';`);

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

  await page.tvshows.create(
    tvshow.title,
    tvshow.overview,
    tvshow.company,
    tvshow.release_year,
    tvshow.seasons,
    tvshow.cover,
    tvshow.featured
  );

  await page.popup.haveText(`A série '${tvshow.title}' foi adicionada ao catálogo.`);
});

test('deve poder remover uma série', async ({ page, request }) => {
  const tvshow = data.to_remove;
  await executeSQL(`DELETE FROM tvshows WHERE title = '${tvshow.title}';`);
  
  await request.api.postTvshow(tvshow); 
  
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

  await page.tvshows.remove(tvshow.title);

  await page.popup.haveText('Série removida com sucesso.');
});

test('não deve cadastrar quando o titulo já existe', async ({ page, request }) => {
  const tvshow = data.duplicate;
  await executeSQL(`DELETE FROM tvshows WHERE title = '${tvshow.title}';`);

  await request.api.postTvshow(tvshow);

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

  await page.tvshows.create(
    tvshow.title,
    tvshow.overview,
    tvshow.company,
    tvshow.release_year,
    tvshow.seasons,
    tvshow.cover,
    tvshow.featured
  );

  await page.popup.haveText(`O título '${tvshow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`);
});

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

  await page.tvshows.goForm();
  await page.tvshows.submit();

  await page.tvshows.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório (apenas números)',
  ]);
});

test('deve realizar busca pelo termo zumbi', async ({ page, request }) => {
  const tvshows = data.search;

  for (const tvshow of tvshows.data) {
    await executeSQL(`DELETE FROM tvshows WHERE title = '${tvshow.title}';`);
  }

  for (const tvshow of tvshows.data) {
    await request.api.postTvshow(tvshow);
  }

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
  await page.tvshows.search(tvshows.input);

  await page.tvshows.tableHave(tvshows.outputs);
});
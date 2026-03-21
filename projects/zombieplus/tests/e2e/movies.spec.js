import { expect, test } from '../support';
import data from '../support/fixtures/movies.json';
import { executeSQL } from '../support/database'; 

test('deve cadastrar um novo filme', async ({ page }) => {
  const movie = data.create;

  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}';`);

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

  await page.movies.create(
    movie.title,
    movie.overview,
    movie.company,
    movie.release_year,
    movie.cover,
    movie.featured
  );

  await page.toast.haveText('UhullCadastro realizado com sucesso!');
});

test('não deve cadastrar quando o titulo já existe', async ({ page, request }) => {
  const movie = data.duplicate;
  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}';`);

  await request.api.postMovie(movie);

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
  
  await page.movies.create(
    movie.title,
    movie.overview,
    movie.company,
    movie.release_year,
    movie.cover,
    movie.featured
  );

  await page.popup.haveText(`O título 'Dawn of the Dead' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`);
});

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

  await page.movies.goForm();
  await page.movies.submit();

  await page.movies.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
  ]);
});
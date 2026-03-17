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

  await page.toast.haveText('Oops!Este conteúdo já encontra-se cadastrado no catálogo');
});

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

  await page.movies.goForm();
  await page.movies.submit();

  await page.movies.alertHaveText([
    'Por favor, informe o título.',
    'Por favor, informe a sinopse.',
    'Por favor, informe a empresa distribuidora.',
    'Por favor, informe o ano de lançamento.',
  ]);
});
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MoviesPage } from '../pages/MoviesPage';
import { Toast } from '../pages/components';

import data from '../support/fixtures/movies.json';

const { executeSQL } = require('../support/database');

let loginPage;
let moviesPage;
let toast;

test.beforeEach(({ page }) => {
  loginPage = new LoginPage(page);
  moviesPage = new MoviesPage(page);
  toast = new Toast(page);
});

test('deve cadastrar um novo filme', async ({ page }) => {
  const movie = data.create;

  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}';`)

  await loginPage.visit();
  await loginPage.submit('admin@zombieplus.com', 'pwd123');
  await moviesPage.isLoggedIn();

  await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year);

  await toast.haveText('UhullCadastro realizado com sucesso!');
});
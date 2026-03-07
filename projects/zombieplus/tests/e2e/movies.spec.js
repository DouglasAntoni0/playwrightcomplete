import { test, expect } from '@playwright/test';
const data = require('../support/fixtures/movies.json');
import { LoginPage } from '../pages/LoginPage';
import { MoviesPage } from '../pages/MoviesPage';
import { Toast } from '../pages/components';

let loginPage;
let moviesPage;
let toast;

test.beforeEach(({ page }) => {
  loginPage = new LoginPage(page);
  moviesPage = new MoviesPage(page);
  toast = new Toast(page);
});

test('deve cadastrar um novo filme', async ({ page }) => {

  const movie = data.dawn_of_the_dead_1978

  await loginPage.visit();
  await loginPage.submit('admin@zombieplus.com', 'pwd123');
  await moviesPage.isLoggedIn();

  await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year);

  await toast.containText('UhullCadastro realizado com sucesso!');
});
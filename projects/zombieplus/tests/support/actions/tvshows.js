import { expect } from '@playwright/test';

export class TvShows {
  constructor(page) {
    this.page = page;
  }

  async goForm() {
    await this.page.locator('a[href$="tvshows"]').click();
    await this.page.locator('a[href$="register"]').click();
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Cadastrar' }).click();
  }


  async create(title, overview, company, release_year, seasons, cover, featured) {
    await this.goForm();

    await this.page.locator('#title').fill(title);
    await this.page.getByLabel('Sinopse').fill(overview);

    await this.page.locator('#select_company_id .react-select__dropdown-indicator').click();
    await this.page.locator('.react-select__option').filter({ hasText: company }).click();

    if (release_year) {
      await this.page.locator('#select_year .react-select__dropdown-indicator').click();
      await this.page.locator('.react-select__option').filter({ hasText: release_year.toString() }).click();
    }

    if (seasons) {
        await this.page.locator('#seasons').fill(seasons.toString());
    }

    if (cover) {
      await this.page.locator('input[name=cover]').setInputFiles(`tests/support/fixtures${cover}`);
    }

    if (featured) {
      await this.page.locator('.featured .react-switch').click();
    }

    await this.submit();
  }

  async search(target) {
    await this.page.locator('a[href$="tvshows"]').click();
    await this.page.getByPlaceholder('Busque pelo nome').fill(target);
    await this.page.click('.actions button');
  }

  async tableHave(content) {
     const rows = this.page.getByRole('row');
     await expect(rows).toContainText(content);
  }

  async alertHaveText(target) {
    await expect(this.page.locator('.alert')).toHaveText(target);
  }

  async remove(title) {
    await this.page.locator('a[href$="tvshows"]').click();
    await this.page.getByRole('row', { name: title }).getByRole('button').click();
    await this.page.click('.confirm-removal');
  }
}
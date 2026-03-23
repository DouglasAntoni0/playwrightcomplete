import { expect } from '@playwright/test';

export class Popup {
  constructor(page) {
    this.page = page;
    this.toast = page.locator('.toast'); 
  }

  async haveText(message) {
    const element = this.page.locator('.swal2-html-container');
    await expect(element).toHaveText(message);
  }

}
import { expect } from '@playwright/test';

export class Toast {
  constructor(page) {
    this.page = page;
    this.toast = page.locator('.toast'); 
  }

  async containText(message) {
    await expect(this.toast).toContainText(message);
    await expect(this.toast).not.toBeVisible({ timeout: 5000 });
  }

  async haveText(message) {
    await expect(this.toast).toHaveText(message);
    await expect(this.toast).not.toBeVisible({ timeout: 5000 });
  }
}
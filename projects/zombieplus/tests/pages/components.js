const { expect } = require('@playwright/test');

export class Toast {
  constructor(page) {
    this.page = page;
  }

  // Ensinando o truque novo pro Toast!
  async containText(message) {
    const toast = this.page.locator('.toast');

    await expect(toast).toContainText(message);
    await expect(toast).not.toBeVisible({ timeout: 5000 });
  }

  // Mantendo o truque antigo intacto
  async haveText(message) {
    const toast = this.page.locator('.toast');

    await expect(toast).toHaveText(message);
    await expect(toast).not.toBeVisible({ timeout: 5000 });
  }
}
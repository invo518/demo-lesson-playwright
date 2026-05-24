import { Locator, Page, expect } from '@playwright/test'

export class BasePage {
  readonly page: Page
  readonly navFooter: Locator
  readonly langBtnRu: Locator
  readonly langBtnEn: Locator

  constructor(page: Page) {
    this.page = page
    this.langBtnRu = page.locator('[data-name="language-ru"]')
    this.langBtnEn = page.locator('[data-name="language-en"]')
    this.navFooter = page.locator('.navigate-wrapper')
  }

  async checkFooterVisible(): Promise<void> {
    await expect(this.navFooter).toBeVisible()
  }

  async switchToRussian(): Promise<void> {
    await this.langBtnRu.click()
    await expect(this.navFooter).toContainText('Политика приватности')
  }

  async switchToEnglish(): Promise<void> {
    await this.langBtnEn.click()
    await expect(this.navFooter).toContainText('Privacy Policy')
    await expect(this.navFooter).toContainText('Cookie Policy')
    await expect(this.navFooter).toContainText('Terms of Service')
  }
}

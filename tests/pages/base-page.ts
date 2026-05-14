import { Locator, Page } from '@playwright/test'

export class BasePage {
  readonly page: Page
  readonly footer: Locator
  readonly langBtnRu: Locator
  readonly langBtEn: Locator
  readonly navFooter: Locator

  constructor(page: Page) {
    this.page = page
    this.footer = page.locator('.Footer')
    this.langBtnRu = this.footer.locator('.language__button').nth(1)
    this.langBtEn = this.footer.locator('.language__button').nth(0)
    this.navFooter = this.footer.locator('.nav-footer')
  }
}

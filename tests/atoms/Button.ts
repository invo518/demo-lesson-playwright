import { expect, Locator } from '@playwright/test'

export class Button {
  readonly locator: Locator

  constructor(buttonLocator: Locator) {
    this.locator = buttonLocator
  }

  async click(): Promise<void> {
    await this.locator.click()
  }
  async verifyEnabled(shouldBeEnabled: boolean = true): Promise<void> {
    await expect(this.locator).toBeEnabled({ enabled: shouldBeEnabled })
  }
  async verifyDisable(shouldBeDisable: boolean): Promise<void> {
    await expect(this.locator).toBeEnabled({ enabled: shouldBeDisable })
  }
}

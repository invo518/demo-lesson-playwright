import { expect, Locator } from '@playwright/test'

export class Input {
  readonly inputLocator: Locator

  constructor(inputLocator: Locator) {
    this.inputLocator = inputLocator
  }
  async fill(value: string) {
    await this.inputLocator.fill(value)
  }
  async beVisible() {
    await expect(this.inputLocator).toBeVisible()
  }
}

import { expect, Locator } from '@playwright/test'

export class Input {
  readonly locator: Locator

  constructor(inputLocator: Locator) {
    this.locator = inputLocator
  }
  async checkInputField(): Promise<void> {
    await expect(this.locator).toBeVisible()
  }

  async fill(value: string): Promise<void> {
    await this.locator.fill(value)
  }

  async clear(): Promise<void> {
    await this.locator.clear()
  }

  async getValue(): Promise<string> {
    return await this.locator.inputValue()
  }
}

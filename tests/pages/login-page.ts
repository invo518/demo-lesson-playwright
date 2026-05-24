import { expect, Locator, Page } from '@playwright/test'
import { OrderPage } from './order-page'
import { SERVICE_URL } from '../../config/env-data'
import { BasePage } from './base-page'

export class LoginPage extends BasePage {
  readonly signInButton: Locator
  readonly usernameField: Locator
  readonly passwordField: Locator
  readonly incorrectPopup: Locator

  constructor(page: Page) {
    super(page)
    this.signInButton = page.getByTestId('signIn-button')
    this.usernameField = page.getByTestId('username-input')
    this.passwordField = page.getByTestId('password-input')
    this.incorrectPopup = page.locator('.error-popup__title')
  }
  async open(): Promise<void> {
    await this.page.goto(SERVICE_URL)
  }

  async signIn(username: string, password: string): Promise<OrderPage> {
    await this.usernameField.fill(username)
    await this.passwordField.fill(password)
    await this.signInButton.click()
    return new OrderPage(this.page)
  }

  async verifyLoginFormElements(): Promise<void> {
    await expect(this.usernameField).toBeVisible()
    await expect(this.passwordField).toBeVisible()
    await expect(this.signInButton).toBeVisible()
  }
  async checkInvalidLoginError(): Promise<void> {
    await expect(this.incorrectPopup).toBeVisible()
    await expect(this.incorrectPopup).toHaveText('Incorrect credentials')
  }
}

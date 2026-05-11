import { expect, Locator, Page } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { SERVICE_URL } from '../../config/env-data'

export class OrderPage {
  readonly page: Page
  readonly title: Locator
  readonly statusButton: Locator
  readonly createOrderButt: Locator
  readonly nameInput: Locator
  readonly phoneInput: Locator
  readonly commentInput: Locator
  readonly confirmationPopup: Locator
  readonly logOutBut: Locator
  readonly orderTrack: Locator

  constructor(page: Page) {
    this.page = page
    this.title = page.locator('h2')
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.createOrderButt = page.getByTestId('createOrder-button')
    this.nameInput = page.getByTestId('username-input')
    this.phoneInput = page.getByTestId('phone-input')
    this.commentInput = page.getByTestId('comment-input')
    this.confirmationPopup = page.getByTestId('orderSuccessfullyCreated-popup')
    this.logOutBut = page.getByTestId('logout-button')

    this.orderTrack = page.getByTestId('searchOrder-popup')
  }
  async checkInnerComponents(): Promise<void> {
    await expect(this.title).toBeVisible()
    await expect(this.statusButton).toBeVisible()
    await expect(this.createOrderButt).toBeVisible()
    await expect(this.nameInput).toBeVisible()
    await expect(this.phoneInput).toBeVisible()
    await expect(this.commentInput).toBeVisible()
    await this.checkCreateOrderButtonEnabled(true)
    await expect(this.confirmationPopup).toBeVisible()
  }
  async createOrder(): Promise<void> {
    await this.nameInput.fill(faker.person.firstName())
    await this.phoneInput.fill(faker.phone.number())
    await this.commentInput.fill(faker.lorem.sentence(5))
    await this.createOrderButt.click()
    await expect(this.confirmationPopup).toBeVisible()
  }
  async checkCreateOrderButtonEnabled(enabled: boolean): Promise<void> {
    if (enabled) {
      await expect(this.createOrderButt).toBeEnabled()
    } else {
      await expect(this.createOrderButt).toBeDisabled()
    }
  }

  async statusButtonClick(): Promise<void> {
    await this.statusButton.click()
    await expect(this.statusButton).toBeVisible()
    await expect(this.orderTrack).toBeDisabled()
  }
}

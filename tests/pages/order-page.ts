import { expect, Locator, Page } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Fields input'
import { NotFoundPage } from './order-not found-page'
import { OrderDetailsPage } from './order-details-page'

export class OrderPage {
  readonly page: Page
  readonly title: Locator
  readonly statusButton: Button
  readonly createOrderButt: Button
  readonly nameInput: Input
  readonly phoneInput: Input
  readonly commentInput: Input
  readonly confirmationPopup: Locator
  readonly logOutBut: Button
  readonly orderTrack: Locator
  //
  protected readonly searchPopup: Locator
  readonly searchInput: Locator
  readonly searchButton: Button

  constructor(page: Page) {
    this.page = page
    this.title = page.locator('h2')
    this.statusButton = new Button(page.getByTestId('openStatusPopup-button'))
    this.createOrderButt = new Button(page.getByTestId('createOrder-button'))
    this.nameInput = new Input(page.getByTestId('username-input'))
    this.phoneInput = new Input(page.getByTestId('phone-input'))
    this.commentInput = new Input(page.getByTestId('comment-input'))
    this.confirmationPopup = page.getByTestId('orderSuccessfullyCreated-popup')
    this.logOutBut = new Button(page.getByTestId('logout-button'))

    this.orderTrack = page.getByTestId('searchOrder-popup')
    //
    this.searchPopup = page.getByTestId('searchOrder-popup')
    this.searchInput = this.searchPopup.getByTestId('searchOrder-input')
    this.searchButton = new Button(this.searchPopup.getByTestId('searchOrder-submitButton'))
  }
  async checkInnerComponents(): Promise<void> {
    await expect(this.title).toBeVisible()
    await this.statusButton.checkVisible(true)
    await this.createOrderButt.checkVisible(true)
    await this.nameInput.beVisible()
    await this.phoneInput.beVisible()
    await this.commentInput.beVisible()
    await this.checkCreateOrderButtonEnabled(true)
  }
  async createOrder(): Promise<void> {
    await this.nameInput.fill(faker.person.firstName())
    await this.phoneInput.fill(faker.phone.number())
    await this.commentInput.fill(faker.lorem.sentence(5))
    await this.createOrderButt.click()
    await expect(this.confirmationPopup).toBeVisible()
  }
  async checkOrderNotFound(): Promise<NotFoundPage> {
    await this.statusButton.click()
    await this.searchInput.fill('0')
    await this.searchButton.click()
    return new NotFoundPage(this.page)
  }
  async checkOrderFound(id: number): Promise<OrderDetailsPage> {
    await this.statusButton.click()
    await this.searchInput.fill(`${id}`)
    await this.searchButton.click()
    return new OrderDetailsPage(this.page)
  }
  async checkCreateOrderButtonEnabled(enabled: boolean): Promise<void> {
    if (enabled) {
      await this.createOrderButt.checkEnabled(true)
    } else {
      await this.createOrderButt.checkEnabled(false)
    }
  }

  async statusButtonClick(): Promise<void> {
    await this.statusButton.click()
    await this.statusButton.checkVisible(true)
    await expect(this.orderTrack).toBeDisabled()
  }
}

import { expect, Locator, Page } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'
import { NotFoundPage } from './order-not found-page'
import { OrderDetailsPage } from './order-details-page'
import { BasePage } from './base-page'
import { LoginPage } from './login-page'

export class OrderPage extends BasePage {
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
    super(page)
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
    await this.statusButton.verifyEnabled(true)
    await this.createOrderButt.verifyEnabled(true)
    await this.nameInput.checkInputField()
    await this.phoneInput.checkInputField()
    await this.commentInput.checkInputField()
    await this.checkCreateOrderButtonEnabled(true)
    await this.checkFooterVisible()
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
      await this.createOrderButt.verifyEnabled(true)
    } else {
      await this.createOrderButt.verifyDisable(false)
    }
  }

  async statusButtonClick(): Promise<void> {
    await this.statusButton.click()
    await expect(this.searchPopup).toBeVisible()
  }
  async logout(): Promise<LoginPage> {
    await this.logOutBut.click()
    return new LoginPage(this.page)
  }
}

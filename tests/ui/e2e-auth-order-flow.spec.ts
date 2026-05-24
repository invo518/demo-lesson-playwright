import { test } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { faker } from '@faker-js/faker'

test('Login test+order page components check', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.verifyLoginFormElements()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.checkInnerComponents()
})
test('Verify error message appears on invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.verifyLoginFormElements()
  await loginPage.signIn('er', PASSWORD)
  await loginPage.checkInvalidLoginError()
})

test('Create order test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()

  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.createOrder()
})

test('Validation test on order creation', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()

  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)

  await orderPage.nameInput.fill('')
  await orderPage.phoneInput.fill(faker.phone.number())
  await orderPage.checkCreateOrderButtonEnabled(false)

  await orderPage.nameInput.fill('1')
  await orderPage.phoneInput.fill(faker.phone.number())
  await orderPage.checkCreateOrderButtonEnabled(false)

  await orderPage.nameInput.fill('2')
  await orderPage.phoneInput.fill(faker.phone.number())
  await orderPage.checkCreateOrderButtonEnabled(false)

  await orderPage.nameInput.fill('')
  await orderPage.phoneInput.fill('')
  await orderPage.checkCreateOrderButtonEnabled(false)

  await orderPage.nameInput.fill(faker.person.firstName())
  await orderPage.phoneInput.fill('')
  await orderPage.checkCreateOrderButtonEnabled(false)

  await orderPage.nameInput.fill(faker.person.firstName())
  await orderPage.phoneInput.fill('1')
  await orderPage.checkCreateOrderButtonEnabled(false)

  await orderPage.nameInput.fill(faker.person.firstName())
  await orderPage.phoneInput.fill('6')
  await orderPage.checkCreateOrderButtonEnabled(false)

  await orderPage.nameInput.fill(faker.person.firstName())
  await orderPage.phoneInput.fill(faker.phone.number())
  await orderPage.checkCreateOrderButtonEnabled(true)
})

test('Logout test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.checkInnerComponents()
  await orderPage.logout()
})

test('Status test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.statusButtonClick()
})
test('can switch from EN to RU', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.switchToRussian()
  await loginPage.switchToEnglish()
})

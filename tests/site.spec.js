import { test, expect } from '@playwright/test'

test('loads without console errors or horizontal overflow', async ({ page }) => {
  const errors=[]
  page.on('console', msg => { if(msg.type()==='error') errors.push(msg.text()) })
  page.on('pageerror', err => errors.push(err.message))
  await page.goto('/')
  await expect(page).toHaveTitle(/شركة عوض الرقمية/)
  await expect(page.getByRole('heading', { name: /مشاريع رقمية عربية/ })).toBeVisible()
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
  expect(overflow).toBe(false)
  expect(errors).toEqual([])
})

test('live MasarFlow links are present', async ({ page }) => {
  await page.goto('/')
  const links = page.locator('a[href="https://masarflow-arabic.netlify.app"]')
  await expect(links.first()).toBeVisible()
  expect(await links.count()).toBeGreaterThanOrEqual(2)
})

test('lead scoring demo works', async ({ page }) => {
  await page.goto('/#lead-demo')
  await page.selectOption('#budget', '40')
  await page.selectOption('#timing', '35')
  await page.check('#decision')
  await page.getByRole('button', { name: 'احسب درجة التأهيل' }).click()
  await expect(page.locator('#score')).toHaveText('100/100')
  await expect(page.locator('#scoreLabel')).toContainText('أولوية عالية')
})

test('lead form is Netlify-ready', async ({ page }) => {
  await page.goto('/#contact')
  const form = page.locator('form[name="project-lead"]')
  await expect(form).toHaveAttribute('data-netlify', 'true')
  await expect(form.locator('input[name="form-name"]')).toHaveValue('project-lead')
  await expect(form.getByRole('button', { name: 'إرسال طلب المشروع' })).toBeVisible()
})

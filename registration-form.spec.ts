import { test, expect } from '@playwright/test';

const BASE_URL = 'YOUR_FORM_URL_HERE'; // Replace with your actual deployed Registration Form URL

test.describe('Registration Form Automation', () => {
  test('Flow A: Negative - Missing Last Name', async ({ page }) => {
    await page.goto(BASE_URL);
    console.log('Page URL:', page.url());
    console.log('Page Title:', await page.title());
    await page.fill('input[name="firstName"]', 'John');
    // Last Name skipped
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="phone"]', '+1-202-555-0199');
    await page.check('input[value="Male"]');
    await page.selectOption('select[name="country"]', 'United States');
    await page.selectOption('select[name="state"]', 'California');
    await page.selectOption('select[name="city"]', 'Los Angeles');
    await page.fill('input[name="password"]', 'Password@123');
    await page.fill('input[name="confirmPassword"]', 'Password@123');
    await page.check('input[name="terms"]');

    await page.click('button[type="submit"]');
    // Validation: Should show error for missing Last Name
    await expect(page.getByText('Last Name is required')).toBeVisible();
    await page.screenshot({ path: 'error-state.png' });
  });

  test('Flow B: Positive - All Fields Valid', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('input[name="firstName"]', 'Jane');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', 'jane.doe@gmail.com');
    await page.fill('input[name="phone"]', '+91-9876543210');
    await page.check('input[value="Female"]');
    await page.selectOption('select[name="country"]', 'India');
    await page.selectOption('select[name="state"]', 'Maharashtra');
    await page.selectOption('select[name="city"]', 'Mumbai');
    await page.fill('input[name="password"]', 'StrongPass2025!');
    await page.fill('input[name="confirmPassword"]', 'StrongPass2025!');
    await page.check('input[name="terms"]');

    await page.click('button[type="submit"]');
    // Validation: Should see success alert
    await expect(page.getByText('Registration Successful!')).toBeVisible();
    await page.screenshot({ path: 'success-state.png' });
  });

  test('Flow C: Form Logic Validation', async ({ page }) => {
    await page.goto(BASE_URL);

    // Test cascading dropdown for Country → State → City
    await page.selectOption('select[name="country"]', 'France');
    await expect(page.getByText('Île-de-France')).toBeVisible();
    await page.selectOption('select[name="state"]', 'Île-de-France');
    await expect(page.getByText('Paris')).toBeVisible();

    // Password strength
    await page.fill('input[name="password"]', '123456');
    await expect(page.getByText('Weak')).toBeVisible();
    await page.fill('input[name="password"]', 'StrongPass2025!');
    await expect(page.getByText('Strong')).toBeVisible();

    // Wrong Confirm Password
    await page.fill('input[name="confirmPassword"]', 'WrongPass');
    await expect(page.getByText('Passwords do not match')).toBeVisible();

    // Submit button should be disabled until all fields valid
    await expect(page.getByRole('button', { name: /submit/i })).toBeDisabled();

    // Now fill all required fields
    await page.fill('input[name="firstName"]', 'Anna');
    await page.fill('input[name="lastName"]', 'Smith');
    await page.fill('input[name="email"]', 'anna.smith@mail.com');
    await page.fill('input[name="phone"]', '+33-123456789');
    await page.check('input[value="Female"]');
    await page.fill('input[name="confirmPassword"]', 'StrongPass2025!');
    await page.check('input[name="terms"]');
    await expect(page.getByRole('button', { name: /submit/i })).toBeEnabled();
  });
});

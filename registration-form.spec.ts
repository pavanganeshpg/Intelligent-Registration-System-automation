import { test, expect } from '@playwright/test';

const BASE_URL = 'https://pavanganeshpg.github.io/Intelligent-Registration-System-automation/';

test.describe('Registration Form Automation', () => {
  test('Flow A: Negative - Missing Last Name', async ({ page }) => {
    await page.goto(BASE_URL);
    console.log('Page URL:', page.url());
    console.log('Page Title:', await page.title());
    
    await page.fill('#firstName', 'John');
    // Last Name skipped intentionally
    await page.fill('#email', 'john@example.com');
    await page.fill('#phone', '+1-202-555-0199');
    await page.check('#genderMale');
    await page.selectOption('#country', 'US');
    await page.waitForTimeout(500); // Wait for states to load
    await page.selectOption('#state', 'CA');
    await page.waitForTimeout(500); // Wait for cities to load
    await page.selectOption('#city', 'Los Angeles');
    await page.fill('#password', 'Password@123');
    await page.fill('#confirmPassword', 'Password@123');
    await page.check('#terms');

    await page.click('#submitBtn');
    
    // Validation: Should show error for missing Last Name
    await expect(page.locator('#lastNameError')).toBeVisible();
    await expect(page.locator('#lastNameError')).toContainText('required');
    await page.screenshot({ path: 'error-state.png', fullPage: true });
    console.log('✅ Flow A passed: Error correctly shown for missing Last Name');
  });

  test('Flow B: Positive - All Fields Valid', async ({ page }) => {
    await page.goto(BASE_URL);
    
    await page.fill('#firstName', 'Jane');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'jane.doe@gmail.com');
    await page.fill('#phone', '+91-9876543210');
    await page.check('#genderFemale');
    await page.selectOption('#country', 'IN');
    await page.waitForTimeout(500);
    await page.selectOption('#state', 'MH');
    await page.waitForTimeout(500);
    await page.selectOption('#city', 'Mumbai');
    await page.fill('#password', 'StrongPass2025!');
    await page.fill('#confirmPassword', 'StrongPass2025!');
    await page.check('#terms');

    await page.click('#submitBtn');
    
    // Validation: Should see success alert
    await expect(page.locator('.alert-success')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.alert-success')).toContainText('Registration Successful');
    await page.screenshot({ path: 'success-state.png', fullPage: true });
    console.log('✅ Flow B passed: Registration successful');
  });

  test('Flow C: Form Logic Validation', async ({ page }) => {
    await page.goto(BASE_URL);

    // Test cascading dropdown for Country → State → City
    console.log('Testing Country → State → City cascade...');
    await page.selectOption('#country', 'FR');
    await page.waitForTimeout(500);
    
    // Check that state dropdown is now enabled and contains options
    await expect(page.locator('#state')).toBeEnabled();
    const stateOptions = await page.locator('#state option').count();
    expect(stateOptions).toBeGreaterThan(1); // Should have more than just "Select State"
    
    await page.selectOption('#state', 'IDF');
    await page.waitForTimeout(500);
    
    // Check that city dropdown is now enabled and contains options
    await expect(page.locator('#city')).toBeEnabled();
    const cityOptions = await page.locator('#city option').count();
    expect(cityOptions).toBeGreaterThan(1); // Should have more than just "Select City"
    console.log('✅ Cascading dropdowns working correctly');

    // Password strength
    console.log('Testing password strength meter...');
    await page.fill('#password', '123456');
    await expect(page.locator('#passwordStrengthText')).toContainText('Weak');
    
    await page.fill('#password', 'StrongPass2025!');
    await expect(page.locator('#passwordStrengthText')).toContainText('Strong');
    console.log('✅ Password strength meter working correctly');

    // Wrong Confirm Password
    console.log('Testing password mismatch validation...');
    await page.fill('#confirmPassword', 'WrongPass');
    await page.locator('#confirmPassword').blur();
    await expect(page.locator('#confirmPasswordError')).toBeVisible();
    await expect(page.locator('#confirmPasswordError')).toContainText('do not match');
    console.log('✅ Password mismatch validation working correctly');

    // Submit button should be disabled until all fields valid
    console.log('Testing submit button state...');
    await expect(page.locator('#submitBtn')).toBeDisabled();

    // Now fill all required fields correctly
    await page.fill('#firstName', 'Anna');
    await page.fill('#lastName', 'Smith');
    await page.fill('#email', 'anna.smith@gmail.com');
    await page.fill('#phone', '+33-123456789');
    await page.check('#genderFemale');
    await page.fill('#confirmPassword', 'StrongPass2025!');
    await page.check('#terms');
    
    await page.waitForTimeout(500);
    await expect(page.locator('#submitBtn')).toBeEnabled();
    console.log('✅ Submit button enabled after all validations passed');
    
    await page.screenshot({ path: 'form-logic-validation.png', fullPage: true });
    console.log('✅ Flow C passed: All form logic validations working correctly');
  });
});

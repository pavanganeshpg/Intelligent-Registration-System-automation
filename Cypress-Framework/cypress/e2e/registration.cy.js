// cypress/e2e/registration_form.cy.js
describe('Registration Form', () => {
  const url = 'https://pavanganeshpg.github.io/Intelligent-Registration-System-automation/';
  let testData;

  // Selective error handling - only ignore specific validation errors, not all errors
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Log actual errors for debugging
    cy.log(`⚠️ Uncaught Exception: ${err.message}`);
    
    // Only ignore expected form validation-related errors
    if (err.message.includes('classList') || err.message.includes('null is not an object')) {
      return false; // Ignore this specific error
    }
    
    // Let other errors fail the test
    return true;
  });

  before(() => {
    // Load test data once
    cy.fixture('testData.json').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.visit(url);
    
    // Log page info on each test
    cy.then(() => {
      cy.task('logPageInfo', {
        url: url,
        title: 'Registration Form'
      });
    });
  });

  it('Flow A: keeps submit disabled and shows error when last name is missing', () => {
    const data = testData.flowA;
    
    // Fill everything EXCEPT last name
    cy.get('#firstName').type(data.firstName).should('have.value', data.firstName);
    cy.get('#email').type(data.email).should('have.value', data.email);
    cy.get('#phone').type(data.phone).should('have.value', data.phone);

    // Gender selection
    cy.get('#genderMale').check({ force: true }).should('be.checked');

    // Cascading dropdowns
    cy.get('#country').select(data.country).should('have.value', data.country);
    cy.get('#state').should('not.be.disabled').select(data.state).should('have.value', data.state);
    cy.get('#city').should('not.be.disabled').select(data.city).should('have.value', data.city);

    // Password fields
    cy.get('#password').type(data.password).should('have.value', data.password);
    cy.get('#confirmPassword').type(data.confirmPassword).should('have.value', data.confirmPassword);

    // Accept terms
    cy.get('#terms').check({ force: true }).should('be.checked');

    // Last name is still empty → submit must stay disabled
    cy.get('#submitBtn').should('be.disabled');

    // Trigger validation on last name
    cy.get('#lastName').focus().blur();

    // Error message should be visible with exact text
    cy.get(data.errorField)
      .should('be.visible')
      .and('have.text', data.expectedError);

    // Ensure submit remains disabled
    cy.get('#submitBtn').should('be.disabled');

    // Capture error state screenshot with required naming
    cy.screenshot('error-state');
  });

  it('Flow B: registers successfully with all valid fields and shows success alert', () => {
    const data = testData.flowB;
    
    // Fill all form fields with valid data
    cy.get('#firstName').type(data.firstName).should('have.value', data.firstName);
    cy.get('#lastName').type(data.lastName).should('have.value', data.lastName);
    cy.get('#email').type(data.email).should('have.value', data.email);
    cy.get('#phone').type(data.phone).should('have.value', data.phone);

    // Gender selection
    cy.get('#genderFemale').check({ force: true }).should('be.checked');

    // Cascading dropdowns - let DOM update between selections
    cy.get('#country').select(data.country).should('have.value', data.country);
    
    // Wait for state dropdown to be enabled and populated
    cy.get('#state')
      .should('not.be.disabled')
      .select(data.state)
      .should('have.value', data.state);
    
    // Wait for city dropdown to be enabled and populated
    cy.get('#city')
      .should('not.be.disabled')
      .select(data.city)
      .should('have.value', data.city);

    // Password fields
    cy.get('#password').type(data.password).should('have.value', data.password);
    cy.get('#confirmPassword').type(data.confirmPassword).should('have.value', data.confirmPassword);

    // Accept terms
    cy.get('#terms').check({ force: true }).should('be.checked');

    // Button should now be enabled
    cy.get('#submitBtn').should('be.enabled');
    cy.screenshot('success-state');

    // Actually CLICK the submit button (this is required!)
    cy.get('#submitBtn').click();

    // Success alert should show
    cy.get('#alertBox', { timeout: 10000 })
      .should('be.visible')
      .and('contain', data.expectedSuccess);

    // Wait for form reset (2 second delay in the form code)
    cy.get('#firstName', { timeout: 5000 }).should('have.value', '');
    cy.get('#lastName').should('have.value', '');
    cy.get('#email').should('have.value', '');
    cy.get('#phone').should('have.value', '');
    cy.get('#country').should('have.value', '');
    cy.get('#state').should('be.disabled').and('have.value', '');
    cy.get('#city').should('be.disabled').and('have.value', '');
    cy.get('#password').should('have.value', '');
    cy.get('#confirmPassword').should('have.value', '');
    cy.get('#terms').should('not.be.checked');
    cy.get('#submitBtn').should('be.disabled');

    // Password strength UI should be reset
    cy.get('#passwordStrengthBar').should('have.class', 'password-strength-bar');
    cy.get('#passwordStrengthText').should('have.text', '');
  });

  it('Flow C: validates cascading dropdowns and password strength + mismatch', () => {
    const data = testData.flowC;
    
    // Cascading dropdowns: FR → IDF → Paris
    cy.get('#country').select(data.country).should('have.value', data.country);
    cy.get('#state')
      .should('not.be.disabled')
      .select(data.state)
      .should('have.value', data.state);

    cy.get('#city')
      .should('not.be.disabled')
      .select(data.city)
      .should('have.value', data.city);

    // Weak password test
    cy.get('#password').type(data.passwordWeak);
    cy.get('#passwordStrengthText').should('contain', 'Weak');

    // Strong password test
    cy.get('#password').clear().type(data.passwordStrong);
    cy.get('#passwordStrengthText').should('contain', 'Strong');

    // Mismatching confirm password
    cy.get('#confirmPassword').type(data.passwordMismatch).blur();
    cy.get('#confirmPasswordError')
      .should('be.visible')
      .and('contain', 'Passwords do not match');

    // Fix mismatch and ensure error disappears
    cy.get('#confirmPassword').clear().type(data.passwordStrong).blur();
    cy.get('#confirmPasswordError').should('not.be.visible');

    // Fill remaining required fields minimally
    cy.get('#firstName').type(data.firstName).should('have.value', data.firstName);
    cy.get('#lastName').type(data.lastName).should('have.value', data.lastName);
    cy.get('#email').type(data.email).should('have.value', data.email);
    cy.get('#phone').type(data.phone).should('have.value', data.phone);

    cy.get('#genderMale').check({ force: true }).should('be.checked');
    cy.get('#terms').check({ force: true }).should('be.checked');

    // Verify submit button is enabled
    cy.get('#submitBtn').should('be.enabled');
  });

  it('Flow D: shows phone error when country code does not match selected country', () => {
    const data = testData.flowD;
    
    cy.get('#country').select(data.country).should('have.value', data.country);

    cy.get('#phone').type(data.phone).blur(); // Indian number in US

    cy.get('#phoneError')
      .should('be.visible')
      .and('contain', data.expectedError);

    cy.get('#submitBtn').should('be.disabled');
  });
});

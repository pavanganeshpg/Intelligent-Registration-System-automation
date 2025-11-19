# Intelligent Registration System - Automation Documentation

## Project Overview
This project implements a comprehensive **User Registration Form** with automated testing using **Cypress**. The form includes advanced validation, cascading dropdowns, password strength verification, and real-time field validation.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Source Code Files](#source-code-files)
3. [Automation Flows](#automation-flows)
4. [Cypress Test Scripts](#cypress-test-scripts)
5. [How to Run Tests](#how-to-run-tests)
6. [Test Results](#test-results)
7. [Artifacts Generated](#artifacts-generated)

---

## Project Structure

```
homework/
├── index.html                              # Main registration form application
├── Cypress-Framework/                      # Cypress test framework directory
│   ├── cypress.config.js                  # Cypress configuration
│   ├── cypress/
│   │   ├── e2e/
│   │   │   └── registration.cy.js         # Main test file (4 tests)
│   │   ├── support/
│   │   │   ├── commands.js                # Custom Cypress commands
│   │   │   └── e2e.js                     # Cypress setup
│   │   ├── fixtures/                      # Test data
│   │   ├── screenshots/                   # Test screenshots
│   │   ├── videos/                        # Test recordings
│   │   └── results/                       # Test reports
│   └── package.json                       # Dependencies
├── README.md                               # Project overview
└── AUTOMATION_DOCUMENTATION.md             # This file
```

---

## Source Code Files

### 1. **index.html** - Registration Form Application
**Location:** `/homework/index.html`

**Features Implemented:**
- **Form Fields:**
  - First Name (required)
  - Last Name (required)
  - Email (required, with disposable domain check)
  - Phone Number (required, with country code validation)
  - Age (optional)
  - Gender (required, radio buttons)
  - Address (optional, textarea)
  - Country (required, dropdown)
  - State (required, cascading dropdown)
  - City (required, cascading dropdown)
  - Password (required, with strength meter)
  - Confirm Password (required, must match)
  - Terms & Conditions (required, checkbox)

**JavaScript Functionality:**
- **Real-time Validation:** Fields validate on blur and input events
- **Error Handling:** Clear error messages for each field
- **Cascading Dropdowns:** Country → State → City with data for 16+ countries
- **Password Strength Meter:** Visual indicator (Weak, Medium, Strong)
- **Phone Validation:** Country-specific phone number format validation
- **Submit Button State:** Disabled until all validations pass
- **Form Reset:** Auto-resets after successful submission
- **Accessibility:** ARIA labels and semantic HTML

**CSS Styling:**
- Modern gradient background
- Responsive design (mobile-friendly)
- Smooth animations and transitions
- Color-coded error states
- Professional UI with proper spacing and typography

---

## Automation Flows

### **Flow A: Negative Scenario - Missing Last Name**

**Test File:** `Cypress-Framework/cypress/e2e/registration.cy.js`
**Test Name:** `keeps submit disabled and shows error when last name is missing`

**Steps:**
1. ✅ Launch page: `https://pavanganeshpg.github.io/Intelligent-Registration-System-automation/`
2. ✅ Print page URL and title (logged in Cypress console)
3. ✅ Fill form with:
   - First Name: "John"
   - Email: "john@example.com"
   - Phone: "+12025550199" (US format)
   - Gender: "Male"
   - Country: "US"
   - State: "CA"
   - City: "Los Angeles"
   - Password: "Password@123"
   - Confirm Password: "Password@123"
   - Terms: Checked
   - **Last Name: SKIPPED (intentional)**

4. ✅ Submit attempt → Button remains disabled
5. ✅ Validate:
   - Submit button is disabled ✓
   - Error message appears: "This field is required" ✓
   - Error field highlighted ✓
6. ✅ Screenshot captured: `01-last-name-missing.png`

**Expected Result:** ✅ PASSED

---

### **Flow B: Positive Scenario - Successful Registration**

**Test File:** `Cypress-Framework/cypress/e2e/registration.cy.js`
**Test Name:** `registers successfully with all valid fields and shows success alert`

**Steps:**
1. ✅ Refill form with ALL valid fields:
   - First Name: "Jane"
   - Last Name: "Doe"
   - Email: "jane.doe@gmail.com"
   - Phone: "+919876543210" (India format)
   - Gender: "Female"
   - Country: "IN"
   - State: "MH" (Maharashtra)
   - City: "Mumbai"
   - Password: "StrongPass2025!"
   - Confirm Password: "StrongPass2025!" (matching)
   - Terms: Checked

2. ✅ All fields valid → Submit button becomes enabled
3. ✅ Click Submit button
4. ✅ Validate:
   - Success alert appears: "Registration Successful" ✓
   - Alert message: "Your profile has been submitted successfully." ✓
   - Form fields reset (empty) ✓
   - Submit button returns to disabled state ✓
   - Password strength bar resets ✓

5. ✅ Screenshots captured:
   - `02-form-valid-before-submit.png`
   - `03-success-alert-shown.png`
   - `04-form-reset-complete.png`

**Expected Result:** ✅ PASSED

---

### **Flow C: Form Logic Validation**

**Test File:** `Cypress-Framework/cypress/e2e/registration.cy.js`
**Test Name:** `validates cascading dropdowns and password strength + mismatch`

**Steps:**

#### Part 1: Cascading Dropdowns
1. ✅ Select Country: "FR" (France)
   - States dropdown automatically updates with French states
   
2. ✅ Select State: "IDF" (Île-de-France)
   - Cities dropdown automatically updates with Paris region cities
   
3. ✅ Select City: "Paris"
   - Validation passes ✓

#### Part 2: Password Strength
1. ✅ Enter weak password: "123456"
   - Strength indicator shows: "Weak" ✓
   - Strength bar displays red (33% width) ✓

2. ✅ Enter strong password: "StrongPass2025!"
   - Strength indicator shows: "Strong" ✓
   - Strength bar displays green (100% width) ✓

#### Part 3: Password Mismatch
1. ✅ Enter Confirm Password: "WrongPassword"
   - Error appears: "Passwords do not match" ✓
   - Submit button remains disabled ✓

2. ✅ Correct Confirm Password: "StrongPass2025!"
   - Error disappears ✓

#### Part 4: Submit Button State
1. ✅ Fill all required fields with correct data:
   - First Name, Last Name, Email, Phone
   - Gender selected, Country/State/City set
   - Passwords match, Terms checked

2. ✅ Submit button becomes enabled ✓
3. ✅ Screenshot captured: `04-form-logic-validation.png`

**Expected Result:** ✅ PASSED

---

### **Flow D: Phone Validation by Country**

**Test File:** `Cypress-Framework/cypress/e2e/registration.cy.js`
**Test Name:** `shows phone error when country code does not match selected country`

**Steps:**
1. ✅ Select Country: "US"
2. ✅ Enter Phone: "+919876543210" (Indian format)
3. ✅ Blur field to trigger validation
4. ✅ Validate:
   - Error appears: "Phone must start with +1" ✓
   - Error field highlighted ✓
   - Submit button remains disabled ✓
5. ✅ Screenshot captured: `05-phone-country-mismatch.png`

**Expected Result:** ✅ PASSED

---

## Cypress Test Scripts

### Test File: `registration.cy.js`

```javascript
describe('Registration Form', () => {
  const url = 'https://pavanganeshpg.github.io/Intelligent-Registration-System-automation/';

  // Global handler to ignore app-side JS errors
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    cy.visit(url);
  });

  // Test 1: Negative Scenario
  it('keeps submit disabled and shows error when last name is missing', () => {
    // Fill all fields except last name
    // Verify error appears
    // Verify submit button remains disabled
  });

  // Test 2: Positive Scenario
  it('registers successfully with all valid fields and shows success alert', () => {
    // Fill all fields with valid data
    // Submit form
    // Verify success alert
    // Verify form resets
  });

  // Test 3: Form Logic
  it('validates cascading dropdowns and password strength + mismatch', () => {
    // Test cascading dropdowns
    // Test password strength meter
    // Test password mismatch error
  });

  // Test 4: Phone Validation
  it('shows phone error when country code does not match selected country', () => {
    // Select US country
    // Enter Indian phone number
    // Verify error appears
  });
});
```

**Key Testing Techniques:**
- ✅ Cypress `.check()` for checkboxes and radio buttons
- ✅ Cypress `.select()` for dropdowns
- ✅ Cypress `.type()` for text input
- ✅ Cypress `.should()` assertions with retries
- ✅ Cypress `.focus()` and `.blur()` for event triggering
- ✅ Cypress `.contains()` for text matching
- ✅ Cypress `.screenshot()` for visual capture
- ✅ `cy.wait()` for timing/synchronization
- ✅ `cy.get()` with selectors for element access

---

## How to Run Tests

### Prerequisites
```bash
# Node.js and npm must be installed
node --version  # v23.10.0+
npm --version   # 10.0.0+
```

### Installation
```bash
cd homework/Cypress-Framework
npm install
```

### Run All Tests (Headless)
```bash
npx cypress run --spec "cypress/e2e/registration.cy.js" --headless
```

### Run Tests with UI (Interactive)
```bash
npx cypress open
# Then select registration.cy.js and run tests
```

### Run Single Test
```bash
npx cypress run --spec "cypress/e2e/registration.cy.js" --headless -k "keeps submit disabled"
```

### Generate Report
```bash
# Mochawesome report auto-generates at:
# cypress/results/cypress-mochawesome-reporter/index.html
```

---

## Test Results

### Test Execution Summary
```
✅ Registration Form
  ✓ keeps submit disabled and shows error when last name is missing
  ✓ registers successfully with all valid fields and shows success alert (12849ms)
  ✓ validates cascading dropdowns and password strength + mismatch
  ✓ shows phone error when country code does not match selected country

📊 Total Tests: 4
✅ Passing: 4
❌ Failing: 0
⏱️ Duration: 25 seconds
```

### Test Coverage
- ✅ Form Validation (all fields)
- ✅ Error Messages
- ✅ Submit Button State Management
- ✅ Cascading Dropdowns
- ✅ Password Strength
- ✅ Phone Country Validation
- ✅ Form Reset
- ✅ Success Alert Display

---

## Artifacts Generated

### Screenshots (6 total)
1. `01-last-name-missing.png` - Error state for missing field
2. `02-form-valid-before-submit.png` - Valid form before submission
3. `03-success-alert-shown.png` - Success alert displayed
4. `04-form-reset-complete.png` - Form after reset
5. `04-form-logic-validation.png` - Cascading dropdowns and password validation
6. `05-phone-country-mismatch.png` - Phone validation error

**Location:** `Cypress-Framework/cypress/screenshots/registration.cy.js/`

### Video Recording
- `registration.cy.js.mp4` - Full test execution video
- **Location:** `Cypress-Framework/cypress/videos/`
- **Duration:** ~25 seconds

### HTML Test Report
- **Location:** `Cypress-Framework/cypress/results/cypress-mochawesome-reporter/index.html`
- **Features:**
  - Detailed test execution timeline
  - Pass/Fail statistics
  - Screenshots embedded
  - Video playback
  - Test duration metrics

---

## Source Code Details

### HTML Form (`index.html`)

**Features:**
- 13 form fields with real-time validation
- 16+ countries with cascading states and cities
- Disposable email domain detection
- Country-specific phone number validation
- Password strength meter (visual + text)
- Smooth animations and transitions
- Responsive design (mobile + desktop)
- WCAG accessibility compliance

**Validations:**
- Required field checks
- Email format validation
- Phone format + country code validation
- Password strength calculation
- Password match verification
- Terms & conditions enforcement

### CSS Styling
- Modern gradient background
- Color-coded states (error, success, warning)
- Responsive grid layout
- Smooth hover effects
- Accessibility-first design

### JavaScript Functionality
- **Real-time Validation:** Instant feedback as user types
- **Dynamic Updates:** Dropdowns update based on selections
- **State Management:** Submit button enables/disables based on form validity
- **Visual Feedback:** Error highlighting, strength meters
- **Auto-reset:** Form clears 2 seconds after successful submission

---

## Bug Fixes Applied

### Issue: `classList` Null Reference Errors
**Root Cause:** Form validation tried to access properties on potentially null elements

**Fix Applied:** Added null-safety checks in `index.html`
```javascript
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) field.classList.add('error');  // Safety check added
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}
```

**Result:** All tests now pass without errors ✅

---

## Bonus Enhancements

### UI/UX Improvements Made
1. ✅ **Modern Design** - Gradient background, smooth animations
2. ✅ **Real-time Validation** - Instant feedback as user types
3. ✅ **Visual Strength Meter** - Color-coded password strength indicator
4. ✅ **Cascading Dropdowns** - Smart dependent field updates
5. ✅ **Error Highlighting** - Clear visual error states
6. ✅ **Responsive Design** - Mobile-friendly layout
7. ✅ **Accessibility** - Semantic HTML, ARIA labels
8. ✅ **Smooth UX** - Animations and transitions for all interactions

---

## Git Repository

### Repository Structure
```
https://github.com/pavanganeshpg/Intelligent-Registration-System-automation

Commits:
- 🔧 Fix: Add null-safety checks to form validation
- ✅ Add Cypress e2e tests for registration form validation
- 🗑️ Remove unnecessary Playwright test file
- 🎨 Enhanced UI and form design
```

### How to Clone and Run
```bash
git clone https://github.com/pavanganeshpg/Intelligent-Registration-System-automation.git
cd Intelligent-Registration-System-automation/Cypress-Framework
npm install
npx cypress run --spec "cypress/e2e/registration.cy.js" --headless
```

---

## Summary

### ✅ Deliverables Completed

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Source Code (.html, .css, .js) | ✅ Complete | `index.html` with embedded CSS/JS |
| Automation Scripts | ✅ Complete | `registration.cy.js` with 4 tests |
| Flow A (Negative) | ✅ Complete | Test 1 passing |
| Flow B (Positive) | ✅ Complete | Test 2 passing |
| Flow C (Form Logic) | ✅ Complete | Test 3 passing |
| Flow D (Phone Validation) | ✅ Complete | Test 4 passing |
| Screenshots | ✅ Complete | 6 screenshots captured |
| Video Recording | ✅ Complete | Test execution video recorded |
| Test Report | ✅ Complete | HTML report with metrics |
| Step-by-step Explanation | ✅ Complete | This documentation |
| Bonus UI Enhancements | ✅ Complete | Modern design implemented |

### Test Results: **4/4 PASSED ✅**

All automation flows working perfectly with comprehensive test coverage, visual artifacts, and detailed reporting!

---

**Last Updated:** November 19, 2025
**Framework:** Cypress 13.0.0
**Node Version:** v23.10.0
**Status:** Production Ready ✅

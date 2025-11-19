# Intelligent Registration System - Automation

Complete automated testing solution for a User Registration Form with **Cypress Framework**.

## 📋 Quick Start Guide

### Prerequisites
- **Node.js** (v14+) - [Download](https://nodejs.org/)
- **npm** (v6+) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Installation & Setup (3 Simple Steps)

```bash
# Step 1: Clone the repository
git clone https://github.com/pavanganeshpg/Intelligent-Registration-System-automation.git

# Step 2: Navigate to Cypress Framework
cd Intelligent-Registration-System-automation/Cypress-Framework

# Step 3: Install dependencies
npm install
```

### Run Tests

**Run all tests (headless mode):**
```bash
npx cypress run --spec "cypress/e2e/registration.cy.js"
```

**Run tests with UI (interactive mode):**
```bash
npx cypress open

   or

cd /Users/homework/Cypress-Framework && npx cypress open
```


**Run specific test:**
```bash
npm run test:registration
```

**Run by environment:**
```bash
npm run test:local    # Local environment
npm run test:dev      # Development environment
npm run test:qa       # QA environment
npm run test:prod     # Production environment
```

**Run by browser:**
```bash
npm run test:chrome   # Chrome browser
npm run test:firefox  # Firefox browser
npm run test:edge     # Edge browser
```

## 📁 Project Structure

```
Intelligent-Registration-System-automation/
├── index.html                                    # Registration form application
├── AUTOMATION_DOCUMENTATION.md                   # Complete documentation (500+ lines)
├── Cypress-Framework/
│   ├── cypress.config.js                        # Cypress configuration
│   ├── package.json                             # Dependencies & scripts
│   ├── cypress/
│   │   ├── e2e/
│   │   │   ├── registration.cy.js              # 4 Test Cases (PASSING ✅)
│   │   │   ├── pages/                          # Page Object Models
│   │   │   ├── config/                         # Test configurations
│   │   │   ├── utils/                          # Test utilities
│   │   │   └── components/                     # Reusable components
│   │   ├── fixtures/                           # Test data
│   │   ├── support/                            # Cypress commands
│   │   ├── screenshots/                        # Test screenshots (6 images)
│   │   ├── videos/                             # Test execution videos
│   │   └── results/                            # Test reports & HTML output
│   ├── settings/                               # Environment configurations
│   ├── doc/                                    # Documentation & diagrams
│   └── docker-compose.yml                      # Docker setup
└── README.md                                    # This file
```

## ✅ Test Coverage

All 4 tests are **PASSING** ✅

### Test Cases:
1. **Flow A - Negative Scenario**
   - Validates error handling when Last Name is missing
   - Ensures submit button remains disabled
   - Verifies error message display

2. **Flow B - Positive Scenario**
   - Successful form submission with all valid data
   - Validates success alert display
   - Confirms form reset after submission

3. **Flow C - Form Logic Validation**
   - Cascading dropdown functionality
   - Password strength meter validation
   - Password mismatch detection

4. **Flow D - Phone Validation**
   - Country-specific phone number validation
   - Error handling for invalid phone formats

## 📊 Test Execution Results

```
✅ Total Tests:     4
✅ Passing:         4
❌ Failing:         0
⏱️  Duration:       ~25 seconds
📸 Screenshots:     6 captured
🎥 Video:          Recorded
📋 HTML Report:    Generated
```

## 🛠️ Available npm Scripts

```json
{
  "test:all":         "Run all tests",
  "test:chrome":      "Run tests in Chrome",
  "test:firefox":     "Run tests in Firefox",
  "test:local":       "Run tests against local environment",
  "test:dev":         "Run tests against dev environment",
  "test:qa":          "Run tests against QA environment",
  "test:prod":        "Run tests against production",
  "test:registration": "Run registration tests only",
  "test:report":      "Run tests and generate report"
}
```

## 📝 Form Features

The registration form includes:
- **13 Form Fields** with real-time validation
- **16+ Countries** with cascading states and cities
- **Password Strength Meter** with visual indicator
- **Email Validation** including disposable domain detection
- **Phone Validation** by country code
- **Responsive Design** (Mobile & Desktop)
- **Accessibility Features** (WCAG compliant)
- **Auto-reset** after successful submission

## 🔍 Troubleshooting

### Issue: "npm command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Issue: "Cypress not found"
**Solution:** Run `npm install` in the Cypress-Framework directory

### Issue: Tests fail on different computer
**Solution:** 
1. Delete `node_modules` folder: `rm -rf node_modules`
2. Delete lock file: `rm package-lock.json`
3. Reinstall: `npm install`

### Issue: Port already in use
**Solution:** The tests run headless by default, no port conflict expected

## 📚 Documentation

For detailed information about:
- Test flows and scenarios
- Automation techniques used
- Bug fixes applied
- UI/UX enhancements

See: **[AUTOMATION_DOCUMENTATION.md](./AUTOMATION_DOCUMENTATION.md)**

## 🎬 Video & Screenshots

Test execution artifacts are stored in:
- **Screenshots:** `Cypress-Framework/cypress/screenshots/`
- **Videos:** `Cypress-Framework/cypress/videos/`
- **HTML Report:** `Cypress-Framework/cypress/results/cypress-mochawesome-reporter/index.html`

## 🔗 Live Application

View the registration form:
https://pavanganeshpg.github.io/Intelligent-Registration-System-automation/

## 💻 System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| **RAM** | 4 GB | 8 GB+ |
| **Disk Space** | 500 MB | 1 GB |
| **Node.js** | v14 | v18+ |
| **npm** | v6 | v9+ |
| **OS** | Windows/Mac/Linux | Latest LTS |

## 🚀 Continuous Integration

The project includes:
- ✅ Cypress configuration for CI/CD
- ✅ Docker support with docker-compose
- ✅ Jenkins pipeline configuration
- ✅ Mochawesome reporter integration
- ✅ JUnit XML report generation

## 👤 Author

**Pavan Ganesh**
- GitHub: [@pavanganeshpg](https://github.com/pavanganeshpg)
- Repository: [Intelligent-Registration-System-automation](https://github.com/pavanganeshpg/Intelligent-Registration-System-automation)

## 📄 License

This project is licensed under the ISC License - see LICENSE file for details.

## ✨ Key Features

✅ **4/4 Tests Passing**
✅ Full Automation Coverage
✅ Real-time Form Validation
✅ Cascading Dropdowns
✅ Password Strength Meter
✅ Country-specific Phone Validation
✅ Responsive Design
✅ Complete Documentation
✅ Docker Support
✅ Jenkins Integration
✅ HTML & JUnit Reports
✅ Video Recording

## 📞 Support

For issues or questions:
1. Check [AUTOMATION_DOCUMENTATION.md](./AUTOMATION_DOCUMENTATION.md)
2. Review test cases in `Cypress-Framework/cypress/e2e/registration.cy.js`
3. Check existing GitHub issues
4. Create a new issue with detailed information

---

**Last Updated:** November 19, 2025
**Status:** ✅ Production Ready
**Framework:** Cypress 13.0.0
**Node Version:** v14+ required

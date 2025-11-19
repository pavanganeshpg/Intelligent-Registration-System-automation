# 🚀 Setup & Installation Guide

Complete step-by-step guide to clone and run the project on any device.

## ✅ Pre-Installation Checklist

Before starting, ensure you have:
- [ ] **Git** installed ([Download](https://git-scm.com/))
- [ ] **Node.js v14+** installed ([Download](https://nodejs.org/))
- [ ] **npm v6+** (comes with Node.js)
- [ ] **Internet connection** for downloading packages

### Verify Installation

Open terminal/command prompt and run:

```bash
# Check Git version
git --version
# Expected: git version 2.x.x

# Check Node.js version
node --version
# Expected: v14.x.x or higher

# Check npm version
npm --version
# Expected: v6.x.x or higher
```

## 📥 Step 1: Clone the Repository

```bash
# Open your terminal/command prompt

# Clone the repository
git clone https://github.com/pavanganeshpg/Intelligent-Registration-System-automation.git

# Navigate to project directory
cd Intelligent-Registration-System-automation

# Navigate to Cypress Framework
cd Cypress-Framework
```

## 📦 Step 2: Install Dependencies

```bash
# Install all npm packages
npm install

# This will download and install:
# - Cypress 13.0.0
# - Test reporters
# - ESLint
# - All required plugins
```

**⏱️ This may take 2-5 minutes depending on your internet speed.**

## ✅ Step 3: Verify Installation

```bash
# Check if Cypress was installed correctly
npx cypress --version
# Expected: 13.0.0

# List all available npm scripts
npm run
# Should show test:all, test:chrome, test:registration, etc.
```

## 🧪 Step 4: Run Tests

### Option A: Run All Tests (Headless)
```bash
npx cypress run --spec "cypress/e2e/registration.cy.js"
```

### Option B: Run Tests with GUI (Interactive)
```bash
npx cypress open
# Then select the test file and click "Run"
```

### Option C: Run Specific Test
```bash
npm run test:registration
```

## 🎯 Expected Test Results

```
✅ Registration Form
  ✓ keeps submit disabled and shows error when last name is missing
  ✓ registers successfully with all valid fields and shows success alert
  ✓ validates cascading dropdowns and password strength + mismatch
  ✓ shows phone error when country code does not match selected country

4 passing (25 seconds)
```

## 📁 Project Structure

```
Intelligent-Registration-System-automation/
├── index.html                          # Registration form app
├── AUTOMATION_DOCUMENTATION.md         # Detailed documentation
├── README.md                           # Quick start guide
├── SETUP_GUIDE.md                      # This file
└── Cypress-Framework/
    ├── package.json                    # Dependencies
    ├── cypress.config.js               # Configuration
    ├── cypress/
    │   ├── e2e/
    │   │   └── registration.cy.js      # Main test file
    │   ├── fixtures/                   # Test data
    │   ├── support/                    # Cypress commands
    │   ├── screenshots/                # Test screenshots
    │   ├── videos/                     # Test recordings
    │   └── results/                    # Test reports
    └── settings/                       # Environment configs
```

## 🔧 Troubleshooting

### ❌ "npm: command not found"
**Problem:** Node.js not installed
**Solution:** 
1. Download Node.js from https://nodejs.org/
2. Run the installer
3. Restart your terminal
4. Verify: `node --version`

### ❌ "Module not found: cypress"
**Problem:** Dependencies not installed
**Solution:**
```bash
cd Cypress-Framework
rm -rf node_modules package-lock.json
npm install
```

### ❌ "Tests fail with timeout errors"
**Problem:** 
- Slow internet connection
- Application not loading
- Port conflict

**Solution:**
```bash
# Increase timeout
npx cypress run --spec "cypress/e2e/registration.cy.js" --config defaultCommandTimeout=10000

# Check if application is accessible
# Visit: https://pavanganeshpg.github.io/Intelligent-Registration-System-automation/
```

### ❌ "Permission denied" (Mac/Linux)
**Problem:** Script permissions issue
**Solution:**
```bash
chmod +x node_modules/.bin/cypress
npx cypress run
```

### ❌ "Port already in use"
**Problem:** Another process using the port
**Solution:**
- The tests run headless by default (no port needed)
- Restart your computer if issue persists

## 🌍 Platform-Specific Instructions

### Windows
```bash
# Clone
git clone https://github.com/pavanganeshpg/Intelligent-Registration-System-automation.git

# Install
cd Intelligent-Registration-System-automation\Cypress-Framework
npm install

# Run
npx cypress run --spec "cypress/e2e/registration.cy.js"
```

### Mac/Linux
```bash
# Clone
git clone https://github.com/pavanganeshpg/Intelligent-Registration-System-automation.git

# Install
cd Intelligent-Registration-System-automation/Cypress-Framework
npm install

# Run
npx cypress run --spec "cypress/e2e/registration.cy.js"
```

## 📊 System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **OS** | Windows 7+ / Mac 10.9+ / Ubuntu 12+ | Latest LTS |
| **RAM** | 4 GB | 8 GB+ |
| **Disk Space** | 500 MB | 1 GB |
| **Node.js** | v14 | v18+ |
| **npm** | v6 | v9+ |
| **Browser** | Chrome 64+ | Latest Chrome/Firefox |

## 🚀 Quick Setup Script

Save this as `setup.sh` (Mac/Linux) or `setup.bat` (Windows) and run it:

### Mac/Linux (setup.sh)
```bash
#!/bin/bash
git clone https://github.com/pavanganeshpg/Intelligent-Registration-System-automation.git
cd Intelligent-Registration-System-automation/Cypress-Framework
npm install
echo "✅ Setup complete! Run: npx cypress run --spec 'cypress/e2e/registration.cy.js'"
```

### Windows (setup.bat)
```batch
@echo off
git clone https://github.com/pavanganeshpg/Intelligent-Registration-System-automation.git
cd Intelligent-Registration-System-automation\Cypress-Framework
call npm install
echo ✅ Setup complete! Run: npx cypress run --spec "cypress/e2e/registration.cy.js"
pause
```

## 📚 Available Commands

```bash
# Run all tests
npm run test:all

# Run specific test files
npm run test:registration
npm run test:login
npm run test:addToCart

# Run by browser
npm run test:chrome
npm run test:firefox
npm run test:edge

# Run by environment
npm run test:local
npm run test:dev
npm run test:qa
npm run test:prod

# Generate report
npm run test:report

# Open Cypress UI
npx cypress open
```

## 🎬 First Test Run

After successful setup:

```bash
# Navigate to Cypress Framework directory
cd Cypress-Framework

# Run the registration tests
npx cypress run --spec "cypress/e2e/registration.cy.js"

# You should see:
# ✓ 4 passing (25 seconds)
# 📸 6 screenshots captured
# 🎥 1 video recorded
# 📋 HTML report generated
```

## 📝 What Gets Generated After Tests

- 📸 **Screenshots:** `cypress/screenshots/registration.cy.js/`
- 🎥 **Video:** `cypress/videos/registration.cy.js.mp4`
- 📋 **HTML Report:** `cypress/results/cypress-mochawesome-reporter/index.html`
- 📊 **JUnit Report:** `cypress/results/junit/combined-report.xml`

## ✨ Tips for Success

1. **Always run from Cypress-Framework directory**
   ```bash
   cd Intelligent-Registration-System-automation/Cypress-Framework
   ```

2. **Keep dependencies updated**
   ```bash
   npm update
   ```

3. **Clear cache if having issues**
   ```bash
   npm cache clean --force
   npm install
   ```

4. **Check internet connection** - Required for downloading packages and accessing the test application

5. **Use the correct test path**
   ```bash
   # ✅ Correct
   npx cypress run --spec "cypress/e2e/registration.cy.js"
   
   # ❌ Wrong
   npx cypress run --spec "registration.cy.js"
   ```

## 🔗 Useful Links

- 📚 [Cypress Documentation](https://docs.cypress.io/)
- 🏠 [Project Repository](https://github.com/pavanganeshpg/Intelligent-Registration-System-automation)
- 🌐 [Live Application](https://pavanganeshpg.github.io/Intelligent-Registration-System-automation/)
- 📖 [Full Documentation](./AUTOMATION_DOCUMENTATION.md)

## 🆘 Need Help?

1. **Check existing issues** on GitHub
2. **Read** [AUTOMATION_DOCUMENTATION.md](./AUTOMATION_DOCUMENTATION.md)
3. **Review test cases** in `cypress/e2e/registration.cy.js`
4. **Create an issue** with detailed information including:
   - Your OS (Windows/Mac/Linux)
   - Node.js version
   - Error message
   - Steps you followed

---

**Setup Status:** ✅ Ready to use on any device
**Last Updated:** November 19, 2025
**Framework:** Cypress 13.0.0

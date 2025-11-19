# 🚀 Clone & Run - 3 Simple Steps

## Step 1️⃣: Clone Repository
```bash
git clone https://github.com/pavanganeshpg/Intelligent-Registration-System-automation.git
cd Intelligent-Registration-System-automation/Cypress-Framework
```

## Step 2️⃣: Install Dependencies
```bash
npm install
```

## Step 3️⃣: Run Tests
```bash
npx cypress run --spec "cypress/e2e/registration.cy.js"
```

---

## ✅ Expected Output
```
✅ Registration Form
  ✓ keeps submit disabled and shows error when last name is missing
  ✓ registers successfully with all valid fields and shows success alert
  ✓ validates cascading dropdowns and password strength + mismatch
  ✓ shows phone error when country code does not match selected country

4 passing (25 seconds)
✅ HTML Report Generated
✅ Screenshots Captured
✅ Video Recorded
```

---

## 📚 For More Information
- **Quick Start:** See [README.md](./README.md)
- **Detailed Setup:** See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Test Documentation:** See [AUTOMATION_DOCUMENTATION.md](./AUTOMATION_DOCUMENTATION.md)

---

**Status:** ✅ Ready to run on any device with Node.js installed

# 🔐 Authentication UI (Mocked)

A front-end authentication interface that simulates login functionality using **HTML**, **CSS**, and **JavaScript**. This project mimics basic user authentication logic using `localStorage` without relying on a backend server.

Live demo: https://authentication-keiwan.netlify.app/

## 🚀 Features

- ✅ Login form with email and password fields
- ✅ Mocked credential checking using hardcoded data
- ✅ Basic client-side input validation
- ✅ LocalStorage-based session persistence
- ✅ Logout functionality
- ✅ Conditional rendering based on login state

## 📁 Project Structure

```
authentication/
├── index.html
├── main.css
├── view.js
├── controller.js
└── model.js
```

## 🧪 How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/morgothqwe/authentication.git
   cd authentication
   ```

2. Open `index.html` in your browser to access the login screen.

## 🔐 Mock Credentials

The system uses hardcoded credentials in `auth.js`, for example:

```js
const DUMMY_USER = {
  email: "test@example.com",
  password: "123456",
};
```

## 🚧 Potential Enhancements

- Add password visibility toggle
- Add a fake register page
- Style error and success feedback messages more clearly

## 📄 License

This project is licensed under the MIT License.

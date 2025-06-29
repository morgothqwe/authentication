class View {
  _login = document.querySelector(".auth-submit");
  _email = document.querySelector(".email");
  _password = document.querySelector(".password");
  _authPrompt = document.querySelector(".auth-prompt");

  addHandlerAuth(loginHandler, logoutHandler, registerHandler) {
    this._login.addEventListener("click", (e) => {
      e.preventDefault();

      if (this._login.classList.contains("is-logged-in")) {
        const email = this._authPrompt.dataset.email;
        if (!email) {
          this.renderError("No user email found for logout");
          return;
        }
        logoutHandler(email);
      } else {
        const email = this._email.value;
        const password = this._password.value;

        if (!email || !password) {
          this.renderError("Please enter both email and password");
          return;
        }

        if (!email.includes("@")) {
          this.renderError("Please enter a valid email address");
          return;
        }

        loginHandler([email, password]);
      }
    });

    // Use event delegation for dynamic .auth-signup-link
    this._authPrompt.addEventListener("click", (e) => {
      if (e.target.classList.contains("auth-signup-link")) {
        e.preventDefault();
        const email = this._email.value;
        const password = this._password.value;

        if (!email || !password) {
          this.renderError("Please enter both email and password to register");
          return;
        }

        if (!email.includes("@")) {
          this.renderError("Please enter a valid email address");
          return;
        }

        registerHandler([email, password]);
      }
    });
  }

  initialize(isLoggedIn, loggedInEmail) {
    if (isLoggedIn && loggedInEmail) {
      this.renderLogin(loggedInEmail);
    } else {
      this.renderLogout({ condition: false });
    }
  }

  renderLogin(email) {
    this._authPrompt.textContent = email;
    this._authPrompt.dataset.email = email;
    this._authPrompt.classList.add("welcome__style");
    document.querySelector(".auth-welcome").textContent = "You logged in";
    this._login.textContent = "Logout";
    this._login.classList.add("is-logged-in", "logout__style");
    [this._email, this._password].forEach((el) => el.classList.add("hidden"));
  }

  renderLogout(user) {
    this._authPrompt.textContent = "Don't have an account yet?";
    this._authPrompt.insertAdjacentHTML(
      "beforeend",
      '<a href="#" class="auth-signup-link">Sign up</a>'
    );
    this._authPrompt.classList.remove("welcome__style");
    delete this._authPrompt.dataset.email;
    document.querySelector(".auth-welcome").textContent = "Welcome Back";
    this._login.textContent = "Login";
    this._login.classList.remove("is-logged-in", "logout__style");
    [this._email, this._password].forEach((el) =>
      el.classList.remove("hidden")
    );
  }

  renderError(message) {
    this._authPrompt.textContent = message;
    this._authPrompt.classList.add("error__style");
    setTimeout(() => {
      this._authPrompt.textContent = "Don't have an account yet?";
      this._authPrompt.insertAdjacentHTML(
        "beforeend",
        '<a href="#" class="auth-signup-link">Sign up</a>'
      );
      this._authPrompt.classList.remove("error__style");
    }, 2000);
  }

  renderRegistrationSuccess(email) {
    this._authPrompt.textContent = `Registration successful for ${email}. Please log in.`;
    this._authPrompt.classList.add("success__style");
    setTimeout(() => {
      this._authPrompt.textContent = "Don't have an account yet?";
      this._authPrompt.insertAdjacentHTML(
        "beforeend",
        '<a href="#" class="auth-signup-link">Sign up</a>'
      );
      this._authPrompt.classList.remove("success__style");
    }, 3000);
  }
}

export default new View();

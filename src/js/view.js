class View {
  _login = document.querySelector(".auth-submit");
  _email = document.querySelector(".email");
  _password = document.querySelector(".password");
  _authPrompt = document.querySelector(".auth-prompt");

  addHandlerAuth(loginHandler, logoutHandler) {
    this._login.addEventListener("click", (e) => {
      e.preventDefault();

      if (this._login.classList.contains("is-logged-in")) {
        const email = this._authPrompt.dataset.email;
        if (!email) {
          this.renderError("No user email found for logout");
          return;
        }
        logoutHandler(email); // Call logout handler
      }

      // Handle login
      else {
        const email = this._email.value;
        const password = this._password.value;

        if (!email || !password) {
          this.renderError("Please enter both email and password");
          return;
        }

        // Basic email validation
        if (!email.includes("@")) {
          this.renderError("Please enter a valid email address");
          return;
        }

        loginHandler([email, password]); // Call login handler
      }
    });
  }

  initialize(isLoggedIn) {
    if (isLoggedIn) {
      const email = this._authPrompt.dataset.email || "";
      this.renderLogin(email);
    } else {
      this.renderLogout({ condition: false }); // Default to logged-out state
    }
  }

  renderLogin(email) {
    this._authPrompt.textContent = email;
    this._authPrompt.dataset.email = email; // Store email for logout
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
      '&nbsp;<a href="#" class="auth-signup-link">Sign up</a>'
    );
    this._authPrompt.classList.remove("welcome__style");
    delete this._authPrompt.dataset.email; // Clear stored email
    document.querySelector(".auth-welcome").textContent = "Welcome Back";
    this._login.textContent = "Login";
    this._login.classList.remove("is-logged-in", "logout__style");
    [this._email, this._password].forEach((el) =>
      el.classList.remove("hidden")
    );
  }

  renderError(message) {
    this._authPrompt.textContent = message;
    this._authPrompt.classList.add("error__style"); // Add error styling (define in CSS)
    setTimeout(() => {
      this._authPrompt.textContent = "";
      this._authPrompt.classList.remove("error__style");
    }, 3000); // Clear error after 3 seconds
  }
}

export default new View();

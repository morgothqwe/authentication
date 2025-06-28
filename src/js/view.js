class View {
  _login = document.querySelector(".auth-submit");
  _email = document.querySelector(".email");
  _password = document.querySelector(".password");

  addHandlerLogin(handler) {
    this._login.addEventListener("click", (e) => {
      e.preventDefault();

      const email = this._email.value;
      if (!email) return;

      const password = this._password.value;
      if (!password) return;

      const user = [email, password];
      handler(user);
    });
  }

  renderLogin(user) {
    document.querySelector(".auth-welcome").textContent = "You logged in";
    document.querySelector(".auth-prompt").textContent = user.includes("@")
      ? user.split("@")[0]
      : user;

    document.querySelector(".auth-prompt").classList.add("welcome__style");
    this._login.textContent = "Logout?";
    this._login.classList.add("logout__style");
    [this._email, this._password].forEach((el) => el.classList.add("hidden"));
  }
}

export default new View();

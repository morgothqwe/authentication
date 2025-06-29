import view from "./view";
import * as model from "./model";

const controlLogin = function (user) {
  const newLogin = model.loginInfo(user);
  if (!newLogin) {
    view.renderError("Login failed: Incorrect email or password");
    return;
  }
  view.renderLogin(newLogin);
};

const controlLogout = function (email) {
  const logout = model.logout(email);
  if (!logout) {
    view.renderError("Logout failed: User not logged in");
    return;
  }
  view.renderLogout(logout);
};

const controlRegister = function (user) {
  const newUser = model.register(user);
  if (!newUser) {
    view.renderError("Registration failed: Email already exists");
    return;
  }
  view.renderRegistrationSuccess(newUser);
};

const init = function () {
  view.addHandlerAuth(controlLogin, controlLogout, controlRegister);
  view.initialize(model.isLoggedIn(), model.getLoggedInUserEmail());
};

init();

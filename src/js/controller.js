import view from "./view";
import * as model from "./model";

const controlLogin = function (user) {
  const newLogin = model.loginInfo(user);
  if (!newLogin) {
    view.renderError(
      "Login failed: User already logged in or invalid credentials"
    );
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

const init = function () {
  view.addHandlerAuth(controlLogin, controlLogout); // Renamed to addHandlerAuth for clarity
  view.initialize(model.isLoggedIn()); // Initialize UI based on login state
};

init();

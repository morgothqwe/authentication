import view from "./view";
import * as model from "./model";

const controlLogin = function (user) {
  const newLogin = model.loginInfo(user);

  view.renderLogin(newLogin);
};

const init = function () {
  view.addHandlerLogin(controlLogin);
};

init();

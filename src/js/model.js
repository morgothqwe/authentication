// i can add condition (true or false) to check for login and logout in state object
const state = {
  users: [],
};

const email = "info@example.com";
const password = "123456";

export const loginInfo = function (user) {
  const newUser = {
    email: user[0],
    password: user[1],
  };
  state.users.push(newUser);
  const foundUser = state.users.find(
    (us) => us.email === user[0] && us.password === user[1]
  ); // need to fix

  if (foundUser) return foundUser.email;
};

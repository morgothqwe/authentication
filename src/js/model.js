const state = {
  users: [],
  loggedInUser: null, // Track the currently logged-in user
};

export const loginInfo = function (user) {
  const [email, password] = user;

  // Check if user already exists
  const foundUser = state.users.find(
    (us) => us.email === email && us.password === password
  );

  if (foundUser) {
    // Prevent login if already logged in
    if (foundUser.condition) return null; // Already logged in
    foundUser.condition = true;
    state.loggedInUser = foundUser; // Track logged-in user
    return foundUser.email;
  }

  // Create new user if not found
  const newUser = {
    email,
    password,
    condition: true, // Set to true on first login
  };
  state.users.push(newUser);
  state.loggedInUser = newUser;
  return newUser.email;
};

export const logout = function (email) {
  const foundUser = state.users.find((us) => us.email === email);

  if (foundUser && foundUser.condition) {
    foundUser.condition = false;
    state.loggedInUser = null; // Clear logged-in user
    return foundUser;
  }
  return null; // User not found or not logged in
};

export const isLoggedIn = function () {
  return !!state.loggedInUser; // Returns true if logged in, false otherwise
};

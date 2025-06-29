const state = {
  users: [],
  loggedInUser: null,
};

// Load state from sessionStorage on initialization
const loadState = () => {
  try {
    const saved = sessionStorage.getItem("authState");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate and merge state
      state.users = Array.isArray(parsed.users) ? parsed.users : [];
      state.loggedInUser =
        (parsed.loggedInUser &&
          state.users.find((us) => us.email === parsed.loggedInUser.email)) ||
        null;
    } else {
      console.log("No state found in sessionStorage");
    }
  } catch (error) {
    console.error("Failed to load state from sessionStorage:", error);
  }
};

// Save state to sessionStorage
export const saveState = () => {
  try {
    sessionStorage.setItem("authState", JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save state to sessionStorage:", error);
  }
};

// Initialize state
loadState();

export const loginInfo = function (user) {
  const [email, password] = user;

  const foundUser = state.users.find(
    (us) => us.email === email && us.password === password
  );

  if (!foundUser) {
    return null; // Invalid credentials
  }

  if (foundUser.condition) {
    return null; // Already logged in
  }

  foundUser.condition = true;
  state.loggedInUser = foundUser;
  saveState();
  return foundUser.email;
};

export const register = function (user) {
  const [email, password] = user;

  if (state.users.some((us) => us.email === email)) {
    return null; // Email already exists
  }

  const newUser = {
    email,
    password,
    condition: false,
  };
  state.users.push(newUser);
  saveState();
  return newUser.email;
};

export const logout = function (email) {
  const foundUser = state.users.find((us) => us.email === email);

  if (foundUser && foundUser.condition) {
    foundUser.condition = false;
    state.loggedInUser = null;
    saveState();
    return foundUser;
  }
  return null;
};

export const isLoggedIn = function () {
  return !!state.loggedInUser;
};

export const getLoggedInUserEmail = function () {
  return state.loggedInUser ? state.loggedInUser.email : null;
};

export const clearState = () => {
  sessionStorage.removeItem("authState");
  state.users = [];
  state.loggedInUser = null;
  saveState();
  console.log("Cleared state and sessionStorage");
};

// Save credentials on successful sign-in using sessionStorage.setItem
function authenticate(jwt, next) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(jwt))
  }

  next()
}

// Retrive credentials if signed-in already, using sessionStorage.getItem
function isAuthenticated() {
  if (typeof window === 'undefined') {
    return false
  }

  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'))
  }
  return false
}

// Delet credentials on sign-out using sessionStorage.removeItem
function logout(next) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt')
  }

  next()
}

function saveCredentials(credentials) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('credentials', JSON.stringify(credentials))
  }
}

function useCredentials() {
  if (typeof window === "undefined") {
    return false;
  }

  if (localStorage.getItem("credentials")) {
    return JSON.parse(localStorage.getItem("credentials"));
  }

  return false;
}

function removeCredentials(next) {
  if (typeof window !== "undefined") {
    localStorage.removeItem("credentials");
  }

  next();
}


export {
  authenticate,
  isAuthenticated,
  logout,
  saveCredentials,
  useCredentials,
  removeCredentials,
}

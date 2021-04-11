// checks if password value is longer than or equal to 6 characters, has no spaces
// and contains letters and numbers
const passwordValidation = (value) => {
  const spaces = /^\S*$/;
  const validPassword = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
  if (!validPassword.test(value) || !spaces.test(value) || value.length < 6) {
    return false;
  }
  return true;
};

// Checks if email is a valid email
const emailValidation = (email) => {
  const validEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (!validEmail.test(email)) return false;
  return true;
};

// checks if value is longer than or equal to 5 characters plus no spaces
const generalValidation = (value) => {
  return (value.length >= 5) ? true : false;
};

const isLogin = () => {
  return localStorage.getItem('loggedUser') ? true : false
};

module.exports = {
  passwordValidation,
  emailValidation,
  isLogin,
  generalValidation
};
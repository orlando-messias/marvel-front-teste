// return valid if input value is longer than or equal to 3 characteres
const searchInputValidation = (value) => {
  return (value.length >= 3) ? true : false;
};

module.exports = {
  searchInputValidation
};
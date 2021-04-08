const searchInputValidation = (value) => {
  return (value.length >= 3) ? true : false;
};

module.exports = {
  searchInputValidation
};
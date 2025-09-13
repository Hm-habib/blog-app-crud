const bcrypt = require("bcrypt");
const saltComplex = 10;

const encryptPassword = async (password) => {
  let salt = await bcrypt.genSalt(saltComplex);
  return await bcrypt.hash(password, salt);
};




module.exports = { encryptPassword } 
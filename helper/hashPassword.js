import bcrypt from "bcrypt";

// Create Hash Passwoord
const createHashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

// Export
export default createHashPassword;

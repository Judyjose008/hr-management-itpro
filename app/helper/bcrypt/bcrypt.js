const bcrypt = require('bcrypt');


const hashPassword = async (password) => {
   return await bcrypt.hash(password, 10);
}
//compare password
const validatePassword = async (recievedPassword, orginalPassword) => {
   try {
      return await bcrypt.compare(recievedPassword, orginalPassword);
   } catch (error) {
      throw error;
   }
}
module.exports = {
   hashPassword,
   validatePassword
}
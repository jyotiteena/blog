const bcrypt = require('bcryptjs');
const comparePassword = async (inputPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(inputPassword, hashedPassword);
    }
    catch (err) {
        throw new Error("comparison failed", err)
    }
}
module.exports = comparePassword;
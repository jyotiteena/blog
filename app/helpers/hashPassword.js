const bcrypt= require('bcryptjs');
const hashPassword= async(password)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password,salt);
    }catch(err){
        throw new Error("hasing error",err)
    }
}

module.exports = hashPassword;
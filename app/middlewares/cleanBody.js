const sanitize = require('mongo-sanitize');
const cleanBody = (req,res,next)=>{
    try{
        req.body = sanitize(req.body);
        next();
    }
    catch(err){
        return res.status(500).json({
            error:true,
            message:"could not sanitize body"
        })
    }
}
module.exports = cleanBody;
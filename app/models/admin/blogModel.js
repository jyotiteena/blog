const {Schema,model} = require('mongoose');

const blogsSchema = new Schema({
    blog_category:{
        type:String,
        required:true,
        trim: true
    },
    blog_title:{
        type:String,
        required:true,
        trim: true
    },
    blog_desc:{
        type:String,
        required:false,
        trim: true
    },
    blog_image:{
        type:String,
        required:false,
        trim: true
    }

}, { timestamps: true })

const blogs = model("blogs",blogsSchema);
module.exports = blogs;
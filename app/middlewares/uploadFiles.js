const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "blog_image") {
            cb(null, './upload/blog')
        }
    },
    filename: (req, file, cb) => {
        if (file.fieldname==="blog_image"){
            cb(null,file.fieldname+Date.now()+path.extname(file.originalname));
        }
    }
});

const upload = multer({
    storage,
    limits:{
        fileSize: 1024*1024*10
    },
    fileFilter:(req,file,cb)=>{
        checkFileType(file,cb)
    }
})
function checkFileType(file, cb){
    if(file.fieldname === "blog_image"){
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'||
            fiel.mimetype==='image/svg'
          ) { 
            cb(null, true);
          } else {
            cb(null, false); 
          }
    }
}

module.exports = upload;
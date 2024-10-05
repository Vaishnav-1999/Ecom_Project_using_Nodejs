// 1.Import Multer
import multer from 'multer';

// 2.Configure Storage with file name 
const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,new Date().toISOString().replace(/:/g, '-') +'_'+ file.originalname);
    },
    destination:(req,file,cb) =>{
        cb(null,'./uploads/');
    }
    
})

export const upload = multer({storage:storage});

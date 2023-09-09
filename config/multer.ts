import multer from 'multer'

const uploadFile = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req: any, file: any, cb: any) => {
    cb(null, true)
  },
})

export default uploadFile

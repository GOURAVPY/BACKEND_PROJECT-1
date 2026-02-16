import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, fill, cd) {
    cd(null, './public/temp');
  },
  filename: function (req, file, cb) {
    cb(null, fill.originalname);
  },
});

export const upload = multer({
  storage,
});

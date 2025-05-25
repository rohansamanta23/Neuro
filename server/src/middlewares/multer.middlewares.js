import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + "profile-picture");
  },
});

const upload = multer({ storage: storage });

export default upload;
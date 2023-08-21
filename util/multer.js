import multer from "multer";

// Create Disk Storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "user-photo") {
      cb(null, "public/images/user/");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// User Photo Upload Middleware
export const userPhotoUploadMulter = multer({ storage }).single("user-photo");

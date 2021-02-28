import { Router } from "express";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import * as controllers from "./controllers";

const {
  DEV_AWSAccessKeyId,
  DEV_AWSSecretKey,
  DEV_BUCKET_NAME,
  PROD_AWSAccessKeyId,
  PROD_AWSSecretKey,
  PROD_BUCKET_NAME,
  NODE_ENV,
} = process.env;

const router = Router();
AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: NODE_ENV === "dev" ? DEV_AWSAccessKeyId : PROD_AWSAccessKeyId,
  secretAccessKey: NODE_ENV === "dev" ? DEV_AWSSecretKey : PROD_AWSSecretKey,
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: NODE_ENV === "dev" ? DEV_BUCKET_NAME : PROD_BUCKET_NAME,
    key(req, file, cb) {
      const exe = file.mimetype.split("/")[1];
      cb(null, `posts/${Date.now()}.${exe}`);
    },
  }),
});

// 이미지 추가
router.post("/", upload.single("image"), controllers.uploadImage);

export default router;

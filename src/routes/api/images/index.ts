import { Router } from "express";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import * as controllers from "./controllers";

const { AWSAccessKeyId, AWSSecretKey } = process.env;
const router = Router();
AWS.config.update({ region: "ap-northeast-2", accessKeyId: AWSAccessKeyId, secretAccessKey: AWSSecretKey });

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "charmingcheol",
    key(req, file, cb) {
      const exe = file.mimetype.split("/")[1];
      cb(null, `posts/${Date.now()}.${exe}`);
    },
  }),
});

// 이미지 추가
router.post("/", upload.single("image"), controllers.uploadImage);

export default router;

import { S3Client, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';
import { Express } from 'express';

const s3Client = new S3Client({ region: 'ap-northeast-2', credentials: fromIni({ profile: 'default' }) });

export const createPutCommandInput = (file: Express.Multer.File): PutObjectCommandInput => ({
  Bucket: process.env.AWS_S3_BUCKET_NAME,
  Key: file.originalname,
  Body: file.buffer,
});

export default s3Client;

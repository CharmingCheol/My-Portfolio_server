import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { fromIni } from '@aws-sdk/credential-providers';

@Injectable()
class AwsS3Service {
  private S3Client: S3Client;

  constructor() {
    this.S3Client = new S3Client({
      region: 'ap-northeast-2',
      credentials: fromIni({ profile: 'default' }),
    });
  }

  public async upload(file: Express.Multer.File): Promise<string> {
    try {
      const command = this.createPutCommand(file);
      await this.S3Client.send(command);
      return await getSignedUrl(this.S3Client, command, { expiresIn: 3600 });
    } catch (error) {
      throw error;
    }
  }

  private createPutCommand(file: Express.Multer.File) {
    return new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
    });
  }
}

export default AwsS3Service;

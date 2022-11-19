import { Injectable, ConsoleLogger } from '@nestjs/common';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { fromIni } from '@aws-sdk/credential-providers';

@Injectable()
class AwsS3Service {
  private S3Client: S3Client;

  constructor(private logger: ConsoleLogger) {
    this.S3Client = new S3Client({
      region: 'ap-northeast-2',
      credentials: fromIni({ profile: 'default' }),
    });
  }

  public async upload(file: Express.Multer.File): Promise<string> {
    try {
      await this.S3Client.send(this.createPutCommand(file));
      const signedUrl = await getSignedUrl(this.S3Client, this.createGetCommand(file), { expiresIn: 3600 });
      this.logger.log(signedUrl);
      return signedUrl;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private createGetCommand(file: Express.Multer.File) {
    return new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: file.originalname,
    });
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

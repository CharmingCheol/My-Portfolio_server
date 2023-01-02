import { Injectable, ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';

@Injectable()
class AwsS3Service {
  private S3Client: S3Client;

  constructor(private logger: ConsoleLogger, private configService: ConfigService) {
    this.S3Client = new S3Client({
      region: 'ap-northeast-2',
      credentials: fromIni({ profile: 'default' }),
    });
  }

  public async upload(file: Express.Multer.File): Promise<string> {
    try {
      const imageName = this.createImageName(file.mimetype);
      await this.S3Client.send(this.createPutCommand({ ...file, originalname: imageName }));
      return this.getImageUrl(imageName);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private createImageName(mimetype: string): string {
    const filename = new Date().getTime();
    const extension = mimetype.split('/')[1]; // ex) image/png, image/jpg
    return `${filename}.${extension}`;
  }

  private createPutCommand(file: Express.Multer.File) {
    return new PutObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: file.originalname,
      Body: file.buffer,
    });
  }

  private getImageUrl(imageName: string): string {
    const bucket = this.configService.get('AWS_S3_BUCKET_NAME');
    return `https://s3.ap-northeast-2.amazonaws.com/${bucket}/${imageName}`;
  }
}

export default AwsS3Service;

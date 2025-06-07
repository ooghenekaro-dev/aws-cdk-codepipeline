import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class storageStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3.Bucket(this, 'bucket', {
      bucketName: 'guguru-kuvuki-bucket',
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED
    });

  }
}
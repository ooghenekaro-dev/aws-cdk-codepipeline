import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, InlineCode, Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, StageName: string, props?: StackProps) {
    super(scope, id, props);

    new Function(this, 'LambdaFunction', {
      runtime: Runtime.NODEJS_22_X,
      code: Code.fromAsset(path.join(__dirname, '..', 'lambda')),
      handler: 'index.handler',
      environment: {
        StageName: StageName
      }
    });
  }
}

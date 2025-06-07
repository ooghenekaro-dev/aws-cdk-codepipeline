import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaStack } from './lambda-stack';
import { storageStack } from './storage-stack';

export class CdkPipelineStage extends Stage {  constructor(scope: Construct, id: string, StageName: string, props?: StageProps) {
    super(scope, id, props);

    new LambdaStack(this, 'LambdaStack', StageName);
    new storageStack(this, 'StorageStack', StageName);
  }}
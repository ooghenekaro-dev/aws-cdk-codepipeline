import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'Pipeline', {
      pipelineName: 'GuguruPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('ooghenekaro-dev/aws-cdk-codepipeline', 'main', {
          connectionArn: 'arn:aws:codeconnections:eu-west-2:233535120968:connection/a87a8ab2-a00d-43ba-bdd9-b7978f3db375' // Created using the AWS console
        }),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ]
      })
    });

    // example resource
    // const queue = new sqs.Queue(this, 'CdkPipelineQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });


  }}
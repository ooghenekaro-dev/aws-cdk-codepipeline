
/*import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { CdkPipelineStage } from './stage';
import { ManualApprovalAction } from 'aws-cdk-lib/aws-codepipeline-actions';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const pipeline = new CodePipeline(this, 'Pipeline', {
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

    //const dev = pipeline.addStage(new CdkPipelineStage(this, 'dev', 'dev'));
    const devStage = pipeline.addStage(new CdkPipelineStage(this, 'dev', 'dev'));


    const prod = pipeline.addStage(new CdkPipelineStage(this, 'prod', 'prod'));


    // example resource
    // const queue = new sqs.Queue(this, 'CdkPipelineQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    prod.addPre(new ManualApprovalStep('PromoteToProd'));
    const manualApproval = new ManualApprovalStep('ManualApproval');

    const buildProject = new codebuild.Project(this, 'MyBuildProject', {
      projectName: 'GuguruBuildProject',
      source: codebuild.Source.codeCommit({
        repositoryName: 'aws-cdk-codepipeline', 
      }),
    });

    const region = cdk.Stack.of(this).region;
    const reportGroupName = `${buildProject.projectName}-ReportGroup`;
    const reportGroupUrl = `https://${region}.console.aws.amazon.com/codesuite/codebuild/${buildProject.projectName}/report-groups/${reportGroupName}/reports?region=${region}`;

    // ✅ Add the approval step with report link
    prod.addPre(new ManualApprovalStep('PromoteToProd', {
      comment: [
        '🔍 Review the test results before promoting to production.',
        `🧪 CodeBuild Report: ${reportGroupUrl}`
      ].join('\n'),
    }));

  }
}

*/


import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep, ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { CdkPipelineStage } from './stage';

export class CdkPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'GuguruPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('ooghenekaro-dev/aws-cdk-codepipeline', 'main', {
          connectionArn: 'arn:aws:codeconnections:eu-west-2:233535120968:connection/a87a8ab2-a00d-43ba-bdd9-b7978f3db375',
        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });

    // Dev stage
    const devStage = pipeline.addStage(new CdkPipelineStage(this, 'dev', 'dev'));

    // Prod stage with manual approval and CodeBuild report link
    const prodStage = pipeline.addStage(new CdkPipelineStage(this, 'prod', 'prod'));

    const region = cdk.Stack.of(this).region;
    const accountId = cdk.Stack.of(this).account;
    const codebuildProjectName = 'GuguruPipelineBuildSynth'; // auto-generated CodeBuild project name

    const reportGroupName = `${codebuildProjectName}-ReportGroup`;
    const reportGroupUrl = `https://${region}.console.aws.amazon.com/codesuite/codebuild/${accountId}/projects/${codebuildProjectName}/report-groups/${reportGroupName}/reports?region=${region}`;

    prodStage.addPre(new ManualApprovalStep('PromoteToProd', {
      comment: [
        '🔍 Review the test results before promoting to production.',
        `🧪 [View CodeBuild Report](${reportGroupUrl})`
      ].join('\n'),
    }));
  }
}



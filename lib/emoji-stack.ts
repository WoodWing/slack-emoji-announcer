import { LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';
import { Function as LambdaFn, Runtime, Code } from '@aws-cdk/aws-lambda';
import { Secret } from '@aws-cdk/aws-secretsmanager';
import { Stack, Construct, StackProps } from '@aws-cdk/core';

export class EmojiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const details = Secret.fromSecretNameV2(this, 'emoji-announcer-details', 'emoji-announcer-details');

    const handler = new LambdaFn(this, 'EmojiHandler', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('dist', {}),
      environment: {
        SLACK_SIGNING_KEY: details.secretValueFromJson('SLACK_SIGNING_KEY').toString(),
        SLACK_WEBHOOK_URL: details.secretValueFromJson('SLACK_WEBHOOK_URL').toString(),
      },
      handler: 'handler.handle',
    });

    const api = new RestApi(this, 'EmojiApi');

    const apiRoute = new LambdaIntegration(handler, {
      requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
    });

    api.root.addMethod('POST', apiRoute);
  }
}

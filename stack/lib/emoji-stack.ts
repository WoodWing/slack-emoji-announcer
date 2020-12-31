import { LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';
import { Function as LambdaFn, Runtime, Code } from '@aws-cdk/aws-lambda';
import { Stack, Construct, StackProps } from '@aws-cdk/core';

export class EmojiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const handler = new LambdaFn(this, 'EmojiHandler', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset('dist', {}),
      handler: 'handler.handle'
    });

    const api = new RestApi(this, 'EmojiApi');

    const apiRoute = new LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    api.root.addMethod('POST', apiRoute);
  }
}

import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Stack from '../lib/emoji-stack';

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Stack.EmojiStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  );
});

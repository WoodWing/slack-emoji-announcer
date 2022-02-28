# Slack-emoji-announcer
Posts announcements to a configured slack channel when new emojis are created.

When configuring the app in Slack, make sure to subscribe to the `emoji_changed` event and create an incoming webhook to your selected channel. Make sure to create a `emoji-announcer-details` secret in AWS Secrets Manager containing `SLACK_SIGNING_KEY` and `SLACK_WEBHOOK_URL` properties.  

## AWS Infra
![infra](infra.svg)

## Useful commands

 * `npm run build`   bundles compiled typescript
 * `npm run build:watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

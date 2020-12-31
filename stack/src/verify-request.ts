import { verifyRequestSignature } from '@slack/events-api';

export const verifyRequest = (headers: { [key: string]: any }, body: any) => {
  try {
    const requestSignature = headers['X-Slack-Signature'] as string;
    const requestTimestamp = headers['X-Slack-Request-Timestamp'] as string;
    if (!requestSignature || !requestTimestamp) throw 'Slack request signing verification failed';

    const params = {
      signingSecret: process.env.SLACK_SIGNING_SECRET || '',
      requestSignature,
      requestTimestamp: parseInt(requestTimestamp, 10),
      body,
    };

    return verifyRequestSignature(params);
  } catch (e) {
    console.log(e);
    return false;
  }
};

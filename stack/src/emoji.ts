import axios from 'axios';
import { verifyRequestSignature } from '@slack/events-api';

export const handleEvent = async (headers: { [key: string]: any }, body: any) => {
  try {
    const requestSignature = headers['X-Slack-Signature'] as string;
    const requestTimestamp = headers['X-Slack-Request-Timestamp'] as string;
    if (!requestSignature || !requestTimestamp) throw 'Slack request signing verification failed';

    verifyRequestSignature({
      signingSecret: process.env.SLACK_SIGNING_SECRET || '',
      requestSignature,
      requestTimestamp: parseInt(requestTimestamp, 10),
      body,
    });
  } catch (e) {
    console.log(e);
    return {};
  }

  switch (body.type) {
    case 'url_verification':
      return handleUrlVerification(body);
    case 'event_callback':
      if (body.event.type === 'emoji_changed') await handleEmojiChanged(body.event);
    default:
      return {};
  }
};

const handleUrlVerification = (body: any) => {
  return {
    challenge: body.challenge,
  };
};

interface EmojiChangedEvent {
  subtype: string;
  name: string;
  names: string[];
}

export const handleEmojiChanged = async (event: EmojiChangedEvent) => {
  const { subtype, name, names } = event;

  switch (subtype) {
    case 'add':
      await handleAddEmoji(name);
      break;
    case 'remove':
      await handleRemoveEmojis(names);
      break;
  }
};

const handleAddEmoji = async (name: string) => {
  await sendMessage(`The emoij :${name}: has been added!`);
};

const handleRemoveEmojis = async (names: string[]) => {
  const multiple = names.length > 1;

  await sendMessage(
    `The emoij${multiple ? 's' : ''} ${names.join(', ')} ${multiple ? 'have' : 'has'} been removed!`
  );
};

const sendMessage = async (text: string) => {
  console.log(text);

  if (!process.env.SLACK_WEBHOOK_URL)
    return console.log('No webhook url configured. Unable to post emoji announcement message.');

  await axios.post(process.env.SLACK_WEBHOOK_URL, JSON.stringify({ text })).catch((e) => {
    console.log('Posting announcement to slack channel failed!', e);
  });
};

import { createEventAdapter } from '@slack/events-api';
import dotenv from 'dotenv';
import { handleEmojiChanged } from './emoji-handler';

dotenv.config();

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);

slackEvents.on('emoji_changed', handleEmojiChanged);
slackEvents.on('error', console.log);

(async () => {
    const port = parseInt(process.env.PORT) || 3000;
    await slackEvents.start(port);
    console.log(`Listening for events on ${port}`);
})();
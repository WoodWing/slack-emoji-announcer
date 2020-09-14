# slack-emoji-announcer
Posts messages to configured channel when emojis are added to your workspace. 

When configuring the app in Slack, make sure to subscribe to the `emoji_changed` event and create an incoming webhook to your selected channel. Copy the `.env.dist` file to `.env` and add the signing secret and webhook url for your app to it.

Run `npm install` and `npm run dev` to start developing.

To run the emoji-announcer in production, either install `ts-node` globally and run `ts-node server.ts` or run `npm run build` and run `node ./dist/server.js`.

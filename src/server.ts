import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { handleEmojiChanged } from './emoji-handler';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.post('/', (req, res, next) => {
    if (!req.body || !req.body.type) return res.status(200).send('ok');

    switch (req.body.type) { 
        case 'url_verification': 
            res.status(200).send(res.json({challenge: req.body.challenge}));
            break;
        case 'event_callback':
            res.status(200).send();
            if (req.body.event.type === 'emoji_changed') handleEmojiChanged(req.body.event);
            break;
        default:
            res.status(200).send();
            break;
    }
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Started listening on port ${port}`);
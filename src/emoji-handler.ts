import axios from 'axios';

interface EmojiChangedEvent {
    subtype: string;
    name: string;
    names: string[];
}

export const handleEmojiChanged = (event: EmojiChangedEvent) => {
    const { subtype, name, names } = event;
    
    switch (subtype) {
        case 'add':
            handleAddEmoji(name);
            break;
        case 'remove':
            handleRemoveEmojis(names);
            break;
    }
};

const handleAddEmoji = (name: string) => {
    sendMessage(`The emoij :${name}: has been added!`);
};

const handleRemoveEmojis = (names: string[]) => {
    const multiple = names.length > 1;

    sendMessage(`The emoij${ multiple ? 's' : ''} ${names.join(', ')} ${multiple ? 'have' : 'has'} been removed!`);
};

const sendMessage = (text: string) => {
    console.log(text);

    if (!process.env.SLACK_WEBHOOK_URL) return console.log('No webhook url configured. Unable to post emoji announcement message.');

    axios.post(process.env.SLACK_WEBHOOK_URL, JSON.stringify({text}))
        .catch(e => {
            console.log('Posting announcement to slack channel failed!', e);
        });
};
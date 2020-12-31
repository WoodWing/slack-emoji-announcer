export const handleEvent = (headers: any, body: any) => {
    return JSON.stringify(body.challenge);
};
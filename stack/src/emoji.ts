export const handleEvent = (headers: any, body: any) => {
  return {
    challenge: body.challenge,
  };
};

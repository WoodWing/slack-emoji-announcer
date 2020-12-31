import { handleEvent } from './emoji';

export const handle = async (event: any) => {
  try {
    var method = event.httpMethod;

    if (method === 'POST' && event.path === '/') {
      let body;
      try {
        body = JSON.stringify(handleEvent(event.headers, JSON.parse(event.body)));
      } catch (e) {
        console.log('failed to parse event body:', e);
      }

      return {
        statusCode: 200,
        headers: { 'Content-type': 'application/json' },
        body,
      };
    }

    return {
      statusCode: 400,
      headers: {},
      body: 'We only accept POST /',
    };
  } catch (error) {
    var body = error.stack || JSON.stringify(error, null, 2);
    return {
      statusCode: 400,
      headers: {},
      body: JSON.stringify(body),
    };
  }
};

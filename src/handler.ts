import { handleEvent } from './emoji';
import { verifyRequest } from './verify-request';

export const handle = async (event: any) => {
  try {
    var method = event.httpMethod;

    if (method === 'POST' && event.path === '/') {
      if (!verifyRequest(event.headers, event.body)) return { statusCode: 200 };

      let body;
      try {
        body = JSON.stringify(await handleEvent(JSON.parse(event.body)));
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

import { verifyHeaders } from "/opt/slackUtils.mjs";
export const handler = async (event, context) => {
  verifyHeaders(event.headers, event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Headers OK",
    }),
  };
};

const { verifyHeaders } = require("/opt/slackutils");

const handler = async (event, context) => {
  const verificationResult = verifyHeaders(event.headers, event.body);
  if (verificationResult === true) {
    return {
      statusCode: 400,
      text: verificationResult,
    };
  }
};

module.exports = {
  handler,
};

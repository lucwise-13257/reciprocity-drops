const { verifyHeaders } = require("/opt/slackutils");

const handler = async (event, context) => {
  const verificationResult = verifyHeaders(event.headers, event.body);
  if (verificationResult !== true) {
    return sendResponse(200, {
      response_type: "ephemeral",
      blocks: [
        {
          type: "section",
          text: {
            type: "plain_text",
            text: verificationResult,
            emoji: true,
          },
        },
      ],
    });
  }
  // Send message to SQS Queue

  // Inform user the request was recieved.
  return sendResponse(200, {
    response_type: "in_channel",
    blocks: [
      {
        type: "section",
        text: {
          type: "plain_text",
          text: "Processing request.",
          emoji: true,
        },
      },
    ],
  });
};

/**
 * Sends a response with the specified status code and body.
 *
 * @param {number} code - The status code of the response.
 * @param {any} body - The body of the response.
 * @returns {object} - The response object.
 */
function sendResponse(code, body) {
  return {
    statusCode: code,
    body: JSON.stringify(body),
  };
}

module.exports = {
  handler,
};

const crypto = require("crypto");

/**
 *  Send messages in specified channels
 *
 * @param {string} channel - The channel ID to put the message in
 * @param {string} message - The message paylaod
 */
const sendMessage = (channel, message) => {};

/**
 * Verifies requests are coming from slack
 *
 * @param {string} headers
 * @param {Object} body
 */

const verifyHeaders = (headers, body) => {
  const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
  const timestamp = headers["X-Slack-Request-Timestamp"];
  const signature = headers["X-Slack-Signature"];
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const requestTimestamp = parseInt(timestamp, 10);
  const fiveMinutesInSeconds = 5 * 60;

  if (currentTimestamp - requestTimestamp > fiveMinutesInSeconds) {
    return "Request timestamp is more than five minutes old";
  }

  const basestring = `v0:${timestamp}:${body}`;
  const hmac = crypto.createHmac("sha256", slackSigningSecret);
  const calculatedSignature = `v0=${hmac.update(basestring).digest("hex")}`;
  console.log(signature, calculatedSignature);

  if (signature !== calculatedSignature) {
    return "Invalid request signature";
  } else {
    return true;
  }
};

module.exports = {
  sendMessage,
  verifyHeaders,
};

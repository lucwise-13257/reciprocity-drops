const testFolder = "/opt/";
const fs = require("fs");

fs.readdirSync(testFolder).forEach((file) => {
  console.log(file);
});

const { verifyHeaders } = require("/opt/slackutils");
const handler = async (event, context) => {
  verifyHeaders(event.headers, event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Headers OK",
    }),
  };
};

module.exports = {
  handler,
};

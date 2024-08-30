const testFolder = "/opt/";
import fs from "fs";

fs.readdirSync(testFolder).forEach((file) => {
  console.log(file);
});

import { verifyHeaders } from "/opt/slackutils";
export const handler = async (event, context) => {
  verifyHeaders(event.headers, event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Headers OK",
    }),
  };
};

const { WebClient } = require("@slack/web-api");
const web = new WebClient(process.env.APITOKEN);
const fs = require("fs");
const handler = async (event, context) => {
  console.log("Recieved request.");
  for (const message of event.Records) {
    console.log("Processing request");
    await processMessageAsync(message);
  }
};

async function processMessageAsync(message) {
  try {
    await generateData();
    // Upload the data to the slack API
    await uploadFiles(process.env.CHANNEL_ID);
  } catch (err) {
    console.error(err);
  }
}

async function uploadFiles(channelId) {
  try {
    const csvFolder = "./CSVs";
    const files = fs
      .readdirSync(csvFolder)
      .filter((file) => file.endsWith(".csv"));
    const fileLinks = [];
    for (const file of files) {
      const filePath = `${csvFolder}/${file}`;
      const result = await web.filesUploadV2({
        channel_id: channelId,
        file: fs.createReadStream(filePath),
        filename: file,
        title: file,
      });
      console.log("Uploaded file");
      // console.log(`File uploaded: ${result.file.id}`);
      console.log(result.files);
      fileLinks.push({
        title: result.files[0].id,
        title_link: result.files[0].permaLink,
      });
    }

    // Post a single message with all uploaded files
    // await web.chat.postMessage({
    //   channel: channelId,
    //   text: `Files uploaded:`,
    //   attachments: uploadedFiles,
    // });
  } catch (e) {
    console.log(e);
  }
}

async function generateData() {
  // Generate the exported Data and dump into CSV Folder
  Promise.resolve("data"); // Placeholder for actual async stuff lol
}

module.exports = {
  handler,
};

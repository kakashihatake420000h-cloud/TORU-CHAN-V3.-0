const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "squeeze",
  version: "1.0.0",
  premium: true,
  hasPermssion: 2,
  credits: "Hridoy",
  description: "Squeeze the breast of the tagged user",
  commandCategory: "NSFW",
  usages: "[tag]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  const links = [
    "https://i.postimg.cc/tC2BTrmF/3.gif",
    "https://i.postimg.cc/pLrqnDg4/78d07b6be53bea612b6891724c1a23660102a7c4.gif",
    "https://i.postimg.cc/gJFD51nb/detail.gif",
    "https://i.postimg.cc/xjPRxxQB/GiC86RK.gif",
    "https://i.postimg.cc/L8J3smPM/tumblr-myzq44-Hv7-G1rat3p6o1-500.gif",
  ];

  const mentionIDs = Object.keys(event.mentions);

  if (mentionIDs.length === 0) 
    return api.sendMessage("Please tag 1 person", event.threadID, event.messageID);

  const taggedUserID = mentionIDs[0];
  const taggedName = event.mentions[taggedUserID].replace("@", "");

  const cachePath = __dirname + "/cache/bopvu.gif";

  const callback = () => {
    api.sendMessage({
      body: `${taggedName} 𝗬𝗼𝘂 𝗚𝗲𝘁 𝗬𝗼𝘂𝗿 𝗕𝗿𝗲𝗮𝘀𝘁 𝗦𝗾𝘂𝗲𝗲𝘇𝗲𝗱 😝`,
      mentions: [{ tag: taggedName, id: taggedUserID }],
      attachment: fs.createReadStream(cachePath)
    }, event.threadID, () => fs.unlinkSync(cachePath));
  };

  // Download random gif
  const gifURL = links[Math.floor(Math.random() * links.length)];
  request(encodeURI(gifURL)).pipe(fs.createWriteStream(cachePath)).on("close", () => callback());
};
module.exports.config = {
    name: "girlanime",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Hridoy",
    description: "random dp",
    commandCategory: "Image",
    usages: "send message",
    cooldowns: 5
};

module.exports.onStart = async function({ api, event }) {
    const fs = require("fs-extra");
    const request = require("request");

    const text = "Anime profile for you\nTag: anime girl";
    const links = [
        "https://i.imgur.com/qHuv5H8.jpg",
        "https://i.imgur.com/atYmQt0.jpg",
        "https://i.imgur.com/Kuz4Owe.jpg",
        "https://i.imgur.com/L9u9Si8.jpg",
        "https://i.imgur.com/2oGBtMi.jpg",
        "https://i.imgur.com/MWihsUp.jpg",
        "https://i.imgur.com/dPDFYxJ.jpg",
        "https://i.imgur.com/AiuPHQK.jpg",
        "https://i.imgur.com/6jKbMGx.jpg",
        "https://i.imgur.com/H0oXAje.jpg",
        "https://i.imgur.com/kKKwXkX.jpg",
        "https://i.imgur.com/F5CLGkl.jpg",
        "https://i.imgur.com/HKm2LKH.jpg",
        "https://i.imgur.com/egaTOK5.jpg",
        "https://i.imgur.com/vLGyXHX.jpg",
        "https://i.imgur.com/HqJuhTj.jpg",
        "https://i.imgur.com/VE6KEwT.jpg",
        "https://i.imgur.com/JLC36Uu.jpg",
        "https://i.imgur.com/qqt3KI1.jpg",
        "https://i.imgur.com/yImrkax.jpg",
        "https://i.imgur.com/sLzPtky.jpg",
        "https://i.imgur.com/vfCigSS.jpg",
        "https://i.imgur.com/WYVQRp1.jpg",
        "https://i.imgur.com/Y1djOm5.jpg",
        "https://i.imgur.com/e0mPXD9.jpg"
    ];

    const randomImage = links[Math.floor(Math.random() * links.length)];
    const path = __dirname + "/cache/temp.jpg";

    request(randomImage).pipe(fs.createWriteStream(path)).on("close", () => {
        api.sendMessage(
            { body: text, attachment: fs.createReadStream(path) },
            event.threadID,
            () => fs.unlinkSync(path)
        );
    });
};
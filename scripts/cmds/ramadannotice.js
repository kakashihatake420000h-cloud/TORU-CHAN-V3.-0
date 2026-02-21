.cmd install ramadan.js const axios = require("axios");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "ramadannotice",
    version: "5.0",
    author: "MOHAMMAD AKASH",
    role: 0,
    shortDescription: "Ramadan Auto Alert System",
    longDescription: "Sehri & Iftar Auto Alerts (District Based)",
    category: "Utility",
    guide: "{pn} district_name"
  },

  onStart: async function ({ api, event, args }) {

    if (!args[0]) {
      return api.sendMessage(
        "🌙 Use format:\n/ramadan district_name\nExample:\n/ramadan netrokona",
        event.threadID
      );
    }

    const district = args.join(" ").toLowerCase();
    global.ramadanGroups = global.ramadanGroups || {};
    global.ramadanGroups[event.threadID] = district;

    api.sendMessage(
`✅ Ramadan Auto System Activated

📍 District: ${district}
⏳ Sehri & Iftar alerts will be sent automatically.`,
      event.threadID
    );
  },

  onLoad: async function ({ api }) {

    global.ramadanGroups = global.ramadanGroups || {};

    setInterval(async () => {

      for (const threadID in global.ramadanGroups) {

        try {

          const district = global.ramadanGroups[threadID];

          const res = await axios.get(
            `https://api.aladhan.com/v1/timingsByCity?city=${district}&country=Bangladesh&method=1`
          );

          const data = res.data.data.timings;

          const now = moment().tz("Asia/Dhaka").format("HH:mm");

          const fajr = moment(data.Fajr, "HH:mm");
          const maghrib = moment(data.Maghrib, "HH:mm");

          const sehriWarn = fajr.clone().subtract(10, "minutes").format("HH:mm");
          const sehriTime = fajr.format("HH:mm");

          const iftarWarn = maghrib.clone().subtract(10, "minutes").format("HH:mm");
          const iftarTime = maghrib.format("HH:mm");

          let message = null;

          if (now === sehriWarn) {
            message =
`⏳ Sehri Reminder
🌙 10 minutes left for Sehri.
🤲 Prepare for fasting.`;
          }

          if (now === sehriTime) {
            message =
`🌅 Sehri Time Ended
✨ Fasting has begun.
🤍 Stay strong.`;
          }

          if (now === iftarWarn) {
            message =
`⏳ Iftar Reminder
🌙 Just 10 minutes left.
🤲 Stay patient.`;
          }

          if (now === iftarTime) {
            message =
`🍴 Iftar Time!
✨ Break your fast.
🌸 May Allah accept your fast.`;
          }

          if (!message) continue;

          await api.sendMessage(message, threadID);

        } catch (err) {
          console.log(err.message);
        }
      }

    }, 60000);
  }
};
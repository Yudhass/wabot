import moment from "moment-timezone";
moment.locale(global.bot.locale);

export default {
  cmd: "menu",
  description: "Menampilkan list perintah",
  onlyOwner: false,
  onlyPremium: false,
  handle: async (sock, m) => {
    await sock.sendMessage(
      m.chatId,
      {
        text: `*${(() => {
          const hours = moment.tz(global.bot.timezone).hours();
          if (hours >= 5 && hours < 12) {
            return "Hallo selamat pagi";
          } else if (hours >= 12 && hours < 15) {
            return "Hallo selamat siang";
          } else if (hours >= 15 && hours < 18) {
            return "Hallo selamat sore";
          } else {
            return "Hallo selamat malam";
          }
        })()}${m.pushName ? ` ${m.pushName}` : ""} 👋*
Berikut adalah beberapa perintah yang bisa anda gunakan:

┏━━ *𖮌 ALL MENU 𖮌*
┃┏━━━━━━━━━━━━━━━━━━━━
┃┃ ⨳ *\`${global.bot.prefix}addprem\`*
┃┃ ⨳ *\`${global.bot.prefix}delprem\`*
┃┃ ⨳ *\`${global.bot.prefix}public\`*
┃┃ ⨳ *\`${global.bot.prefix}self\`*
┃┃ ⨳ *\`${global.bot.prefix}readstory\`*
┃┃ ⨳ *\`${global.bot.prefix}anticall\`*
┃┃ ⨳ *\`${global.bot.prefix}restart\`*
┗━━━━━━━━━━━━━━━━━━━━━
        `,
      },
      {
        quoted: global.quoted,
      },
    );
  },
};

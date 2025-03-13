export default {
  cmd: "public",
  description: "Public command",
  onlyOwner: true,
  onlyPremium: false,
  handle: async (sock, m) => {
    global.setting.public = !global.setting.public;
    global.saveSetting();
    await m.reply(
      `Done, status public saat ini: ${global.setting.public ? "ACTIVE" : "INACTIVE"}`,
    );
  },
};

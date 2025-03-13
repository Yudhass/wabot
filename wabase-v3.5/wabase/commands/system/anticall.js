export default {
  cmd: "anticall",
  description: "Anticall",
  onlyOwner: true,
  onlyPremium: false,
  handle: async (sock, m) => {
    global.setting.anticall = !global.setting.anticall;
    global.saveSetting();
    await m.reply(
      `Done, status anticall saat ini: ${global.setting.anticall ? "ACTIVE" : "INACTIVE"}`,
    );
  },
};

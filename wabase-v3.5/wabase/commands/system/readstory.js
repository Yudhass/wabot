export default {
  cmd: "readstory",
  description: "Read story",
  onlyOwner: true,
  onlyPremium: false,
  handle: async (sock, m) => {
    global.setting.readstory = !global.setting.readstory;
    global.saveSetting();
    await m.reply(
      `Done, status anticall saat ini: ${global.setting.readstory ? "ACTIVE" : "INACTIVE"}`,
    );
  },
};

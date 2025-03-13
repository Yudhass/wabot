export default {
  cmd: "self",
  description: "Self mode",
  onlyOwner: true,
  onlyPremium: false,
  handle: async (sock, m) => {
    global.setting.self = !global.setting.self;
    global.saveSetting();
    await m.reply(
      `Done, status self saat ini: ${global.setting.self ? "ACTIVE" : "INACTIVE"}`,
    );
  },
};

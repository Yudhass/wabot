export default {
  cmd: "addprem",
  description: "Add premium user",
  onlyOwner: true,
  onlyPremium: false,
  handle: async (sock, m) => {
    if (!m.args[0]) return m.replyError("Nomor dibutuhkan");
    const number = m.args[0].replace(/\D/g, "");
    const jid = (await sock.onWhatsApp(`${number}@s.whatsapp.net`))[0]?.jid;
    if (!jid)
      return m.replyError(`Nomor ${m.args[0]} tidak terdaftar di whatsapp`);
    let user = global.db.users.find((user) => user.id === jid);
    if (!user) {
      user = {
        id: jid,
        premium: true,
      };
      global.db.users.push(user);
    }
    user.premium = true;
    global.db.save("users");
    await m.reply(
      `Done, ${m.args[0]} tlah berhasil ditambahkan menjadi premium user`,
    );
  },
};

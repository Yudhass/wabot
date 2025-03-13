export default {
  cmd: "delprem",
  description: "Del premium user",
  onlyOwner: true,
  onlyPremium: false,
  handle: async (sock, m) => {
    if (!m.args[0]) return m.replyError("Nomor dibutuhkan");
    const number = m.args[0].replace(/\D/g, "");
    const jid = (await sock.onWhatsApp(`${number}@s.whatsapp.net`))[0]?.jid;
    if (!jid)
      return m.replyError(`Nomor ${m.args[0]} tidak terdaftar di whatsapp`);
    let user = global.db.users.find((user) => user.id === jid);
    if (!user) return m.replyError("Nomor ini belum terdaftar");
    user.premium = false;
    global.db.save("users");
    await m.reply(
      `Done, ${m.args[0]} tlah berhasil diubah status menjadi non premium user`,
    );
  },
};

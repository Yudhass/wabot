import fs from "fs";

const pkg = JSON.parse(fs.readFileSync("./package.json"));

global.dev = process.env.NODE_ENV === "development";

/// BOT CONFIGURATION
global.bot = {
  name: "Wabase",
  number: "",
  version: pkg.version,
  prefix: ".",
  locale: "id",
  timezone: "Asia/Jakarta",
  adsUrl: "",
  newsletterJid: "",
  expiredAt: "",
};

/// BOT SETTING
global.setting = JSON.parse(fs.readFileSync("./system/config/setting.json"));
global.saveSetting = () =>
  fs.writeFileSync(
    "./system/config/setting.json",
    JSON.stringify(global.setting),
  );

/// OWNER INFORMATION
global.owner = {
  name: "Yudhass",
  number: "6282328036442",
};

global.db = {
  users: JSON.parse(fs.readFileSync("./system/data/users.json")),
  save: (name) => {
    switch (name.toLowerCase()) {
      case "users":
        fs.writeFileSync(
          "./system/data/users.json",
          JSON.stringify(global.db.users),
        );
        break;
    }
  },
};

global.images = {};

global.mess = {
  dev: "Masih dalam tahap pengembangan",
};

global.quoted = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast",
  },
  message: {
    conversation: `✅ ${global.bot.name} - ${global.owner.name}`,
  },
};

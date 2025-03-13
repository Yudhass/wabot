import chalk from "chalk";

export default async function cases(sock, m) {
  switch (m.cmd) {
    default:
      for (let command of global.bot.commands) {
        if (command.cmd === m.cmd) {
          try {
            if (command.onlyOwner && !m.isOwner && !m.fromMe) return;
            if (command.onlyPremium && !m.isOwner && !m.fromMe && !m.isPremium)
              return;
            console.log(
              `${chalk.bgBlueBright.bold.white("\x20COMMAND\x20")}\x20${chalk.blueBright.bold(m.cmd)}\n- FROM: ${m.userId.split("@")[0]}\n- ARGS: ${m.args}\n- DESC: ${command.description}\n- PATH: ${command.path}`,
            );
            if (command.handle) await command.handle(sock, m);
          } catch (err) {
            console.log(err);
            m.replyError(err.message);
          }
          break;
        }
      }
      break;
  }
}

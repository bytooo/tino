import { harmony } from "../../deps.ts";

class PingCommand extends harmony.Command {
  name = "ping";

  execute(ctx: harmony.CommandContext) {
    ctx.message.reply(`Pong! \`${ctx.client.gateway.ping}ms\``);
  }
}

export default PingCommand;

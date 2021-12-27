import { harmony } from "../../deps.ts";

const guildJoinEvent = {
  name: "guildCreate",
  once: false,
  execute(guild: harmony.Guild) {
    console.log(`The client has joined the following guild: ${guild.name}`);
  },
};

export default guildJoinEvent;
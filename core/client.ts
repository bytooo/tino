import { harmony, path } from "../deps.ts";
import { CommandImport, EventImport } from "./types/types.ts";
import config from "./config/config.json" assert { type: "json" };

const __dirname = new URL(".", import.meta.url).pathname;

const commandsFolder = path.join(__dirname, "events");
const eventsFolder = path.join(__dirname, "commands");

const client = new harmony.CommandClient({
  prefix: config.prefix,
});

client.once("ready", () => {
  console.log(`Client ${client.user?.tag} ready.`);
});

// Event handler that goes through the "events" folder and imports all available events.
for await (const file of Deno.readDir(commandsFolder)) {
  const event: EventImport = await import(`${commandsFolder}/${file.name}`);
  if (event.default.once) {
    client.once(
      event.default.name,
      (...args) => event.default.execute(...args),
    );
  } else {
    client.on(event.default.name, (...args) => event.default.execute(...args));
  }
}

// Command handler that goes through the "commands" folder and imports all available commands.
for await (const file of Deno.readDir(eventsFolder)) {
  const command: CommandImport = await import(`${eventsFolder}/${file.name}`);
  client.commands.add(command.default);
  console.log(`${command.default.name} loaded.`);
}

client.connect(config.token, harmony.Intents.All);

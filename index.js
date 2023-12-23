require("dotenv").config();
const fs = require("node:fs");

const path = require("node:path");

const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready. Logged in as ${readyClient.user.tag}`);
});

client.login(token);

client.commands = new Collection();
client.cooldowns = new Collection();

const foldersPath = path.join(__dirname, "commands");
const folders = fs.readdirSync(foldersPath);

for (const folder of folders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `The command at ${filePath} is missing required 'data' or 'execute' props.`
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { cooldowns } = interaction.client;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matches ${interaction.commandName}.`);
  }

  if (!cooldowns.has(command.data.name)) {
    cooldowns.set(command.data.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.data.name);
  const defaultCdDuration = 3;
  const cdAmount = (command.cooldown ?? defaultCdDuration) * 1000;

  console.log(timestamps);
  if (timestamps.has(interaction.user.id)) {
    const expiration = timestamps.get(interaction.user.id) + cdAmount;

    if (now < expiration) {
      const expired = Math.round(expiration / 1000);
      return interaction.reply({
        content: `On cooldown, for ${command.data.name}, you can use it again in ${expired}.`,
        ephemeral: true,
      });
    }
  }
  console.log(interaction.user.id);

  timestamps.set(interaction.user.id, now);

  setTimeout(() => {
    timestamps.delete(interaction.user.id);
  }, cdAmount);

  try {
    await command.execute(interaction);
  } catch (error) {
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "Error executing the command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error executing the command",
        ephemeral: true,
      });
    }
  }
});

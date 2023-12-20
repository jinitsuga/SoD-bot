const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reset")
    .setDescription("Replies with next raid reset."),
  async execute(interaction) {
    await interaction.reply("resets on this date");
  },
};

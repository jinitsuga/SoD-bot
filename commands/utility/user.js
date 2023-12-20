const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("gives user info"),
  async execute(interaction) {
    console.log(interaction);
    await interaction.reply(
      `this command was run by ${interaction.user.username}, joined on ${interaction.member.joinedAt}`
    );
  },
};

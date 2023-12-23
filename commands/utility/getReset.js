const { SlashCommandBuilder } = require("discord.js");
const getTimes = require("../../utils/time");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("reset")
    .setDescription("Replies with next raid reset."),
  async execute(interaction) {
    const rightNow = Date.now();
    let nextReset = Date.parse("21 Dec 2023 10:00:00 EST");

    // Once rightNow is equal or lower than nextReset, nextReset gains 72 hours
    if (rightNow >= nextReset) {
      nextReset = nextReset + 72 * 3600000;
    }

    const nextDate = new Date(nextReset).toLocaleDateString();

    let timeLeft = nextReset - rightNow;

    let totalSeconds = timeLeft && Math.floor(timeLeft / 1000);

    const { daysLeft, hoursLeft, minutesLeft } = getTimes(totalSeconds);
    await interaction.reply(
      `BFD Resets on ${nextDate} -- (in ${daysLeft}d ${hoursLeft}h ${minutesLeft}m)`
    );
  },
};

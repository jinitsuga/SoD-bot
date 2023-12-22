const { SlashCommandBuilder } = require("discord.js");

const rightNow = Date.now();
let nextReset = Date.parse("21 Dec 2023 10:00:00 EST");

// Once rightNow is equal or lower than nextReset, nextReset gains 72 hours
if (rightNow >= nextReset) {
  nextReset = nextReset + 72 * 3600000;
}

let timeLeft = nextReset - rightNow;
console.log(timeLeft);

const nextDate = new Date(nextReset).toLocaleDateString();

let totalSeconds = timeLeft && Math.floor(timeLeft / 1000);

const daysLeft = totalSeconds && Math.floor(totalSeconds / 86400);
totalSeconds = daysLeft && Math.floor(totalSeconds - daysLeft * 86400);

const hoursLeft = totalSeconds && Math.floor(totalSeconds / 3600);
totalSeconds = hoursLeft && Math.floor(totalSeconds - hoursLeft * 3600);

const minutesLeft = totalSeconds && Math.floor(totalSeconds / 60);
totalSeconds = minutesLeft && Math.floor(totalSeconds - minutesLeft * 60);

setTimeout(() => {
  timeLeft = nextReset - rightNow;
}, 2000);

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("reset")
    .setDescription("Replies with next raid reset."),
  async execute(interaction) {
    await interaction.reply(
      `BFD Resets on ${nextDate} -- (in ${daysLeft}d ${hoursLeft}h ${minutesLeft}m)`
    );
  },
};

const getTimes = require("./time");

function checkTime() {
  let nextReset = Date.parse("24 Dec 2023 10:00:00 EST");

  const rightNow = Date.now();

  // Once rightNow is equal or lower than nextReset, nextReset gains 72 hours
  while (rightNow >= nextReset) {
    nextReset = nextReset + 72 * 3600000;
  }

  let timeLeft = nextReset - rightNow;

  // 48 hours to miliseconds = 172800000
  return timeLeft;
}

async function sendWarning(guilds, client) {
  await Promise.all(
    guilds.map(async (guildId) => {
      try {
        const guild = await client.guilds.fetch(guild);

        const writeableChannel = guild.channels.cache.find(
          (channel) =>
            channel.type === "GUILD_TEXT" &&
            channel.permissionsFor(client.user).has("SEND_MESSAGES")
        );
        if (writeableChannel) {
          await writeableChannel.send(
            "hola capos, se resetea bfd en menos de un dia"
          );
        }
      } catch (error) {
        console.error("Error processing guild ids", error.message);
      }
    })
  );
}

module.exports = checkTime;

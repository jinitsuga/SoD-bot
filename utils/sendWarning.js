const { PermissionFlagsBits } = require("discord.js");
const getTimeLeft = require("./time");

function checkTime() {
  let nextReset = Date.parse("24 Dec 2023 10:00:00 EST");

  const rightNow = Date.now();

  // Once rightNow is equal or lower than nextReset, nextReset gains 72 hours
  while (rightNow >= nextReset) {
    nextReset = nextReset + 72 * 3600000;
  }

  let timeLeft = nextReset - rightNow;

  return timeLeft;
}

// 24 hours to miliseconds = 86400000

async function sendWarning(guilds, client) {
  console.log("sending warning...");

  const { hoursLeft } = getTimeLeft(checkTime() / 1000);

  await Promise.all(
    guilds.map(async (guildId) => {
      try {
        const guild = await client.guilds.fetch(guildId);
        const textChannelIds = guild.channels.cache
          .filter((chan) => chan.type === 0)
          .map((channel) => channel.id);

        textChannelIds.map((id) => {
          if (
            guild.members.me
              .permissionsIn(id)
              .has(PermissionFlagsBits.SendMessages)
          ) {
            const allowedChannel = guild.channels.cache.get(id);
            allowedChannel.send(
              `BFD resets in ${hoursLeft}hrs. Make sure you've made use of this lockout :)`
            );
          }
        });
      } catch (error) {
        console.error("Error processing guild ids", error.message);
      }
    })
  );
}

module.exports = { checkTime, sendWarning };

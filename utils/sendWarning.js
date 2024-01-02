const { PermissionFlagsBits } = require("discord.js");
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
  console.log("sending warning...");
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
            console.log(allowedChannel);
            allowedChannel.send("hello frens");
          }
        });

        // console.log(
        //   textChannelIds.map((id) => {
        //     return guild.members.me
        //       .permix`ssionsIn(id)
        //       .has(PermissionFlagsBits.SendMessages);
        //   })
        // );

        // Pending: map over channels (similar to above) and if write permissions are true, send the warning
      } catch (error) {
        console.error("Error processing guild ids", error.message);
      }
    })
  );
}

module.exports = { checkTime, sendWarning };

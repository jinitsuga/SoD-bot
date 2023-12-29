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
        console.log(client.user);
        // console.log(
        //   guild.me
        //     .permissionsIn(guild.channels.cache.find((chan) => chan.type === 0))
        //     .has()
        // );

        // const writeableChannel = guild.channels.cache.find(
        //   (channel) =>
        //     channel.type === 0 &&
        //     channel.permissionsFor(client.user).has("SEND_MESSAGES")
        // );
        // // console.log(writeableChannel);

        // if (writeableChannel) {
        //   await writeableChannel.send(
        //     "hola capos, se resetea bfd en menos de un dia"
        //   );
        // }
      } catch (error) {
        console.error("Error processing guild ids", error.message);
      }
    })
  );
}

module.exports = { checkTime, sendWarning };

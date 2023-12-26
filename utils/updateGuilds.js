const fs = require("node:fs");
const path = require("node:path");

function updateGuilds(guildsList) {
  const guildsPath = path.join(__dirname, "guilds.json");
  //   const data = fs.readFileSync(guildsPath);
  fs.writeFile("guilds.json", JSON.stringify(guildsList), (error) => {
    if (error) {
      console.log("error writing to guildsjson");
    }
  });
}

module.exports = updateGuilds;

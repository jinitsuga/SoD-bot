const fs = require("node:fs");
const path = require("node:path");

// Replaces the guild ids in guilds.json with the passed array of ids
function updateGuilds(guildsList) {
  const guildsPath = path.join(__dirname, "guilds.json");
  fs.writeFile("guilds.json", JSON.stringify(guildsList), (error) => {
    if (error) {
      console.log("error writing to guildsjson");
    }
  });
}

module.exports = updateGuilds;

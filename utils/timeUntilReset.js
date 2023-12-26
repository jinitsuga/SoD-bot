const getTimes = require("./time");

function getTimeUntilReset() {
  let nextReset = Date.parse("24 Dec 2023 10:00:00 EST");

  const rightNow = Date.now();

  // Once rightNow is equal or lower than nextReset, nextReset gains 72 hours
  while (rightNow >= nextReset) {
    nextReset = nextReset + 72 * 3600000;
  }

  let timeLeft = nextReset - rightNow;

  let totalSeconds = timeLeft && Math.floor(timeLeft / 1000);

  const { hoursLeft } = getTimes(totalSeconds);

  if (hoursLeft <= 25) {
    return true;
  } else {
    return false;
  }
}

module.exports = getTimeUntilReset;

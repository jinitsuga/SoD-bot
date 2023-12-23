function getTimeLeft(totalSeconds) {
  //   const rightNow = Date.now();
  //   let nextReset = Date.parse("21 Dec 2023 10:00:00 EST");

  //   // Once rightNow is equal or lower than nextReset, nextReset gains 72 hours
  //   if (rightNow >= nextReset) {
  //     nextReset = nextReset + 72 * 3600000;
  //   }

  const daysLeft = totalSeconds && Math.floor(totalSeconds / 86400);
  totalSeconds = Math.floor(totalSeconds - daysLeft * 86400);

  const hoursLeft = totalSeconds && Math.floor(totalSeconds / 3600);
  totalSeconds = Math.floor(totalSeconds - hoursLeft * 3600);

  const minutesLeft = totalSeconds && Math.floor(totalSeconds / 60);
  totalSeconds = Math.floor(totalSeconds - minutesLeft * 60);

  return { minutesLeft, daysLeft, hoursLeft };
}

module.exports = getTimeLeft;

function getTimeLeft(totalSeconds) {
  const daysLeft = totalSeconds && Math.floor(totalSeconds / 86400);
  totalSeconds = Math.floor(totalSeconds - daysLeft * 86400);

  const hoursLeft = totalSeconds && Math.floor(totalSeconds / 3600);
  totalSeconds = Math.floor(totalSeconds - hoursLeft * 3600);

  const minutesLeft = totalSeconds && Math.floor(totalSeconds / 60);
  totalSeconds = Math.floor(totalSeconds - minutesLeft * 60);

  return { minutesLeft, daysLeft, hoursLeft };
}

module.exports = getTimeLeft;

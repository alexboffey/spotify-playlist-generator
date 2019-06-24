exports.getTimeExpires = (expires_in = 3600) => {
  let timeExpires = new Date();
  // give ourselves a little breathing room before it actually expires
  timeExpires.setSeconds(timeExpires.getSeconds() + expires_in * 0.9);

  return timeExpires;
};

exports.getMinutesUntilExpiration = timeExpires => {
  const diff = new Date(timeExpires) - new Date();
  return Math.floor(diff / 1000 / 60);
};

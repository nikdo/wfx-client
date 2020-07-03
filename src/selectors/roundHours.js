const roundHours = unixTimestamp => {
  const remainder = unixTimestamp % (60 * 60)
  return unixTimestamp - remainder +
    (remainder < 60 * 30
      ? 0
      : 60 * 60
    )
}

export const getMatchingTime = round => list => query =>
  list.find(time => round(time) === round(query))

export const getTimeMatchingRounded = getMatchingTime(roundHours)

export default roundHours

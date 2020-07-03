export const floorHour = unixTimestamp =>
  unixTimestamp - unixTimestamp % (60 * 60)

export const ceilHour = unixTimestamp => {
  const remainder = unixTimestamp % (60 * 60)
  return remainder
    ? unixTimestamp + 60 * 60 - remainder
    : unixTimestamp
}

export const getMatchingTime = round => list => query =>
  list.find(time => round(time) === round(query))

export const getTimeMatchingFloored = getMatchingTime(floorHour)
export const getTimeMatchingCeiled = getMatchingTime(ceilHour)

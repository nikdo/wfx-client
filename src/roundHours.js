export default unixTimestamp => {
  const remainder = unixTimestamp % (60 * 60)
  return unixTimestamp - remainder +
    (remainder < 60 * 30
      ? 0
      : 60 * 60
    )
}

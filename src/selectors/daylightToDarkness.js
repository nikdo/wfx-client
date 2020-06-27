export default days => days
  ?.reduce((nights, day) => {
    const lastNight = nights[nights.length - 1]
    return [
      ...nights.splice(0, nights.length - 1),
      {
        ...lastNight,
        end: day.sunriseTime
      },
      {
        start: day.sunsetTime
      }
    ]
  }, [{}])

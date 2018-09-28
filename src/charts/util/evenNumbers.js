export default max => [...Array(max).keys()]
  .map(i => ++i)
  .filter(i => !(i % 2))

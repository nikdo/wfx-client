export default ({ region, country }) =>
  `${region ? region + ', ' : ''}${country}`

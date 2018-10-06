import { scalePoint, scaleLinear, max } from 'd3'
import tickValues from './tickValues'

const ceilToEven = num => 2 * Math.ceil(num / 2)

const evenNumbers = max => [...Array(max).keys()]
  .map(i => ++i)
  .filter(i => !(i % 2))

export default data => {
  const hoverTooltipHeight = 2
  const minEndValue = 16
  const yMax = ceilToEven(max([
    ...data.map(d => d.windSpeed + hoverTooltipHeight),
    minEndValue
  ]))

  const unitHeigth = 12
  const dimensions = {
    w: 1200,
    h: yMax * unitHeigth
  }
  const scales = {
    x: scalePoint()
      .domain(data.map(d => d.time))
      .range([0, dimensions.w]),
    y: scaleLinear()
      .domain([0, yMax])
      .rangeRound([dimensions.h, 0])
  }
  const windTickValues = tickValues(evenNumbers(yMax), yMax)

  return { dimensions, scales, windTickValues }
}

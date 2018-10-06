import { scalePoint, scaleLinear, max } from 'd3'
import tickValues from './tickValues'

const evenNumbers = max => [...Array(max).keys()]
  .map(i => ++i)
  .filter(i => !(i % 2))

export default data => {
  const hoverTooltipHeight = 2
  const minEndValue = 16
  const yMax = max([
    ...data.map(d => d.windSpeed + hoverTooltipHeight),
    minEndValue
  ])
  const windTickValues = tickValues(evenNumbers(Math.ceil(yMax + 2)), yMax)
  const yEndValue = windTickValues[windTickValues.length - 1]

  const unitHeigth = 12
  const dimensions = {
    w: 1200,
    h: yEndValue * unitHeigth
  }
  const scales = {
    x: scalePoint()
      .domain(data.map(d => d.time))
      .range([0, dimensions.w]),
    y: scaleLinear()
      .domain([0, yEndValue])
      .rangeRound([dimensions.h, 0])
  }

  return { dimensions, scales, windTickValues }
}

import { scalePoint, scaleLinear, max } from 'd3'
import tickValues from './tickValues'

const evenNumbers = max => [...Array(max).keys()]
  .map(i => ++i)
  .filter(i => !(i % 2))

export default data => {
  const hoverTooltipHeight = 2
  const minEndValue = 16
  const yMaxValue = max(data.map(d => d.windSpeed)) + hoverTooltipHeight
  const levelsCeilings = evenNumbers(6)
  const windTickValues = tickValues(levelsCeilings, Math.max(yMaxValue, minEndValue))
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

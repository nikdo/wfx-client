import { axisLeft } from 'd3'

const evenNumbers = max => [...Array(max).keys()]
  .map(i => ++i)
  .filter(i => !(i % 2))

export default (chart, dimensions, scales, maxWindSpeed) => {
  const yAxis = axisLeft()
    .scale(scales.y)
    .tickSize(-dimensions.w)
    .tickValues(evenNumbers(maxWindSpeed))

  return chart.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
}

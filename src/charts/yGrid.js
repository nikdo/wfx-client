import { axisLeft } from 'd3'

export default (chart, dimensions, scales, tickValues) => {
  const yGrid = axisLeft()
    .scale(scales.y)
    .tickSize(-dimensions.w)
    .tickValues(tickValues)
    .tickFormat('')

  return chart.append('g')
    .attr('class', 'y grid')
    .call(yGrid)
}

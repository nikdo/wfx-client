import { axisLeft } from 'd3'

export default (chart, dimensions, scales, tickValues) => {
  const yAxis = axisLeft()
    .scale(scales.y)
    .tickSize(-dimensions.w)
    .tickValues(tickValues)

  return chart.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .attr('font-size', null)
    .attr('font-family', null)
}

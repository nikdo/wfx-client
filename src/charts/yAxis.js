import { axisLeft } from 'd3'
import { lineHeight } from './util/constants'

export default (chart, dimensions, scales, tickValues) => {
  const yAxis = axisLeft()
    .scale(scales.y)
    .tickSize(0)
    .tickValues(tickValues)

  chart.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .attr('font-size', null)
    .attr('font-family', null)
    .selectAll('text')
    .attr('y', 0)
    .attr('x', -lineHeight / 2)
    .attr('dy', 0)
    .attr('alignment-baseline', 'middle')

  chart.append('g')
    .attr('class', 'y axis')
    .append('path')
    .attr('class', 'domain')
    .attr('stroke', 'currentColor')
    .attr('d', `M${dimensions.w},${dimensions.h}V0`)
}

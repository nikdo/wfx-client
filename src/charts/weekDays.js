import { axisTop } from 'd3'
import { lineHeight, d3AxisOffset } from './util/constants'

export default (chart, dimensions, scales, swimlineHeight) => {
  const tickValues = scales.x.domain()
    .filter(d => d.format('HH').match(/(00)/))
    .slice(0, -1)

  const axis = axisTop()
    .scale(scales.x)
    .tickValues(tickValues)
    .tickSize(0)
    .tickFormat(d => d.format('dddd'))

  const lineStrokeWidth = 1
  const xOffset = lineHeight / 2
  const yOffset = lineStrokeWidth + d3AxisOffset + swimlineHeight / 2
  chart.append('g')
    .attr('class', 'week-days')
    .attr('transform', `translate(${xOffset}, ${yOffset})`)
    .call(axis)
    .attr('text-anchor', null)
    .attr('font-size', null)
    .attr('font-family', null)
    .selectAll('text')
    .attr('alignment-baseline', 'middle')
    .attr('y', 0)
}

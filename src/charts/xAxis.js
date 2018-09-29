import { axisBottom } from 'd3'
import { lineHeight } from './util/constants'

export default (chart, dimensions, scales, subscribeToHoverEvents) => {
  const axis = axisBottom()
    .scale(scales.x)
    .tickValues(scales.x.domain().filter(d => d.format('HH').match(/(00|06|12|18)/)))
    .tickSize(0)
    .tickFormat(d => d.format('HH:mm'))

  const element = chart.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${dimensions.h})`)
    .call(axis)
    .attr('font-size', null)
    .attr('font-family', null)

  const labels = element.selectAll('text')
    .attr('y', 0)
    .attr('x', lineHeight / 2)
    .attr('dy', 0)
    .attr('transform', 'rotate(90)')
    .attr('alignment-baseline', 'middle')
    .style('text-anchor', 'start')

  subscribeToHoverEvents({
    onMouseOver: () => labels.attr('display', 'none'),
    onMouseOut: () => labels.attr('display', null)
  })

  return element
}

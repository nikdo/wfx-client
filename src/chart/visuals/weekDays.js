import { axisTop } from 'd3'
import { lineHeight } from './constants'

export default (canvas, dimensions, scales) => {
  const tickValues = scales.x.domain()
    .filter(d => d.format('HH').match(/(00)/))
    .slice(0, -1)

  const axis = axisTop()
    .scale(scales.x)
    .tickValues(tickValues)
    .tickSize(0)
    .tickFormat(d => d.format('dddd'))

  canvas.append('g')
    .attr('class', 'week-days')
    .attr('transform', `translate(${lineHeight / 2}, ${-lineHeight / 2})`)
    .call(axis)
    .attr('text-anchor', null)
    .attr('font-size', null)
    .attr('font-family', null)
    .selectAll('text')
    .attr('y', 0)
}

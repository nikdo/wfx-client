import { axisBottom } from 'd3'

export default (chart, dimensions, scales) => {
  const axis = axisBottom()
    .scale(scales.x)
    .tickValues(scales.x.domain().filter(d => d.format('HH').match(/(00|06|12|18)/)))
    .tickSize(0)
    .tickFormat(d => d.format('dd HH:mm'))

  const element = chart.append('g')
    .attr('class', 'x element')
    .attr('transform', `translate(0, ${dimensions.h})`)
    .call(axis)

  element.selectAll('text')
    .attr('y', 0)
    .attr('x', 9)
    .attr('dy', '.35em')
    .attr('transform', 'rotate(90)')
    .style('text-anchor', 'start')

  return element
}

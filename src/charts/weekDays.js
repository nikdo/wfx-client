import { axisTop } from 'd3'

export default (chart, dimensions, scales, swimlineHeight) => {
  const axis = axisTop()
    .scale(scales.x)
    .tickValues(scales.x.domain().filter(d => d.format('HH').match(/(00)/)))
    .tickSize(0)
    .tickFormat(d => d.format('dddd'))

  chart.append('g')
    .attr('class', 'week-days')
    .attr('transform', `translate(8, ${1.5 + swimlineHeight / 2})`)
    .call(axis)
    .attr('text-anchor', null)
    .attr('font-size', null)
    .attr('font-family', null)
    .selectAll('text')
    .attr('alignment-baseline', 'middle')
    .attr('y', 0)
}

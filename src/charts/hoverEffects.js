import { mouse } from 'd3'

export default (chart, scales, dimensions) => {
  const hover = chart.append('g')
    .attr('class', 'hover')
    .style('display', 'none')

  hover.append('line')
    .attr('class', 'guide')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', dimensions.h)

  chart.append('rect')
    .attr('class', 'events-overlay')
    .attr('width', dimensions.w)
    .attr('height', dimensions.h)
    .on('mouseover', () => hover.style('display', null))
    .on('mouseout', () => hover.style('display', 'none'))
    .on('mousemove', function () {
      hover.attr('transform', `translate(${mouse(this)[0]},0)`)
    })
}

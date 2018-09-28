import { mouse } from 'd3'

export default (chart, dimensions, onMouseOver, onMouseOut, onMouseMove) => chart.append('rect')
  .attr('class', 'chart-hover')
  .attr('width', dimensions.w)
  .attr('height', dimensions.h)
  .on('mouseover', onMouseOver)
  .on('mouseout', onMouseOut)
  .on('mousemove', function () { onMouseMove(mouse(this)) })

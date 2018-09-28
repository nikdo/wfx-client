import { mouse } from 'd3'

export default (chart, dimensions, eventHandlers) => chart.append('rect')
  .attr('class', 'chart-hover')
  .attr('width', dimensions.w)
  .attr('height', dimensions.h)
  .on('mouseover', () => eventHandlers.forEach(handler => handler.onMouseOver && handler.onMouseOver()))
  .on('mouseout', () => eventHandlers.forEach(handler => handler.onMouseOut && handler.onMouseOut()))
  .on('mousemove', function () {
    const [x, y] = mouse(this)
    eventHandlers.forEach(handler => handler.onMouseMove && handler.onMouseMove([x, y]))
  })

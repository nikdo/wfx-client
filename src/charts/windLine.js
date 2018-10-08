import { line, area, curveNatural } from 'd3'

const levelClip = (root, dimensions) => (level, start, end) => root.append('clipPath')
  .attr('id', `level-${level}`)
  .append('rect')
  .attr('y', end)
  .attr('width', dimensions.w)
  .attr('height', start - end)

const levelFill = (root, dimensions, scales, data) => (level, start, end) => root.append('path')
  .attr('class', `wind-fill level-${level}`)
  .datum(data)
  .attr('d', area()
    .x(d => scales.x(d.time))
    .y1(d => scales.y(d.windSpeed))
    .y0(() => dimensions.h)
    .curve(curveNatural)
  )
  .attr('clip-path', `url(#level-${level})`)

const levelPath = (root, dimensions, scales, data) => (level, start, end) => {
  const path = line()
    .x(d => scales.x(d.time))
    .y(d => scales.y(d.windSpeed))
    .curve(curveNatural)
  root.append('path')
    .attr('class', `wind level-${level}`)
    .datum(data)
    .attr('d', path)
    .attr('clip-path', `url(#level-${level})`)
}

export default (canvas, dimensions, scales, data, forEachLevel, subscribeToHoverEvents) => {
  const root = canvas.append('g')

  forEachLevel(levelClip(root, dimensions))
  forEachLevel(levelFill(root, dimensions, scales, data))
  forEachLevel(levelPath(root, dimensions, scales, data))

  const mask = root.append('mask')
    .attr('id', 'hover-overlay')

  const visible = mask.append('rect')
    .attr('height', dimensions.h)
    .style('fill', '#fff')

  const hidden = mask.append('rect')
    .attr('width', dimensions.w)
    .attr('height', dimensions.h)
    .style('fill', '#222')

  subscribeToHoverEvents({
    onMouseOut: () => root.attr('mask', null),
    onValueHover: x => {
      root.attr('mask', 'url(#hover-overlay)')
      visible.attr('width', x)
      hidden.attr('x', x)
    }
  })
}

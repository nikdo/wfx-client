import { line, area, curveNatural } from 'd3'

const levelClip = (root, dimensions) => (level, start, end) => root.append('clipPath')
  .attr('id', `level-${level}`)
  .append('rect')
  .attr('y', end)
  .attr('width', dimensions.w)
  .attr('height', start - end)

const levelFill = (root, dimensions, scales, data, subscribeToHoverEvents) => (level, start, end) => {
  const fill = root.append('path')
    .attr('class', `wind-fill level-${level}`)
    .datum(data)
    .attr('d', area()
      .x(d => scales.x(d.time))
      .y1(d => scales.y(d.windSpeed))
      .y0(() => dimensions.h)
      .curve(curveNatural)
    )
    .attr('clip-path', `url(#level-${level})`)

  subscribeToHoverEvents({
    onMouseOut: () => fill.attr('mask', null),
    onValueHover: () => fill.attr('mask', 'url(#hover-overlay)')
  })
}

const levelPath = (root, dimensions, scales, data, subscribeToHoverEvents) => (level, start, end) => {
  const path = root.append('path')
    .attr('class', `wind level-${level}`)
    .datum(data)
    .attr('d', line()
      .x(d => scales.x(d.time))
      .y(d => scales.y(d.windSpeed))
      .curve(curveNatural)
    )
    .attr('clip-path', `url(#level-${level})`)

  subscribeToHoverEvents({
    onMouseOut: () => path.attr('mask', null),
    onValueHover: () => path.attr('mask', 'url(#hover-overlay)')
  })
}

export default (canvas, dimensions, scales, data, forEachLevel, subscribeToHoverEvents) => {
  const root = canvas.append('g')

  forEachLevel(levelClip(root, dimensions))
  forEachLevel(levelFill(root, dimensions, scales, data, subscribeToHoverEvents))
  forEachLevel(levelPath(root, dimensions, scales, data, subscribeToHoverEvents))

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
    onValueHover: x => {
      visible.attr('width', x)
      hidden.attr('x', x)
    }
  })
}

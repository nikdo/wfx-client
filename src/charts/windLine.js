import { line, area, curveNatural } from 'd3'

const skippedLevels = 2
const levelsCeilings = [0.3, 1.5, 3.3, 5.5, undefined].slice(skippedLevels)

export default (canvas, dimensions, scales, data, subscribeToHoverEvents) => {
  const levels = levelsCeilings.reduce((levels, breakpoint, i, levelsCeilings) => [
    ...levels,
    {
      start: scales.y(levelsCeilings[i - 1] || 0),
      end: levelsCeilings[i] ? scales.y(levelsCeilings[i]) : 0
    }
  ], [])

  const path = line()
    .x(d => scales.x(d.time))
    .y(d => scales.y(d.windSpeed))
    .curve(curveNatural)

  const fill = area()
    .x(d => scales.x(d.time))
    .y1(d => scales.y(d.windSpeed))
    .y0(() => dimensions.h)
    .curve(curveNatural)

  const root = canvas.append('g')

  levels.forEach(({ start, end }, level) => {
    level += skippedLevels
    root.append('clipPath')
      .attr('id', `level-${level}`)
      .append('rect')
      .attr('y', end)
      .attr('width', dimensions.w)
      .attr('height', start - end)
    root.append('path')
      .attr('class', `wind-fill level-${level}`)
      .datum(data)
      .attr('d', fill)
      .attr('clip-path', `url(#level-${level})`)
    root.append('path')
      .attr('class', `wind level-${level}`)
      .datum(data)
      .attr('d', path)
      .attr('clip-path', `url(#level-${level})`)
  })

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

import { line, area, curveNatural } from 'd3'

const levelClip = (root, width) => ({ start, end }, level) => root.append('clipPath')
  .attr('id', `level-${level}`)
  .append('rect')
  .attr('y', end)
  .attr('width', width)
  .attr('height', start - end)

const levelFill = (root, data, area) => ({ start, end }, level) => root.append('path')
  .attr('class', `wind-fill level-${level}`)
  .datum(data)
  .attr('d', area)
  .attr('clip-path', `url(#level-${level})`)

const levelPath = (root, data, line) => ({ start, end }, level) => root.append('path')
  .attr('class', `wind level-${level}`)
  .datum(data)
  .attr('d', line)
  .attr('clip-path', `url(#level-${level})`)

export default (canvas, dimensions, scales, data, bftCeilings, skippedLevels, subscribeToHoverEvents) => {
  const levelsCeilings = bftCeilings.slice(skippedLevels)
  const levels = levelsCeilings.reduce((levels, breakpoint, i, levelsCeilings) => [
    ...levels,
    {
      start: scales.y(levelsCeilings[i - 1] || 0),
      end: scales.y(levelsCeilings[i])
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

  const skipLevels = iterator => ({ start, end }, level) => iterator({ start, end }, level + skippedLevels)
  levels.forEach(skipLevels(levelClip(root, dimensions.w)))
  levels.forEach(skipLevels(levelFill(root, data, fill)))
  levels.forEach(skipLevels(levelPath(root, data, path)))

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

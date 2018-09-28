import { line, area, curveNatural } from 'd3'

export default (chart, dimensions, scales, data) => {
  const breakpoint = scales.y(4)

  const path = line()
    .x(d => scales.x(d.time))
    .y(d => scales.y(d.windSpeed))
    .curve(curveNatural)

  const fill = area()
    .x(d => scales.x(d.time))
    .y1(d => scales.y(d.windSpeed))
    .y0(() => dimensions.h)
    .curve(curveNatural)

  const root = chart.append('g')

  root.append('clipPath')
    .attr('id', 'level-0')
    .append('rect')
    .attr('y', breakpoint)
    .attr('width', dimensions.w)
    .attr('height', dimensions.h - breakpoint)

  root.append('clipPath')
    .attr('id', 'level-1')
    .append('rect')
    .attr('width', dimensions.w)
    .attr('height', breakpoint)

  ;[0, 1].forEach(level => {
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
}

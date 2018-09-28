import { line, area, curveNatural } from 'd3'

export default (chart, dimensions, scales, data) => {
  const path = line()
    .x(d => scales.x(d.time))
    .y(d => scales.y(d.windSpeed))
    .curve(curveNatural)

  const fill = area()
    .x(d => scales.x(d.time))
    .y1(d => scales.y(d.windSpeed))
    .y0(() => dimensions.h)
    .curve(curveNatural)

  chart.append('path')
    .attr('class', 'wind-fill')
    .datum(data)
    .attr('d', fill)
    .attr('mask', 'url(#transparency)')

  chart.append('path')
    .attr('class', 'wind')
    .datum(data)
    .attr('d', path)
    .attr('mask', 'url(#transparency)')
}

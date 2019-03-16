import { area, curveNatural } from 'd3'

export default (defs, dimensions, scales, data) => {
  defs.append('clipPath')
    .attr('id', 'fill-clip')
    .append('path')
    .datum(data)
    .attr('d', area()
      .x(d => scales.x(d.time))
      .y1(d => scales.y(d.windSpeed))
      .y0(() => dimensions.h)
      .curve(curveNatural)
    )
}

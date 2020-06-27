import { area, curveNatural } from 'd3'

const fillClipId = 'fill-clip'
export const fillClipUrl = `url(#${fillClipId})`

export default (defs, dimensions, scales, data) => {
  defs.append('clipPath')
    .attr('id', fillClipId)
    .append('path')
    .datum(data)
    .attr('d', area()
      .x(d => scales.x(d.time))
      .y1(d => scales.y(d.windSpeed))
      .y0(() => dimensions.h)
      .curve(curveNatural)
    )
}

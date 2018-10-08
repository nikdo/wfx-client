import { area, curveNatural } from 'd3'

export default (root, dimensions, scales, data, subscribeToHoverEvents) => (level, start, end) => {
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

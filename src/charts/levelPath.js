import { line, curveNatural } from 'd3'

export default (root, dimensions, scales, data, subscribeToHoverEvents) => (level, start, end) => {
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

import { line, curveNatural } from 'd3'

export default (root, dimensions, scales, data, subscribeToHoverEvents) => {
  const lineGroup = root.append('g')
    .attr('class', 'wind-line')

  ;['relevant-levels', 'skipped-levels'].forEach(clipPath => {
    lineGroup.append('path')
      .attr('class', clipPath)
      .datum(data)
      .attr('d', line()
        .x(d => scales.x(d.time))
        .y(d => scales.y(d.windSpeed))
        .curve(curveNatural)
      )
      .attr('clip-path', `url(#${clipPath})`)
  })

  subscribeToHoverEvents({
    onMouseOut: () => lineGroup.attr('mask', null),
    onValueHover: () => lineGroup.attr('mask', 'url(#hover-overlay)')
  })
}

import { lineHeight } from './constants'

export default (chart, dimensions, scales, data, subscribeToHoverEvents) => {
  const hoverGuide = chart.append('g')
    .attr('class', 'hover-guide')
    .style('display', 'none')

  const line = hoverGuide.append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', dimensions.h)

  const value = hoverGuide.append('g')
    .attr('class', 'value')

  value.append('circle')
    .attr('r', 3)

  value.append('text')
    .attr('x', lineHeight / 2)
    .attr('alignment-baseline', 'middle')
    .attr('paint-order', 'stroke')
    .attr('stroke-linejoin', 'round')

  const time = hoverGuide.append('g')
    .attr('class', 'time')
    .attr('transform', `translate(0, ${dimensions.h})`)

  time.append('path')
    .attr('fill', 'none')
    .attr('d', `M 0 0 V ${lineHeight} H ${lineHeight / 4}`)

  time.append('text')
    .attr('x', lineHeight / 2)
    .attr('y', lineHeight)
    .attr('alignment-baseline', 'middle')

  subscribeToHoverEvents({
    onMouseOver: () => hoverGuide.style('display', null),
    onMouseOut: () => hoverGuide.style('display', 'none'),
    onValueHover: (x, i) => {
      const windSpeed = data[i].windSpeed
      const y = scales.y(windSpeed)
      hoverGuide.attr('transform', `translate(${x}, 0)`)
      line.attr('y1', y)
      value.attr('transform', `translate(0, ${y})`)
      value.select('text').text(windSpeed.toFixed(1))
      time.select('.time text').text(scales.x.domain()[i].format('dd HH:mm'))
    }
  })
}

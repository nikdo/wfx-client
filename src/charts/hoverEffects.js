import { lineHeight } from './constants'

export default (chart, dimensions, scales, data, subscribeToHoverEvents) => {
  const hover = chart.append('g')
    .attr('class', 'hover')
    .style('display', 'none')

  const line = hover.append('line')
    .attr('class', 'guide')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', dimensions.h)

  const value = hover.append('g')
    .attr('class', 'value')

  value.append('circle')
    .attr('r', 3)

  const time = hover.append('g')
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
    onMouseOver: () => hover.style('display', null),
    onMouseOut: () => hover.style('display', 'none'),
    onValueHover: (x, i) => {
      const y = scales.y(data[i].windSpeed)
      hover.attr('transform', `translate(${x}, 0)`)
      line.attr('y1', y)
      value.attr('transform', `translate(0, ${y})`)
      hover.select('.time text').text(scales.x.domain()[i].format('dd HH:mm'))
    }
  })
}

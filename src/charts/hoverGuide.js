import { lineHeight } from './constants'
import hoverValueTooltip from './hoverValueTooltip'

export default (canvas, dimensions, scales, data, bftCeilings, subscribeToHoverEvents) => {
  const hoverGuide = canvas.append('g')
    .attr('class', 'hover-guide')
    .style('display', 'none')

  const line = hoverGuide.append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', dimensions.h)

  const value = hoverGuide.append('g')
    .attr('class', 'value')

  hoverValueTooltip(value, data, bftCeilings, subscribeToHoverEvents)

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
    onMouseOut: () => hoverGuide.style('display', 'none'),
    onValueHover: (x, i) => {
      const y = scales.y(data[i].windSpeed)
      hoverGuide
        .style('display', null)
        .attr('transform', `translate(${x}, 0)`)
      line.attr('y1', y)
      value.attr('transform', `translate(0, ${y})`)
      time.select('.time text').text(scales.x.domain()[i].format('HH:mm'))
    }
  })
}

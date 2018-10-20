import { bisect } from 'd3'
import { lineHeight } from './constants'

const toBft = (value, bftCeilings) => bisect(bftCeilings, value)

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

  value.append('circle')
    .attr('r', 3)

  value.append('text')
    .attr('class', 'ms')
    .attr('dy', lineHeight / 4)

  value.append('text')
    .attr('class', 'bft')
    .attr('dy', lineHeight * 1.5)

  value.selectAll('text')
    .attr('x', lineHeight / 2)
    .attr('paint-order', 'stroke')
    .style('paint-order', 'stroke') // Safari needs to set style when stroke is set in CSS
    .attr('stroke-linejoin', 'round')

  value.append('g')
    .attr('class', 'wind-direction')
    .attr('transform', `translate(${lineHeight}, ${-lineHeight * 1.5})`)
    .append('path')
    .attr('d', 'M-2.5,1 L0,5 L2.5,1 M0,4 V -10')

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
      const windSpeed = data[i].windSpeed
      const windGustDiff = data[i].windGust - windSpeed
      const y = scales.y(windSpeed)
      const bft = toBft(windSpeed, bftCeilings)
      hoverGuide
        .style('display', null)
        .attr('transform', `translate(${x}, 0)`)
      line.attr('y1', y)
      value.attr('transform', `translate(0, ${y})`)
      value.select('text.ms')
        .text(windSpeed.toFixed(1) + '\u2009m/s')
        .append('tspan').text(' +' + windGustDiff.toFixed(1))
      value.select('text.bft')
        .text(bft + '\u2009bft')
        .attr('display', bft > 1 ? null : 'none')
      value.select('.wind-direction path').attr('transform', `rotate(${data[i].windBearing})`)
      time.select('.time text').text(scales.x.domain()[i].format('HH:mm'))
    }
  })
}

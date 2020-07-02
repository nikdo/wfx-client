import { bisect } from 'd3'
import { lineHeight, bftNames } from './constants'
import { moonId } from '../components/Icons'

const toBft = (value, bftCeilings) => bisect(bftCeilings, value)

export default (value, data, bftCeilings, subscribeToHoverEvents) => {
  value.append('circle')
    .attr('r', 3)

  const ms = value.append('text')
    .attr('class', 'ms')
    .attr('dy', lineHeight / 4)

  const bf = value.append('text')
    .attr('class', 'bft')
    .attr('dy', lineHeight * 1.5)

  const daylight = value.append('use')
    .attr('transform', `translate(${lineHeight * 2}, ${-lineHeight * 2})`)

  value.selectAll('text')
    .attr('x', lineHeight / 2)
    .attr('paint-order', 'stroke')
    .style('paint-order', 'stroke') // Safari needs to set style when stroke is set in CSS
    .attr('stroke-linejoin', 'round')

  const direction = value.append('g')
    .attr('class', 'wind-direction')
    .attr('transform', `translate(${lineHeight}, ${-lineHeight * 1.5})`)
    .append('path')
    .attr('d', 'M-2.5,1 L0,5 L2.5,1 M0,4 V -10')

  subscribeToHoverEvents({
    onValueHover: (x, i) => {
      const windSpeed = data[i].windSpeed
      const windGustDiff = data[i].windGust - windSpeed
      const bft = toBft(windSpeed, bftCeilings)
      ms.text(windSpeed.toFixed(1) + '\u2009m/s')
        .append('tspan')
        .attr('class', 'gusts')
        .text(' +' + windGustDiff.toFixed(1))
      bf.text(bft + '\u2009bft')
        .attr('class', `bft level-${bft}`)
        .attr('display', bft > 1 ? null : 'none')
        .append('tspan').text(' ' + bftNames[bft])
      direction.attr('transform', `rotate(${data[i].windBearing})`)
      daylight.attr('xlink:href', data[i].isDaylight ? '' : `#${moonId}`)
      value.classed('disabled', !data[i].isDaylight)
    }
  })
}

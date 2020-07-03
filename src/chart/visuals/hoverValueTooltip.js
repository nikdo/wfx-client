import { bisect } from 'd3'
import { lineHeight, bftNames } from './constants'
import { arrowId, moonId, sunriseId, sunsetId } from '../components/Icons'

const toBft = (value, bftCeilings) => bisect(bftCeilings, value)

const daylightIconId = ({ isDaylight, sunrise, sunset }) => {
  if (sunrise) {
    return sunriseId
  } else if (sunset) {
    return sunsetId
  } else if (!isDaylight) {
    return moonId
  } else {
    return ''
  }
}

export default (value, data, bftCeilings, subscribeToHoverEvents) => {
  value.append('circle')
    .attr('r', 3)

  const icons = value.append('g')
    .attr('transform', `translate(${lineHeight / 2}, ${-lineHeight * 2 - lineHeight / 4})`)

  const direction = icons.append('g')
    .attr('transform', `translate(0, ${((lineHeight * 1.5) - 20) / 2})`)
    .append('use')
    .attr('class', 'wind-direction')
    .attr('xlink:href', `#${arrowId}`)

  const daylight = icons.append('g')
    .attr('transform', `translate(${lineHeight * 2}, ${((lineHeight * 1.5) - 16) / 2})`)
    .append('use')

  const ms = value.append('text')
    .attr('class', 'ms')
    .attr('dy', lineHeight / 4)

  const bf = value.append('text')
    .attr('class', 'bft')
    .attr('dy', lineHeight * 1.5)

  value.selectAll('text')
    .attr('x', lineHeight / 2)
    .attr('paint-order', 'stroke')
    .style('paint-order', 'stroke') // Safari needs to set style when stroke is set in CSS
    .attr('stroke-linejoin', 'round')

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
      direction.attr('transform', `rotate(${data[i].windBearing} 10 10)`)
      daylight.attr('xlink:href', `#${daylightIconId(data[i])}`)
      value.classed('disabled', !data[i].isDaylight)
    }
  })
}

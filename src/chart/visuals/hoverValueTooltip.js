import { bisect } from 'd3'
import { lineHeight, bftNames } from './constants'

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

  const darkness = value.append('path')
    .attr('class', 'darkness')
    .attr('d', 'M13.1712349,0 C14.4088571,0 15.6033354,0.182122644 16.728603,0.520668054 C12.8236823,1.83476712 10.0155749,5.48271323 10.0155749,9.77730065 C10.0155749,15.1776447 14.4558887,19.5554885 19.9332934,19.5554885 C21.0035019,19.5554885 22.0341188,19.3883612 22.9997593,19.0791341 C20.7858528,22.0623954 17.2080486,24 13.1712349,24 C6.44924748,24 1,18.627417 1,12 C1,5.372583 6.44924748,0 13.1712349,0 Z')
    // TODO: find out how to fit SVG path element to specific dimension instead of using scale transform
    .attr('transform', `translate(${lineHeight * 2}, ${-lineHeight * 2}) scale(0.6)`)

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
      darkness.attr('display', data[i].isDaylight ? 'none' : null)
      value.classed('disabled', !data[i].isDaylight)
    }
  })
}

import { scalePoint, scaleLinear, max } from 'd3'
import trimLevelsCeilings from './trimLevelsCeilings'

const bftCeilings = [0.3, 1.5, 3.3, 5.5, 8, 10.8, 13.9, 17.2, 20.7, 24.5, 28.4, 32.6, undefined]
const minEndValue = bftCeilings[7]
const unitHeigth = 12
const hoverTooltipHeight = 30

export default data => {
  const yMaxValue = max(data.hourly.map(d => d.windSpeed)) + hoverTooltipHeight / unitHeigth
  const trimmedBftCeilings = trimLevelsCeilings(bftCeilings, Math.max(yMaxValue, minEndValue))
  const yEndValue = trimmedBftCeilings[trimmedBftCeilings.length - 1]

  const dimensions = {
    w: 1200,
    h: yEndValue * unitHeigth
  }
  const scales = {
    x: scalePoint()
      .domain(data.hourly.map(d => d.time))
      .range([0, dimensions.w]),
    y: scaleLinear()
      .domain([0, yEndValue])
      .rangeRound([dimensions.h, 0])
  }

  return { dimensions, scales, bftCeilings: trimmedBftCeilings }
}

import { scalePoint, scaleLinear, max, select } from 'd3'
import xAxis from './xAxis'
import yAxis from './yAxis'
import xGrid from './xGrid'
import windLine from './windLine'
import hoverGuide from './hoverGuide'
import hoverTarget from './hoverTarget'

export default (svg, data) => {
  const dimensions = { w: 1200, h: 200 }
  const margin = { top: 20, right: 30, bottom: 60, left: 20 }

  const maxWindSpeed = max([
    ...data.map(d => d.windSpeed),
    16
  ])

  const scales = {
    x: scalePoint()
      .domain(data.map(d => d.time))
      .range([0, dimensions.w]),
    y: scaleLinear()
      .domain([0, maxWindSpeed])
      .rangeRound([dimensions.h, 0])
  }

  const chart = select(svg)
    .attr('width', dimensions.w + margin.left + margin.right)
    .attr('height', dimensions.h + margin.top + margin.bottom)
    .style('margin-left', -margin.left + 'px')
    .append('g')
    .attr('width', dimensions.w)
    .attr('height', dimensions.h)
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const hoverEventHandlers = []
  const subscribeToHoverEvents = handler => hoverEventHandlers.push(handler)

  xAxis(chart, dimensions, scales, subscribeToHoverEvents)
  yAxis(chart, dimensions, scales, maxWindSpeed)
  xGrid(chart, dimensions, scales)

  windLine(chart, dimensions, scales, data)

  hoverGuide(chart, dimensions, scales, data, subscribeToHoverEvents)

  hoverTarget(chart, dimensions, scales, hoverEventHandlers)
}

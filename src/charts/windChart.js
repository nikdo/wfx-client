import { select } from 'd3'
import weekDays from './weekDays'
import xAxis from './xAxis'
import yAxis from './yAxis'
import xGrid from './xGrid'
import yGrid from './yGrid'
import windLine from './windLine'
import hoverGuide from './hoverGuide'
import hoverTarget from './hoverTarget'

const drawChart = (svg, dimensions) => {
  const margin = { top: 20, right: 80, bottom: 40, left: 20 }
  return select(svg)
    .attr('width', dimensions.w + margin.left + margin.right)
    .attr('height', dimensions.h + margin.top + margin.bottom)
    .style('margin-left', -margin.left + 'px')
    .append('g')
    .attr('width', dimensions.w)
    .attr('height', dimensions.h)
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
}

export default (svg, data, visualisations) => {
  const { dimensions, scales, windTickValues, swimlineHeight } = visualisations

  const chart = drawChart(svg, dimensions)

  const hoverEventHandlers = []
  const subscribeToHoverEvents = handler => hoverEventHandlers.push(handler)

  xGrid(chart, dimensions, scales)
  yGrid(chart, dimensions, scales, windTickValues)

  windLine(chart, dimensions, scales, data, subscribeToHoverEvents)

  weekDays(chart, dimensions, scales, swimlineHeight)
  xAxis(chart, dimensions, scales, subscribeToHoverEvents)
  yAxis(chart, dimensions, scales, windTickValues)

  hoverGuide(chart, dimensions, scales, data, subscribeToHoverEvents)

  hoverTarget(chart, dimensions, scales, hoverEventHandlers)
}

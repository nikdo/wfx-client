import { select } from 'd3'
import weekDays from './weekDays'
import xAxis from './xAxis'
import yAxis from './yAxis'
import xGrid from './xGrid'
import yGrid from './yGrid'
import windLine from './windLine'
import hoverGuide from './hoverGuide'
import hoverTarget from './hoverTarget'

export default (root, data, visualisations) => {
  const { dimensions, scales, windTickValues, swimlineHeight } = visualisations
  const chart = select(root)

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

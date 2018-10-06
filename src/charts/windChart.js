import { select } from 'd3'
import weekDays from './weekDays'
import xAxis from './xAxis'
import yAxis from './yAxis'
import xGrid from './xGrid'
import yGrid from './yGrid'
import windLine from './windLine'
import hoverGuide from './hoverGuide'
import hoverTarget from './hoverTarget'

export default (canvasNode, data, visualisations) => {
  const { dimensions, scales, bftCeilings } = visualisations
  const canvas = select(canvasNode)

  const hoverEventHandlers = []
  const subscribeToHoverEvents = handler => hoverEventHandlers.push(handler)

  xGrid(canvas, dimensions, scales)
  yGrid(canvas, dimensions, scales, bftCeilings)

  windLine(canvas, dimensions, scales, data, subscribeToHoverEvents)

  weekDays(canvas, dimensions, scales)
  xAxis(canvas, dimensions, scales, subscribeToHoverEvents)
  yAxis(canvas, dimensions, scales, bftCeilings)

  hoverGuide(canvas, dimensions, scales, data, subscribeToHoverEvents)

  hoverTarget(canvas, dimensions, scales, hoverEventHandlers)
}

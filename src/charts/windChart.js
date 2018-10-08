import { select } from 'd3'
import levelIterator from './levelIterator'
import weekDays from './weekDays'
import xAxis from './xAxis'
import yAxis from './yAxis'
import xGrid from './xGrid'
import yGrid from './yGrid'
import windLine from './windLine'
import hoverGuide from './hoverGuide'
import hoverTarget from './hoverTarget'

const skippedLevels = 2

export default (canvasNode, data, visualisations) => {
  const { dimensions, scales, bftCeilings } = visualisations
  const canvas = select(canvasNode)

  const hoverEventHandlers = []
  const subscribeToHoverEvents = handler => hoverEventHandlers.push(handler)

  const forEachLevel = levelIterator(bftCeilings, scales, skippedLevels)

  xGrid(canvas, dimensions, scales)
  yGrid(canvas, dimensions, scales, bftCeilings.slice(skippedLevels))

  windLine(canvas, dimensions, scales, data, forEachLevel, subscribeToHoverEvents)

  weekDays(canvas, dimensions, scales)
  xAxis(canvas, dimensions, scales, subscribeToHoverEvents)
  yAxis(canvas, dimensions, scales, bftCeilings.slice(skippedLevels))

  hoverGuide(canvas, dimensions, scales, data, subscribeToHoverEvents)

  hoverTarget(canvas, dimensions, scales, hoverEventHandlers)
}

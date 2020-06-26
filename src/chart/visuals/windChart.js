import { select } from 'd3'
import fillClip from './defs/fillClip'
import lineClips from './defs/lineClips'
import fill from './fill'
import weekDays from './weekDays'
import xAxis from './xAxis'
import yAxis from './yAxis'
import xGrid from './xGrid'
import yGrid from './yGrid'
import hoverOverlay from './hoverOverlay'
import line from './line'

import hoverGuide from './hoverGuide'
import hoverTarget from './hoverTarget'

const skippedLevels = 2

export default (canvasNode, data, visualisations) => {
  const { dimensions, scales, bftCeilings } = visualisations
  const canvas = select(canvasNode)

  const hoverEventHandlers = []
  const subscribeToHoverEvents = handler => hoverEventHandlers.push(handler)

  fillClip(canvas, dimensions, scales, data.hourly)
  lineClips(canvas, dimensions, scales.y(bftCeilings[skippedLevels]))

  fill(canvas, dimensions, scales, bftCeilings, skippedLevels, subscribeToHoverEvents)

  xGrid(canvas, dimensions, scales)
  yGrid(canvas, dimensions, scales, bftCeilings.slice(skippedLevels))
  line(canvas, dimensions, scales, data.hourly, subscribeToHoverEvents)

  hoverOverlay(canvas, dimensions, subscribeToHoverEvents)

  weekDays(canvas, dimensions, scales)
  xAxis(canvas, dimensions, scales, subscribeToHoverEvents)
  yAxis(canvas, dimensions, scales, bftCeilings.slice(skippedLevels))

  hoverGuide(canvas, dimensions, scales, data.hourly, bftCeilings, subscribeToHoverEvents)

  hoverTarget(canvas, dimensions, scales, hoverEventHandlers)
}

import { select } from 'd3'
import levelIterator from './levelIterator'
import fillClip from './defs/fillClip'
import weekDays from './weekDays'
import xAxis from './xAxis'
import yAxis from './yAxis'
import xGrid from './xGrid'
import yGrid from './yGrid'
import hoverOverlay from './hoverOverlay'
import levelPath from './levelPath'
import levelFill from './levelFill'
import levelClip from './levelClip'
import hoverGuide from './hoverGuide'
import hoverTarget from './hoverTarget'

const skippedLevels = 2

export default (canvasNode, data, visualisations) => {
  const { dimensions, scales, bftCeilings } = visualisations
  const canvas = select(canvasNode)

  const hoverEventHandlers = []
  const subscribeToHoverEvents = handler => hoverEventHandlers.push(handler)

  const forEachLevel = levelIterator(bftCeilings, scales, skippedLevels)

  fillClip(canvas, dimensions, scales, data)
  forEachLevel(levelClip(canvas, dimensions))

  const fill = canvas.append('g')
    .attr('clip-path', 'url(#fill-clip)')
  subscribeToHoverEvents({
    onMouseOut: () => fill.attr('mask', null),
    onValueHover: () => fill.attr('mask', 'url(#hover-overlay)')
  })
  forEachLevel(levelFill(fill, dimensions))

  xGrid(canvas, dimensions, scales)
  yGrid(canvas, dimensions, scales, bftCeilings.slice(skippedLevels))
  forEachLevel(levelPath(canvas, dimensions, scales, data, subscribeToHoverEvents))

  hoverOverlay(canvas, dimensions, subscribeToHoverEvents)

  weekDays(canvas, dimensions, scales)
  xAxis(canvas, dimensions, scales, subscribeToHoverEvents)
  yAxis(canvas, dimensions, scales, bftCeilings.slice(skippedLevels))

  hoverGuide(canvas, dimensions, scales, data, subscribeToHoverEvents)

  hoverTarget(canvas, dimensions, scales, hoverEventHandlers)
}

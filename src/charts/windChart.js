import { select } from 'd3'
import levelIterator from './levelIterator'
import fillClip from './defs/fillClip'
import lineClips from './defs/lineClips'
import weekDays from './weekDays'
import xAxis from './xAxis'
import yAxis from './yAxis'
import xGrid from './xGrid'
import yGrid from './yGrid'
import hoverOverlay from './hoverOverlay'
import line from './line'
import levelFill from './levelFill'
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
  lineClips(canvas, dimensions, scales.y(bftCeilings[skippedLevels]))

  const fill = canvas.append('g')
    .attr('clip-path', 'url(#fill-clip)')
  subscribeToHoverEvents({
    onMouseOut: () => fill.attr('mask', null),
    onValueHover: () => fill.attr('mask', 'url(#hover-overlay)')
  })
  forEachLevel(levelFill(fill, dimensions))

  xGrid(canvas, dimensions, scales)
  yGrid(canvas, dimensions, scales, bftCeilings.slice(skippedLevels))
  line(canvas, dimensions, scales, data, subscribeToHoverEvents)

  hoverOverlay(canvas, dimensions, subscribeToHoverEvents)

  weekDays(canvas, dimensions, scales)
  xAxis(canvas, dimensions, scales, subscribeToHoverEvents)
  yAxis(canvas, dimensions, scales, bftCeilings.slice(skippedLevels))

  hoverGuide(canvas, dimensions, scales, data, subscribeToHoverEvents)

  hoverTarget(canvas, dimensions, scales, hoverEventHandlers)
}

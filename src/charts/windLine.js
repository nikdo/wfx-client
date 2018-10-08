import hoverOverlay from './hoverOverlay'
import levelPath from './levelPath'
import levelFill from './levelFill'
import levelClip from './levelClip'

export default (canvas, dimensions, scales, data, forEachLevel, subscribeToHoverEvents) => {
  forEachLevel(levelClip(canvas, dimensions))
  forEachLevel(levelFill(canvas, dimensions, scales, data, subscribeToHoverEvents))
  forEachLevel(levelPath(canvas, dimensions, scales, data, subscribeToHoverEvents))

  hoverOverlay(canvas, dimensions, subscribeToHoverEvents)
}

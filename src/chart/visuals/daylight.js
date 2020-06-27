import darknessOverlay from './darknessOverlay'
import darknessSeparators from './darknessSeparators'

export default (canvas, dimensions, scales, data) => {
  darknessOverlay(canvas, dimensions, scales, data)
  darknessSeparators(canvas, dimensions, scales, data)
}

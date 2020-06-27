import darknessOverlay from './darknessOverlay'
import darknessSeparators from './darknessSeparators'

export default (canvas, dimensions, scales, data) => {
  // TODO: filter out of range data sooner by comparing to max value
  // instead of checking whether it is out of scale here
  const nights = data
    .map(({ start, end }) => ({
      ...(scales.x(start) ? { start } : {}),
      ...(scales.x(end) ? { end } : {})
    }))
    .filter(night => Object.keys(night).length)

  darknessOverlay(canvas, dimensions, scales, nights)
  darknessSeparators(canvas, dimensions, scales, nights)
}

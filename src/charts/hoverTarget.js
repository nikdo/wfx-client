import { mouse, range, bisect } from 'd3'

// Based on https://stackoverflow.com/a/40574104/5763764
// Haven't found any other way how to get tick positions from a point scale.
const getPointScaleTickPositions = scale => {
  const [start, stop] = scale.range()
  return range(start, stop, scale.step())
    // Last tick has to be added because range function excludes it.
    .concat([stop])
    // Axis ticks have 0.5px offset: https://github.com/d3/d3/blob/master/CHANGES.md#axes-d3-axis
    .map(pos => pos + 0.5)
}

const getClosestValueIndex = (array, value) => {
  const r = bisect(array, value, 1)
  const l = r - 1
  return value - array[l] < array[r] - value ? l : r
}

export default (chart, dimensions, scales, eventHandlers) => {
  const hourTickPositions = getPointScaleTickPositions(scales.x)
  let selectedIndex = null
  chart.append('rect')
    .attr('class', 'hover-target')
    .attr('width', dimensions.w)
    .attr('height', dimensions.h)
    .on('mouseover', () => eventHandlers.forEach(handler => handler.onMouseOver && handler.onMouseOver()))
    .on('mouseout', () => eventHandlers.forEach(handler => handler.onMouseOut && handler.onMouseOut()))
    .on('mousemove', function () {
      const newIndex = getClosestValueIndex(hourTickPositions, mouse(this)[0])
      if (newIndex !== selectedIndex) {
        selectedIndex = newIndex
        const x = hourTickPositions[selectedIndex]
        eventHandlers.forEach(handler => handler.onValueHover && handler.onValueHover(x, selectedIndex))
      }
    })
}

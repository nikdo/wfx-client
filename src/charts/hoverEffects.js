import { range, bisect } from 'd3'
import chartHover from './chartHover'

// Based on https://stackoverflow.com/a/40574104/5763764
// Haven't found any other way how to get tick positions from a point scale.
// Plus: Not sure why but d3 axis ticks are 0.5px shifted.
// Note: Last tick has to be added because range function excludes it.
const getPointScaleTickPositions = scale => {
  const [start, stop] = scale.range()
  return range(start, stop, scale.step())
    .concat([stop])
    .map(pos => pos + 0.5)
}

const getClosestValueIndex = (array, value) => {
  const r = bisect(array, value, 1)
  const l = r - 1
  return value - array[l] < array[r] - value ? l : r
}

export default (chart, scales, dimensions, data) => {
  const hourTickPositions = getPointScaleTickPositions(scales.x)

  const hover = chart.append('g')
    .attr('class', 'hover')
    .style('display', 'none')

  hover.append('line')
    .attr('class', 'guide')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', dimensions.h)

  const time = hover.append('g')
    .attr('class', 'time')
    .attr('transform', `translate(0, ${dimensions.h})`)

  time.append('circle')
    .attr('r', 3)

  time.append('text')
    .attr('x', 9)
    .attr('alignment-baseline', 'middle')

  const onMouseOver = () => hover.style('display', null)
  const onMouseOut = () => hover.style('display', 'none')
  const onMouseMove = function ([x, y]) {
    const i = getClosestValueIndex(hourTickPositions, x)
    hover.attr('transform', `translate(${hourTickPositions[i]},0)`)
    hover.select('.time text').text(scales.x.domain()[i].format('dd HH:mm'))
  }

  chartHover(chart, dimensions, onMouseOver, onMouseOut, onMouseMove)
}

import { range, bisect } from 'd3'
import { lineHeight } from './constants'

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

export default (chart, dimensions, scales, data, subscribeToHoverEvents) => {
  const hourTickPositions = getPointScaleTickPositions(scales.x)

  const hover = chart.append('g')
    .attr('class', 'hover')
    .style('display', 'none')

  const line = hover.append('line')
    .attr('class', 'guide')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', dimensions.h)

  const value = hover.append('g')
    .attr('class', 'value')

  value.append('circle')
    .attr('r', 3)

  const time = hover.append('g')
    .attr('class', 'time')
    .attr('transform', `translate(0, ${dimensions.h})`)

  time.append('path')
    .attr('fill', 'none')
    .attr('d', `M 0 0 V ${lineHeight} H ${lineHeight / 4}`)

  time.append('text')
    .attr('x', lineHeight / 2)
    .attr('y', lineHeight)
    .attr('alignment-baseline', 'middle')

  subscribeToHoverEvents({
    onMouseOver: () => hover.style('display', null),
    onMouseOut: () => hover.style('display', 'none'),
    onMouseMove: ([x]) => {
      const i = getClosestValueIndex(hourTickPositions, x)
      const y = scales.y(data[i].windSpeed)
      hover.attr('transform', `translate(${hourTickPositions[i]}, 0)`)
      line.attr('y1', y)
      value.attr('transform', `translate(0, ${y})`)
      hover.select('.time text').text(scales.x.domain()[i].format('dd HH:mm'))
    }
  })
}

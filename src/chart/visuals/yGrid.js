import { axisLeft } from 'd3'

export default (canvas, dimensions, scales, tickValues) => {
  const yGrid = axisLeft()
    .scale(scales.y)
    .tickSize(-dimensions.w)
    .tickValues(tickValues)
    .tickFormat('')

  canvas.append('g')
    .attr('class', 'y grid')
    .call(yGrid)
}

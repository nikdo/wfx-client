export default (canvas, dimensions, scales, data) => {
  const rectDimensions = data
    .map(({ start, end }) => ({
      x1: start ? scales.x(start) + 1 : 0,
      x2: end ? scales.x(end) : dimensions.w
    }))
    .map(({ x1, x2 }) => ({
      x: x1,
      width: x2 - x1
    }))

  const overlay = canvas.append('g')
    .attr('class', 'darkness-overlay')

  rectDimensions.forEach(({ x, width }) => {
    overlay.append('rect')
      .attr('y', 0)
      .attr('x', x)
      .attr('width', width)
      .attr('height', dimensions.h)
      .attr('clip-path', 'url(#fill-clip)')
  })
}

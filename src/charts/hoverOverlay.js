export default (canvas, dimensions, subscribeToHoverEvents) => {
  const mask = canvas.append('mask')
    .attr('id', 'hover-overlay')

  const visible = mask.append('rect')
    .attr('height', dimensions.h)
    .style('fill', '#fff')

  const hidden = mask.append('rect')
    .attr('width', dimensions.w)
    .attr('height', dimensions.h)
    .style('fill', '#222')

  subscribeToHoverEvents({
    onValueHover: x => {
      visible.attr('width', x)
      hidden.attr('x', x)
    }
  })
}

export default (svg, scales, dimensions) => {
  const breakpoint = scales.y(4)

  const mask = svg
    .append('defs')
    .append('mask')
    .attr('id', 'transparency')

  mask.append('rect')
    .attr('y', breakpoint)
    .attr('width', dimensions.w)
    .attr('height', dimensions.h - breakpoint)
    .style('fill', '#222')

  mask.append('rect')
    .attr('width', dimensions.w)
    .attr('height', breakpoint)
    .style('fill', '#fff')
}

export default (defs, dimensions, breakpoint) => {
  defs.append('clipPath')
    .attr('id', 'relevant-levels')
    .append('rect')
    .attr('width', dimensions.w)
    .attr('height', breakpoint)
  defs.append('clipPath')
    .attr('id', 'skipped-levels')
    .append('rect')
    .attr('width', dimensions.w)
    .attr('height', dimensions.h - breakpoint)
    .attr('y', breakpoint)
}

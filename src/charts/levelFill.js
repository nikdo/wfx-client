export default (root, dimensions) => (level, start, end) => {
  root.append('rect')
    .attr('y', end)
    .attr('width', dimensions.w)
    .attr('height', start - end)
    .attr('class', `wind-fill level-${level}`)
}

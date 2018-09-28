import { axisBottom } from 'd3'

export default (chart, dimensions, scales) => {
  const xGrid = axisBottom()
    .scale(scales.x)
    .tickSize(-dimensions.h)
    .tickValues(scales.x.domain().filter(d => d.format('HH').match(/00/)))
    .tickFormat('')

  return chart.append('g')
    .attr('class', 'x grid')
    .attr('transform', `translate(0, ${dimensions.h})`)
    .call(xGrid)
}

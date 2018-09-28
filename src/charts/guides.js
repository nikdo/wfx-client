import { axisBottom } from 'd3'

export default (chart, scales, dimensions, maxWindSpeed) => {
  const xGrid = axisBottom()
    .scale(scales.x)
    .tickSize(-dimensions.h)
    .tickValues(scales.x.domain().filter(d => d.format('HH').match(/00/)))
    .tickFormat('')

  chart.append('g')
    .attr('class', 'x grid')
    .attr('transform', `translate(0, ${dimensions.h})`)
    .call(xGrid)
}

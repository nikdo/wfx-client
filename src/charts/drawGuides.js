import { axisBottom, axisLeft } from 'd3'

const evenNumbers = max => [...Array(max).keys()]
  .map(i => ++i)
  .filter(i => !(i % 2))

export default (chart, scales, dimensions, maxWindSpeed) => {
  const guides = {
    xAxis: axisBottom()
      .scale(scales.x)
      .tickValues(scales.x.domain().filter(d => d.format('HH').match(/(00|06|12|18)/)))
      .tickSize(0)
      .tickFormat(d => d.format('dd HH:mm')),
    xGrid: axisBottom()
      .scale(scales.x)
      .tickSize(-dimensions.h)
      .tickValues(scales.x.domain().filter(d => d.format('HH').match(/00/)))
      .tickFormat(''),
    yAxis: axisLeft()
      .scale(scales.y)
      .tickSize(-dimensions.w)
      .tickValues(evenNumbers(maxWindSpeed))
  }

  chart.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${dimensions.h})`)
    .call(guides.xAxis)
    .selectAll('text')
    .attr('y', 0)
    .attr('x', 9)
    .attr('dy', '.35em')
    .attr('transform', 'rotate(90)')
    .style('text-anchor', 'start')

  chart.append('g')
    .attr('class', 'y axis')
    .call(guides.yAxis)

  chart.append('g')
    .attr('class', 'x grid')
    .attr('transform', `translate(0, ${dimensions.h})`)
    .call(guides.xGrid)
}

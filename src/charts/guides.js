import { axisBottom, axisLeft } from 'd3'

const evenNumbers = max => [...Array(max).keys()]
  .map(i => ++i)
  .filter(i => !(i % 2))

export default (chart, scales, dimensions, maxWindSpeed) => {
  const guides = {
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
    .attr('class', 'y axis')
    .call(guides.yAxis)

  chart.append('g')
    .attr('class', 'x grid')
    .attr('transform', `translate(0, ${dimensions.h})`)
    .call(guides.xGrid)
}

import * as d3 from 'd3'
import moment from 'moment'

const evenNumbers = max => [...Array(max).keys()]
  .map(i => ++i)
  .filter(i => !(i % 2))

const drawGuides = (chart, scales, dimensions, maxWindSpeed) => {
  const guides = {
    xAxis: d3.axisBottom()
      .scale(scales.x)
      .tickValues(scales.x.domain().filter(d => d.match(/T(00|06|12|18):00/)))
      .tickSize(0)
      .tickFormat(d => moment(d).format('dd HH:mm')),
    xGrid: d3.axisBottom()
      .scale(scales.x)
      .tickSize(-dimensions.h)
      .tickValues(scales.x.domain().filter(d => d.match(/T00:00/)))
      .tickFormat(''),
    yAxis: d3.axisLeft()
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

const createMask = (svg, scales, dimensions) => {
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

const drawLine = (chart, scales, dimensions, data) => {
  const line = d3.line()
    .x(d => scales.x(d.time))
    .y(d => scales.y(d.windSpeed))
    .curve(d3.curveNatural)

  const area = d3.area()
    .x(d => scales.x(d.time))
    .y1(d => scales.y(d.windSpeed))
    .y0(() => dimensions.h)
    .curve(d3.curveNatural)

  chart.append('path')
    .attr('class', 'wind-fill')
    .datum(data)
    .attr('d', area)
    .attr('mask', 'url(#transparency)')

  chart.append('path')
    .attr('class', 'wind')
    .datum(data)
    .attr('d', line)
    .attr('mask', 'url(#transparency)')
}

export default (root, data) => {
  const dimensions = { w: 1200, h: 200 }
  const margin = { top: 20, right: 30, bottom: 160, left: 20 }

  const maxWindSpeed = d3.max([
    ...data.map(d => d.windSpeed),
    16
  ])

  const scales = {
    x: d3.scalePoint()
      .domain(data.map(d => d.time))
      .range([0, dimensions.w]),
    y: d3.scaleLinear()
      .domain([0, maxWindSpeed])
      .rangeRound([dimensions.h, 0])
  }

  const chart = d3.select(root)
    .attr('width', dimensions.w + margin.left + margin.right)
    .attr('height', dimensions.h + margin.top + margin.bottom)
    .style('margin-left', -margin.left + 'px')
    .append('g')
    .attr('width', dimensions.w)
    .attr('height', dimensions.h)
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  createMask(d3.select(root), scales, dimensions)

  drawGuides(chart, scales, dimensions, maxWindSpeed)

  drawLine(chart, scales, dimensions, data)
}

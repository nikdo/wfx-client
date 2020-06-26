import { axisBottom } from 'd3'

export default (canvas, dimensions, scales, data) => {
  const separators = axisBottom()
    .scale(scales.x)
    .tickSize(-dimensions.h)
    .tickValues([...data.map(day => day.sunriseTime), ...data.map(day => day.sunsetTime)])
    .tickFormat('')

  canvas.append('g')
    .attr('class', 'x daylight')
    .attr('clip-path', 'url(#fill-clip)')
    .append('g')
    .attr('transform', `translate(0, ${dimensions.h})`)
    .call(separators)
}

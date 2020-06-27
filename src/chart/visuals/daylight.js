import { axisBottom } from 'd3'

export default (canvas, dimensions, scales, data) => {
  const separators = axisBottom()
    .scale(scales.x)
    .tickSize(-dimensions.h)
    .tickValues([
      ...data.map(night => night.start),
      ...data.map(night => night.end)
    ].filter(time => scales.x(time)))
    .tickFormat('')

  canvas.append('g')
    .attr('class', 'x daylight')
    .attr('clip-path', 'url(#fill-clip)')
    .append('g')
    .attr('transform', `translate(0, ${dimensions.h})`)
    .call(separators)
}

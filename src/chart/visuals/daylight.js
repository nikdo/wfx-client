import { axisBottom } from 'd3'
import { fillClipUrl } from './defs/fillClip'
import darknessOverlay from './darknessOverlay'

export default (canvas, dimensions, scales, data) => {
  // TODO: filter out of range data sooner by comparing to max value
  // instead of checking whether it is out of scale here
  const nights = data
    .map(({ start, end }) => ({
      ...(scales.x(start) ? { start } : {}),
      ...(scales.x(end) ? { end } : {})
    }))
    .filter(night => Object.keys(night).length)

  darknessOverlay(canvas, dimensions, scales, nights)

  const separators = axisBottom()
    .scale(scales.x)
    .tickSize(-dimensions.h)
    .tickValues([
      ...nights.map(night => night.start),
      ...nights.map(night => night.end)
    ].filter(time => time))
    .tickFormat('')

  canvas.append('g')
    .attr('class', 'x daylight')
    .attr('clip-path', fillClipUrl)
    .append('g')
    .attr('transform', `translate(0, ${dimensions.h})`)
    .call(separators)
}

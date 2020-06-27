import { fillClipUrl } from './defs/fillClip'

export default (canvas, dimensions, scales, data) => {
  const rects = data
    .map(({ start, end }) => ({
      x1: start ? scales.x(start) + 1 : 0,
      x2: end ? scales.x(end) : dimensions.w
    }))
    .map(({ x1, x2 }) => ({
      x: x1,
      width: x2 - x1
    }))

  canvas.append('g')
    .attr('class', 'darkness-overlay')
    .selectAll('rect')
    .data(rects)
    .enter().append('rect')
    .attr('y', 0)
    .attr('x', rect => rect.x)
    .attr('width', rect => rect.width)
    .attr('height', dimensions.h)
    .attr('clip-path', fillClipUrl)
}

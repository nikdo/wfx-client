import { bisect } from 'd3'

export default (levelsCeilings, maxValue) => {
  const maxLevel = bisect(levelsCeilings, maxValue) + 1
  return levelsCeilings.slice(0, maxLevel)
}

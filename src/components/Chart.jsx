import React, { Component } from 'react'
import { scalePoint, scaleLinear, max } from 'd3'
import './Chart.css'
import windChart from '../charts/windChart'

const ceilToEven = num => 2 * Math.ceil(num / 2)

const evenNumbers = max => [...Array(max).keys()]
  .map(i => ++i)
  .filter(i => !(i % 2))

const getVisualisations = data => {
  const yMax = ceilToEven(max([
    ...data.map(d => d.windSpeed),
    14
  ])) + 2

  const swimlineHeight = 25
  const dimensions = { w: 1200, h: yMax / 2 * swimlineHeight }
  const scales = {
    x: scalePoint()
      .domain(data.map(d => d.time))
      .range([0, dimensions.w]),
    y: scaleLinear()
      .domain([0, yMax])
      .rangeRound([dimensions.h, 0])
  }
  const windTickValues = evenNumbers(yMax)

  return { dimensions, scales, windTickValues, swimlineHeight }
}

export default class Chart extends Component {
  constructor (props) {
    super(props)
    this.node = React.createRef()
  }

  removeChart () {
    const chart = this.node.current
    while (chart.hasChildNodes()) {
      chart.removeChild(chart.lastChild)
    }
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.spotId !== this.props.spotId
  }

  componentDidMount () {
    windChart(this.node.current, this.props.forecast, getVisualisations(this.props.forecast))
  }

  componentDidUpdate () {
    this.removeChart()
    windChart(this.node.current, this.props.forecast, getVisualisations(this.props.forecast))
  }

  render () {
    return <svg ref={this.node} />
  }
}

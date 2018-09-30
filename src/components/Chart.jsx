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
    this.state = { visualisations: null }
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

  static getDerivedStateFromProps (props) {
    return { visualisations: getVisualisations(props.forecast) }
  }

  componentDidMount () {
    windChart(this.node.current, this.props.forecast, this.state.visualisations)
  }

  componentDidUpdate () {
    this.removeChart()
    windChart(this.node.current, this.props.forecast, this.state.visualisations)
  }

  render () {
    const { dimensions } = this.state.visualisations
    const margin = { top: 20, right: 80, bottom: 40, left: 20 }
    return (
      <svg
        width={dimensions.w + margin.left + margin.right}
        height={dimensions.h + margin.top + margin.bottom}
        style={{ marginLeft: -margin.left }}
      >
        <g
          ref={this.node}
          width={dimensions.w}
          height={dimensions.h}
          transform={`translate(${margin.left}, ${margin.top})`}
        />
      </svg>
    )
  }
}

import React, { Component } from 'react'
import './Chart.css'
import windChart from '../charts/windChart'

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

  componentDidMount () {
    windChart(this.node.current, this.props.forecast)
  }

  componentDidUpdate () {
    this.removeChart()
    windChart(this.node.current, this.props.forecast)
  }

  render () {
    return <svg ref={this.node} />
  }
}

import React, { Component } from 'react'
import './Chart.css'
import windChart from '../charts/windChart'

export default class Chart extends Component {
  constructor (props) {
    super(props)
    this.node = React.createRef()
  }

  componentDidMount () {
    windChart(this.node.current, this.props.forecast)
  }

  render () {
    return <svg ref={this.node} />
  }
}

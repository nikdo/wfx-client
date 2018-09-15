import React, { Component } from 'react'
import { select } from 'd3'
import './Chart.css'

export default class Chart extends Component {
  constructor (props) {
    super(props)
    this.node = React.createRef()
  }

  componentDidMount () {
    select(this.node.current)
      .append('circle')
      .style('stroke', 'gray')
      .style('fill', 'white')
      .attr('r', 40)
      .attr('cx', 50)
      .attr('cy', 50)
    console.log(this.props.forecast)
  }

  render () {
    return <svg ref={this.node} />
  }
}

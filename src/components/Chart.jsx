import React, { Component } from 'react'
import './Chart.css'

export default class Chart extends Component {
  constructor (props) {
    super(props)
    this.node = React.createRef()
  }

  componentDidMount () {
    console.log(this.node.current)
    console.log(this.props.forecast)
  }

  render () {
    return <svg ref={this.node} />
  }
}

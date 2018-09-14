import React from 'react'
import moment from 'moment'

const renderFrame = frame => {
  return <tr key={frame.time.toString()}>
    <th>{moment(frame.time).format('dd D.M. HH:mm')}</th>
    <td>{frame.windSpeed}m/s</td>
    <td>{frame.windGust}m/s</td>
    <td>{frame.windBearing}</td>
  </tr>
}

export default ({forecast}) => <table>
  <thead>
    <tr>
      <th>Day</th>
      <th>Wind speed</th>
      <th>Wind gusts</th>
      <th>Wind direction</th>
    </tr>
  </thead>
  <tbody>
    {forecast.map(renderFrame)}
  </tbody>
</table>

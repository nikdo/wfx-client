import React from 'react'

const renderFrame = frame => {
  return <tr key={frame.time.toString()}>
    <th>{frame.time.format('dd D.M. HH:mm')}</th>
    <td>{frame.windSpeed}m/s</td>
    <td>{frame.windGust}m/s</td>
    <td>{frame.windBearing}</td>
  </tr>
}

export default ({ forecast }) => <table>
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

import React from 'react'
import Chart from './Chart'
import { getSpot } from 'selectors'
import responses from './sample-api-responses'

export default {
  component: Chart,
  title: 'Chart'
}

const spots = Object.keys(responses).reduce((spots, key) => ({
  ...spots,
  [key]: getSpot({ spotDetail: responses[key] })
}), {})

export const calm = () => <Chart spotId='42' forecast={spots.calm.weather.hourly} />
export const extreme = () => <Chart spotId='42' forecast={spots.extreme.weather.hourly} />
export const flat = () => <Chart spotId='42' forecast={spots.flat.weather.hourly} />
export const fresh = () => <Chart spotId='42' forecast={spots.fresh.weather.hourly} />
export const moderate = () => <Chart spotId='42' forecast={spots.moderate.weather.hourly} />

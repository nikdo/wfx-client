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

export const calm = () => <Chart spotId='42' weather={spots.calm.weather} />
export const extreme = () => <Chart spotId='42' weather={spots.extreme.weather} />
export const flat = () => <Chart spotId='42' weather={spots.flat.weather} />
export const fresh = () => <Chart spotId='42' weather={spots.fresh.weather} />
export const moderate = () => <Chart spotId='42' weather={spots.moderate.weather} />
export const night = () => <Chart spotId='42' weather={spots.night.weather} />

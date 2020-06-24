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

export const calm = () => <Chart {...spots.calm} />
export const extreme = () => <Chart {...spots.extreme} />
export const flat = () => <Chart {...spots.flat} />
export const fresh = () => <Chart {...spots.fresh} />
export const moderate = () => <Chart {...spots.moderate} />

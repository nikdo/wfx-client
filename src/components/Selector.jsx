import React from 'react'
import Select from 'react-select'
import './Selector.css'

const label = ({ country, region, name }) =>
  `${region ? region + ': ' : ''} ${name} (${country})`

const options = spots => spots.map(spot => ({
  label: label(spot),
  value: spot._id
}))

export default ({ value, spots, onChange }) => (
  <Select
    value={options(spots).find(option => option.value === value)}
    onChange={option => onChange(option.value)}
    options={options(spots)}
    blurInputOnSelect
    isClearable={false}
    backspaceRemovesValue={false}
    className='select'
    classNamePrefix='select'
  />
)

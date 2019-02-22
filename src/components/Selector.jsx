import React from 'react'
import Select from 'react-select'
import './Selector.css'

const location = ({ region, country }) =>
  `${region ? region + ', ' : ''}${country}`

const options = spots => spots.map(spot => ({
  label: `${spot.name} (${location(spot)})`,
  value: spot._id
}))

export default ({ value, disabled, spots, onChange }) => (
  <Select
    value={options(spots).find(option => option.value === value)}
    onChange={option => onChange(option.value)}
    options={options(spots)}
    isDisabled={disabled}
    blurInputOnSelect
    isClearable={false}
    backspaceRemovesValue={false}
    className='select'
    classNamePrefix='select'
  />
)

import React, { useState, useEffect } from 'react'
import {FormSelect, FormSelectProps} from 'react-bootstrap'

import { fetchCountry } from '../../api/filter';
interface CountryProps extends FormSelectProps {
  value?: number,
}


function Country(props: CountryProps) {
  const none = {value: 0, text: 'Все страны'}
  const [selectOptions, setOptions] = useState([none]);

  useEffect(() => {
    fetchCountry()
      .then((data) => setOptions([none, ...data]))
      .catch(err => console.log(err))
  }, []); 

  return (
    <FormSelect size="lg" {...props}>
      {selectOptions.map((selectOption, i) => 
        <option key={i} value={selectOption.value}>{selectOption.text}</option>)}
    </FormSelect>
  )
}

export default Country;
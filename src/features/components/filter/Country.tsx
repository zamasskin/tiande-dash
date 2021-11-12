import React, { useState } from 'react'
import {FormSelect, FormSelectProps} from 'react-bootstrap'

import { fetchCountry } from '../../api/filter';
interface CountryProps extends FormSelectProps {
  value?: number,
  params?: {
    useId?: number;
    allowed?: boolean;
  } 
}


function Country(props: CountryProps) {
  const {useId = 0, allowed = true} = props.params;
  const none = {value: 0, text: 'Все страны'}
  const [selectOptions, setOptions] = useState([none]);

  fetchCountry(useId, allowed)
    .then((data) => setOptions([none, ...data]))
    .catch(err => console.log(err))
  

  return (
    <FormSelect size="lg" {...props}>
      {selectOptions.map((selectOption, i) => 
        <option key={i} value={selectOption.value}>{selectOption.text}</option>)}
    </FormSelect>
  )
}

export default Country;
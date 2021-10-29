import React, { useState } from 'react'
import {FormSelect, FormSelectProps} from 'react-bootstrap'

import { fetchCountry } from '../../../models/api/filter';
interface CountryProps extends FormSelectProps {
  value?: number,
  useId?: number;
  allowed?: boolean;
}


function Country(props: CountryProps) {
  const {useId = 0, allowed = true} = props;
  const none = {value: 0, text: 'Все страны'}
  const [selectOptions, setOptions] = useState([none]);

  fetchCountry(useId, allowed)
    .then((data) => setOptions([none, ...data]))
    .catch(err => console.log(err))
  

  return (
    <FormSelect {...props}>
      {selectOptions.map((selectOption, i) => 
        <option key={i} value={selectOption.value}>{selectOption.text}</option>)}
    </FormSelect>
  )
}

export default Country;
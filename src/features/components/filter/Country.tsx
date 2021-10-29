import axios from 'axios';
import React, { useState } from 'react'
import {Form} from 'react-bootstrap'
import { fetchCountry } from '../../../models/api/filter';



interface CountryParams{
  useId?: number;
  allowed?: boolean;
  value?: number;
  onSelect?: (number) => any
}

function Country(params: CountryParams) {
  const {useId = 0, allowed = true, value = 0} = params;
  const none = {value: 0, text: 'Все страны'}
  const [selectOptions, setOptions] = useState([none]);

  fetchCountry(useId, allowed)
    .then((data) => setOptions([none, ...data]))
    .catch(err => console.log(err))
  

  return (
    <Form.Select size="lg" value={value} onChange={(ev:any) => params.onSelect ? params.onSelect(ev.target.value) : null}>
      {selectOptions.map((selectOption, i) => 
        <option key={i} value={selectOption.value}>{selectOption.text}</option>)}
    </Form.Select>
  )
}

export default Country;
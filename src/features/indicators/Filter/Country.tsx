import axios from 'axios';
import React, { useState } from 'react'
import {Form} from 'react-bootstrap'
import { fetchCountry } from '../../../models/api/filter';

function Country({useId = 0, allowed = true}) {
  const none = {value: 0, text: 'Все страны'}
  const [selectOptions, setOptions] = useState([none]);

  fetchCountry(useId, allowed)
    .then((data) => setOptions([none, ...data]))
    .catch(err => console.log(err))
  

  return (
    <Form.Select size="lg">
      {selectOptions.map((selectOption, i) => 
        <option key={i} value={selectOption.value}>{selectOption.text}</option>)}
    </Form.Select>
  )
}

export default Country;
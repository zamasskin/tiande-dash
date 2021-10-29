import { useState } from 'react'
import {FormSelect, FormSelectProps} from 'react-bootstrap'

import { fetchStorage } from '../../../models/api/filter';

interface StoragesProps extends FormSelectProps {
  value?: string
}

function Storages(props: StoragesProps) {
  const none = {value: 0, text: 'Все склады'}
  const [selectOptions, setOptions] = useState([none]);

  fetchStorage()
    .then((data) => setOptions([none, ...data]))
    .catch(err => console.log(err))


  return (
    <FormSelect {...props}>
      {selectOptions.map((selectOption, i) => 
        <option key={i} value={selectOption.value}>{selectOption.text}</option>)}
    </FormSelect>
  )
}

export default Storages;
import  { useState } from "react";
import {FormSelect, FormSelectProps} from 'react-bootstrap'

import { fetchCurrencies } from "../../api/filter";

interface CurrenciesProps extends FormSelectProps {
  value?: string
}

function Currencies(props: CurrenciesProps) {
  const none = { value: '', text: "Все валюты" };
  const [selectOptions, setOptions] = useState([none]);

  fetchCurrencies()
    .then((data) => setOptions([none, ...data]))
    .catch((err) => console.log(err));

  return (
    <FormSelect {...props}>
      {selectOptions.map((selectOption, i) => (
        <option key={i} value={selectOption.value}>
          {selectOption.text}
        </option>
      ))}
    </FormSelect>
  );
}

export default Currencies;

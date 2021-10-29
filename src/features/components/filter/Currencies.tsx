import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import {FormSelect, FormSelectProps} from 'react-bootstrap'

import { fetchCurrencies } from "../../../models/api/filter";

interface CurrenciesProps extends FormSelectProps {
  value?: string
}

function Currencies(props: CurrenciesProps) {
  const none = { value: 0, text: "Все валюты" };
  const [selectOptions, setOptions] = useState([none]);

  fetchCurrencies()
    .then((data) => setOptions([none, ...data]))
    .catch((err) => console.log(err));

  return (
    <FormSelect size="lg" {...props}>
      {selectOptions.map((selectOption, i) => (
        <option key={i} value={selectOption.value}>
          {selectOption.text}
        </option>
      ))}
    </FormSelect>
  );
}

export default Currencies;

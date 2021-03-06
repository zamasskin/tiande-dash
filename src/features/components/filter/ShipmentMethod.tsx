
import React, { useState, useEffect } from "react";
import {FormSelect, FormSelectProps} from 'react-bootstrap'

import { fetchShipmentMethod } from "../../api/filter";

interface CurrenciesProps extends FormSelectProps {
  value?: string
}

function shipmentMethod(props: CurrenciesProps) {
  const none = { value: 0, text: "Все валюты" };
  const [selectOptions, setOptions] = useState([none]);

  useEffect(() => {
    fetchShipmentMethod()
      .then((data) => setOptions([none, ...data]))
      .catch((err) => console.log(err));
  }, [])
  

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

export default shipmentMethod;
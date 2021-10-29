import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { fetchCurrencies } from "../../../models/api/filter";

function Currencies() {
  const none = { value: 0, text: "Все валюты" };
  const [selectOptions, setOptions] = useState([none]);

  fetchCurrencies()
    .then((data) => setOptions([none, ...data]))
    .catch((err) => console.log(err));

  return (
    <Form.Select size="lg">
      {selectOptions.map((selectOption, i) => (
        <option key={i} value={selectOption.value}>
          {selectOption.text}
        </option>
      ))}
    </Form.Select>
  );
}

export default Currencies;

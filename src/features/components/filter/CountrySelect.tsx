import { FormSelect } from "react-bootstrap";


function CountrySelect(value: number) {
  return (
    <FormSelect value={value}>
      <option value={134}>Россия</option>
      <option value={1}>Америка</option>
    </FormSelect>
  )
}

export default CountrySelect;
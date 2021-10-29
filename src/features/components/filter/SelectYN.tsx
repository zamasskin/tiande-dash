import {FormSelect, FormSelectProps} from 'react-bootstrap'

export type yn = 0 | 1 | 2;

interface YNProps extends FormSelectProps {
  value?: yn
}

function SelectYN(props: YNProps) {
  <FormSelect {...props}>
    <option key="-" value={0}>Не важно</option>
    <option key="-" value={1}>Да</option>
    <option key="-" value={2}>Нет</option>
  </FormSelect>
}

export default SelectYN
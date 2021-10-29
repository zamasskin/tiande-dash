import {FormSelect, FormSelectProps} from 'react-bootstrap'

export type yn = 0 | 1 | 2;

interface YNProps extends FormSelectProps {
  value?: yn
}

function SelectYN(props: YNProps) {
  return (
    <FormSelect {...props}>
      <option key="0" value={0}>Не важно</option>
      <option key="1" value={1}>Да</option>
      <option key="2" value={2}>Нет</option>
    </FormSelect>
  )
}

export default SelectYN
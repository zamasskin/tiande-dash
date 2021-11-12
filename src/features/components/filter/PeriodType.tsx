import {FormSelect, FormSelectProps} from 'react-bootstrap'

interface PeriodTypeProps extends FormSelectProps {
  value?: string
}

function PeriodType(props: PeriodTypeProps) {
  props.value = props.value || "%Y-%m-%d";
  return (
    <FormSelect {...props}>
      <option key="day" value="%Y-%m-%d">День</option>
      <option key="week" value="%Y-%m-%w">Неделя</option>
      <option key="month" value="%Y-%m">Месяц</option>
      <option key="year" value="%Y">Год</option>
    </FormSelect>
  )
}
export default PeriodType
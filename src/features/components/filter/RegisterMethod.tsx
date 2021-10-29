import {FormSelect, FormSelectProps} from 'react-bootstrap'

interface RegisterMethodProps extends FormSelectProps {
  value?: string
}

function RegisterMethod(props: RegisterMethodProps) {
  return (
    <FormSelect {...props}>
      <option key="0" value="">Не важно</option>
      <option key="1" value="UF_IS_AUTORECR">Авторекрутинг</option>
      <option key="2" value="UF_IS_CONTRACT">Номер контракта</option>
      <option key="3" value="UF_IS_REFERRAL">Реферальная ссылка</option>
      <option key="4" value="UF_IS_PROMO">Промокод</option>
      <option key="5" value="UF_IS_SERVICE">Сервисные центры</option>
    </FormSelect>
  )
}
export default RegisterMethod
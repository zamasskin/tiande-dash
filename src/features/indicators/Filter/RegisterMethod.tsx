import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { selectRegistrationMethod, setRegistrationMethod } from '../filterSlice';

import RegisterMethodBase from '../../components/filter/RegisterMethod';

function RegisterMethod() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(selectRegistrationMethod)

  return (
    <>
      <RegisterMethodBase 
        size="lg"
        value={value}
        onChange={(ev: any) => dispatch(setRegistrationMethod(ev.target.value))}/>
    </>
  )
}

export default RegisterMethod
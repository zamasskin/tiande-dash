import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { selectPayOrder, setPayOrder } from '../filterSlice';

import SelectYN from '../../components/filter/SelectYN';

function IsPay() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(selectPayOrder)

  return (
    <>
      <SelectYN 
        size="lg"
        value={value}
        onChange={(ev: any) => dispatch(setPayOrder(ev.target.value))}/>
    </>
  )
}

export default IsPay
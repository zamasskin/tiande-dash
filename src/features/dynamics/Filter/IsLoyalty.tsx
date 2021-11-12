import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { selectIsLoyalty, setLoyalty } from '../filterSlice';

import SelectYN from '../../components/filter/SelectYN';

function IsLoyalty() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(selectIsLoyalty)

  return (
    <>
      <SelectYN 
        size="lg"
        value={value}
        onChange={(ev: any) => dispatch(setLoyalty(ev.target.value))}/>
    </>
  )
}

export default IsLoyalty
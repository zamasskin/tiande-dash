import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { selectIsEs, setIsEs } from '../filterSlice';

import SelectYN from '../../components/filter/SelectYN';

function IsEs() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(selectIsEs)

  return (
    <>
      <SelectYN 
        size="lg"
        value={value}
        onChange={(ev: any) => dispatch(setIsEs(ev.target.value))}/>
    </>
  )
}

export default IsEs
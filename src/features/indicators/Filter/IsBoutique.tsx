import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { selectIsBoutique, setIsBoutique } from '../filterSlice';

import SelectYN from '../../components/filter/SelectYN';

function IsBoutique() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(selectIsBoutique)

  return (
    <>
      <SelectYN 
        size="lg"
        value={value}
        onChange={(ev: any) => dispatch(setIsBoutique(ev.target.value))}/>
    </>
  )
}

export default IsBoutique
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { selectIsApp, setIsApp } from '../filterSlice';

import SelectYN from '../../components/filter/SelectYN';

function AppSelect() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(selectIsApp)

  return (
    <>
      <SelectYN 
        size="lg"
        value={value}
        onChange={(ev: any) => dispatch(setIsApp(ev.target.value))}/>
    </>
  )
}

export default AppSelect
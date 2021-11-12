import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { selectPeriodType, setPeriodType } from '../filterSlice';

import PeriodTypeBase from '../../components/filter/PeriodType';

function PeriodType() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(selectPeriodType)

  return (
    <>
      <PeriodTypeBase 
        size="lg"
        value={value}
        onChange={(ev: any) => dispatch(setPeriodType(ev.target.value))}/>
    </>
  )
}

export default PeriodType
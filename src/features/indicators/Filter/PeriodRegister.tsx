import moment from 'moment';

import { 
  selectPeriodUserRegisterStart, 
  selectPeriodUserRegisterEnd, 
  setPeriodUserRegisterStart, 
  setPeriodUserRegisterEnd 
} from '../filterSlice';
import { useAppSelector, useAppDispatch } from '../../../app/hooks'

import PeriodBase from '../../components/filter/Period'

function PeriodRegister() {
  const dispatch = useAppDispatch()
  const periodStart = useAppSelector(selectPeriodUserRegisterStart);
  const periodEnd = useAppSelector(selectPeriodUserRegisterEnd);

  return <PeriodBase 
    startDate={periodStart > 0 ? moment(periodStart) : null}
    endDate={periodEnd > 0 ? moment(periodEnd): null}
    name="period"
    onChange={({ startDate, endDate}) => {
      startDate && dispatch(setPeriodUserRegisterStart(startDate.toDate().getTime()))
      endDate && dispatch(setPeriodUserRegisterEnd(endDate.toDate().getTime()))
    }}/>
}

export default PeriodRegister
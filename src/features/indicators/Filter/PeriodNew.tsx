import moment from 'moment';

import { 
  selectPeriodNewStart, 
  selectPeriodNewEnd, 
  setPeriodUserNewStart, 
  setPeriodUserNewEnd 
} from '../filterSlice';
import { useAppSelector, useAppDispatch } from '../../../app/hooks'

import PeriodBase from '../../components/filter/Period'

function Period() {
  const dispatch = useAppDispatch()
  const periodStart = useAppSelector(selectPeriodNewStart);
  const periodEnd = useAppSelector(selectPeriodNewEnd);

  return <PeriodBase 
    startDate={periodStart > 0 ? moment(periodStart) : null}
    endDate={periodEnd > 0 ? moment(periodEnd): null}
    name="period"
    onChange={({ startDate, endDate}) => {
      startDate && dispatch(setPeriodUserNewStart(startDate.toDate().getTime()))
      endDate && dispatch(setPeriodUserNewEnd(endDate.toDate().getTime()))
    }}/>
}

export default Period;
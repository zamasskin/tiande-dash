import moment from 'moment';

import { selectPeriodStart, selectPeriodEnd, setPeriodStart, setPeriodEnd } from '../filterSlice';
import { useAppSelector, useAppDispatch } from '../../../app/hooks'

import PeriodBase from '../../components/filter/Period'

function Period() {
  const dispatch = useAppDispatch()
  const periodStart = useAppSelector(selectPeriodStart);
  const periodEnd = useAppSelector(selectPeriodEnd);

  return <PeriodBase 
    startDate={moment(periodStart)}
    endDate={moment(periodEnd)}
    name="period"
    onChange={({ startDate, endDate}) => {
      startDate && dispatch(setPeriodStart(startDate.toDate().getTime()))
      endDate && dispatch(setPeriodEnd(endDate.toDate().getTime()))
    }}/>
}

export default Period;
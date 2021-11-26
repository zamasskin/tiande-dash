import moment from 'moment';

import { 
  selectPeriodNewStart, 
  selectPeriodNewEnd, 
  setPeriodUserNewStart, 
  setPeriodUserNewEnd 
} from '../filterSlice';
import { useAppSelector, useAppDispatch } from '../../../app/hooks'

import PeriodBase from '../../components/filter/Period'

function PeriodNew() {
  const dispatch = useAppDispatch()
  const periodStart = useAppSelector(selectPeriodNewStart);
  const periodEnd = useAppSelector(selectPeriodNewEnd);

  return <PeriodBase 
    startDate={periodStart > 0 ? moment(periodStart) : null}
    endDate={periodEnd > 0 ? moment(periodEnd): null}
    name="period"
    clear={true}
    onChange={({ startDate, endDate}) => {
      dispatch(setPeriodUserNewStart(startDate ? startDate.toDate().getTime() : 0))
      dispatch(setPeriodUserNewEnd(endDate ? endDate.toDate().getTime() : 0))
    }}/>
}

export default PeriodNew;
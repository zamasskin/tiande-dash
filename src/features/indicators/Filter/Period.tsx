import React, { useState } from 'react'

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';

import { selectPeriodStart, selectPeriodEnd, setPeriodStart, setPeriodEnd } from '../filterSlice';
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { DateRangePicker } from 'react-dates';
import { dateFormat } from '../../../constants';
import moment from 'moment';

function Period() {
  const dispatch = useAppDispatch()
  const periodStart = useAppSelector(selectPeriodStart);
  const periodEnd = useAppSelector(selectPeriodEnd);
  const [focusedInput, setFocusedInput] = useState();

  return <DateRangePicker
    startDate={moment(periodStart)}
    startDateId="your_unique_start_date_id"
    endDate={moment(periodEnd)}
    endDateId="your_unique_end_date_id"
    isOutsideRange={() => false}
    displayFormat={dateFormat}
    onDatesChange={({ startDate, endDate}) => {
      startDate && dispatch(setPeriodStart(startDate.toDate().getTime()))
      endDate && dispatch(setPeriodEnd(endDate.toDate().getTime()))
    }}
    focusedInput={focusedInput}
    onFocusChange={(focusedInput: any) => setFocusedInput(focusedInput)}
  />
}

export default Period;
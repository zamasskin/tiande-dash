import React, { useState } from 'react'

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { selectPeriodStart, selectPeriodEnd, setPeriod } from '../filterSlice';
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { DateRangePicker } from 'react-dates';

function Period() {
  const dispatch = useAppDispatch()
  const periodStart = useAppSelector(selectPeriodStart);
  const periodEnd = useAppSelector(selectPeriodEnd);
  const [focusedInput, setFocusedInput] = useState();

  return <DateRangePicker
    startDate={periodStart}
    startDateId="your_unique_start_date_id"
    endDate={periodEnd}
    endDateId="your_unique_end_date_id"
    isOutsideRange={() => false}
    displayFormat="DD.MM.YYYY"
    onDatesChange={({ startDate, endDate }) => {
      dispatch(setPeriod([startDate, endDate]))
    }}
    focusedInput={focusedInput}
    onFocusChange={(focusedInput: any) => setFocusedInput(focusedInput)}
  />
}

export default Period;
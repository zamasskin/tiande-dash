import { useState } from 'react'

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { DateRangePicker } from 'react-dates';
import { dateFormat } from '../../../constants';

function Period({startDate, endDate, onChange, name}) {
  const [focusedInput, setFocusedInput] = useState();
  const startDateId = name + '_start';
  const endDateId = name + '_end';

  return <DateRangePicker
    startDate={startDate}
    startDateId={startDateId}
    endDate={endDate}
    endDateId={endDateId}
    isOutsideRange={() => false}
    displayFormat={dateFormat}
    onDatesChange={onChange}
    focusedInput={focusedInput}
    onFocusChange={(focusedInput: any) => setFocusedInput(focusedInput)}
  />
}

export default Period;
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from 'moment';
import { useState } from 'react';

function PeriodSelect() {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [focusedInput, setFocusedInput] = useState();
  return <div>
   <DateRangePicker
        startDate={startDate}
        startDateId="start-date"
        endDate={endDate}
        endDateId="end-date"
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput: any) => setFocusedInput(focusedInput)}
      />
  </div>
}

export default PeriodSelect
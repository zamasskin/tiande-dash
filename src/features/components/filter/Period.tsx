import { useState } from 'react'
import {Button} from 'react-bootstrap'

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { DateRangePicker } from 'react-dates';
import { dateFormat } from '../../../constants';



function Period({startDate, endDate, onChange, name, clear = false}) {
  const [focusedInput, setFocusedInput] = useState();
  const startDateId = name + '_start';
  const endDateId = name + '_end';
  const styleBtn: {[key:string]: string|number} = {
    position: "absolute",
    right: 4, 
    top: 2,
    zIndex: 2,
    visibility: clear ? "visible" : "hidden" 
  }

  return (
    <div style={{position: "relative"}}>
      <DateRangePicker
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
       <Button 
        className="close" 
        size="sm"
        variant="outline-light" 
        style={styleBtn}
        onClick={() => onChange({startDate: null, endDate: null})}>
          <span aria-hidden="true">&times;</span>
        </Button>
    </div>
  )
}

export default Period;
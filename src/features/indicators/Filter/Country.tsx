import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { selectCountry, setCountry } from '../filterSlice';

import CountryBase from '../../components/filter/Country'

function Country({useId = 0, allowed = true}) {
  const dispatch = useAppDispatch()
  const value = useAppSelector(selectCountry)
  return (
    <>
      <CountryBase 
        value={value} 
        onSelect={(id) =>  dispatch(setCountry(id))}
      />
    </>
  )
}

export default Country;
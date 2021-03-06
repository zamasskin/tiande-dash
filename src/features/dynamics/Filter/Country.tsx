import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { selectCountry, setCountry } from '../filterSlice';

import CountryBase from '../../components/filter/Country'

function Country({useId = 0, allowed = true}) {
  const dispatch = useAppDispatch()
  const value = useAppSelector(selectCountry)
  return (
    <>
      <CountryBase 
        size="lg"
        value={value} 
        onChange={(ev: any) =>  dispatch(setCountry(ev.target.value))}
      />
    </>
  )
}

export default Country;
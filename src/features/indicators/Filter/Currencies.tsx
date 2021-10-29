import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import {selectCurrency, setCurrency} from '../filterSlice'

import CurrenciesBase from '../../components/filter/Currencies'

function Currencies() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(selectCurrency)
  return (
   <>
    <CurrenciesBase 
      value={value}
      size="lg" 
      onChange={(ev: any) => dispatch(setCurrency(ev.target.value)) }
    />
   </>
  );
}

export default Currencies;

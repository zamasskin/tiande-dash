import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import {selectPickup, setPickup} from '../filterSlice'

import ShipmentMethodBase from '../../components/filter/ShipmentMethod'

function ShipmentMethod() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(selectPickup)
  return (
   <>
    <ShipmentMethodBase 
      value={value}
      size="lg" 
      onChange={(ev: any) => dispatch(setPickup(ev.target.value)) }
    />
   </>
  );
}

export default ShipmentMethod;

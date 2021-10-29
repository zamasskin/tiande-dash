import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import {selectStorage, setStorage} from '../filterSlice'

import StoragesBase from '../../components/filter/Storages'

function Storages() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(selectStorage)
  return (
    <>
     <StoragesBase 
      size="lg"
      value={value}
      onChange={(ev: any) => dispatch(setStorage(ev.target.value))}/>
    </>
  )
}

export default Storages;
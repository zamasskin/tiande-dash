import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectIsMarketplace, setIsMarketplace } from "../filterSlice";

import SelectYN from "../../components/filter/SelectYN";

function IsMarketplace() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectIsMarketplace);

  return (
    <>
      <SelectYN
        size="lg"
        value={value}
        onChange={(ev: any) => dispatch(setIsMarketplace(ev.target.value))}
      />
    </>
  );
}

export default IsMarketplace;

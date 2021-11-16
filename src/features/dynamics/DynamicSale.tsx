import _ from 'lodash'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react';
import { Col, Card, Table} from 'react-bootstrap'

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchDynamicSaleList } from '../api/dynamics';
import { selectFilterIndicator,  setPeriodStart, setPeriodEnd } from './filterSlice';
import Plot from '../components/Plotly/Plot'

function DynamicSale() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector(selectFilterIndicator);
  const [data, setData] = useState([]);
  const [dragMode, setDragMode]  = useState("pan")
  const [preloader, setPreloader] = useState(false);
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    (async () => {
      setPreloader(true)
      setData(await fetchDynamicSaleList(filter))
    })().finally(() => setPreloader(false));
  }, [filter])

  const  onRelayout = (data) => {
    if(data["dragmode"]) {
      setDragMode(data["dragmode"])
    }
    if(data['xaxis.range[0]'] && data['xaxis.range[1]']) {
      dispatch(setPeriodStart(new Date(data['xaxis.range[0]']).getTime()))
      dispatch(setPeriodEnd(new Date(data['xaxis.range[1]']).getTime()))
    }
   
    return data;
  }

  return (
    <Col>
      <Card className={!initialized || preloader ? "shadow-sm preloader" : "shadow-sm"}>
        <Card.Body style={{minHeight: "380px"}}>
          <Plot 
            data={data} 
            layout={{title: 'Динамика продаж', autosize: true, dragmode: dragMode}}
            style={{width: "100%", height: "100%"}}
            onRelayout={onRelayout}
            onInitialized={() => setInitialized(true)}
          ></Plot>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default DynamicSale
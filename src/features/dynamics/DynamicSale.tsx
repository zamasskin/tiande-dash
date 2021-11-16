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
  const [preloader, setPreloader] = useState(false);
  useEffect(() => {
    (async () => {
      setPreloader(true)
      setData(await fetchDynamicSaleList(filter))
    })().finally(() => setPreloader(false));
  }, [filter])

  const  onRelayout = (data) => {
    if(!data['xaxis.range[0]'] || !data['xaxis.range[1]']) {
      return data;
    }
    dispatch(setPeriodStart(new Date(data['xaxis.range[0]']).getTime()))
    dispatch(setPeriodEnd(new Date(data['xaxis.range[1]']).getTime()))
    return data;
  }

  return (
    <Col>
      <Card className={preloader ? "shadow-sm preloader" : "shadow-sm"}>
        <Card.Body>
          <Plot 
            data={data} 
            layout={{title: 'Динамика продаж', autosize: true, dragmode: 'pan'}}
            style={{width: "100%", height: "100%"}}
            onRelayout={onRelayout}
          ></Plot>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default DynamicSale
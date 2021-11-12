import _ from 'lodash'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react';
import { Col, Card, Table} from 'react-bootstrap'
import * as csDictionary from 'plotly.js/lib/locales/ru.js';

import { useAppSelector } from '../../app/hooks';
import { fetchDynamicSaleList } from '../api/dynamics';
import { selectFilterIndicator } from './filterSlice';
import Plot from '../components/Plotly/Plot'

function DynamicSale() {
  const filter = useAppSelector(selectFilterIndicator);
  const [data, setData] = useState([]);
  const [preloader, setPreloader] = useState(false);
  useEffect(() => {
    (async () => {
      setPreloader(true)
      setData(await fetchDynamicSaleList(filter))
    })().finally(() => setPreloader(false));
  }, [filter])

  return (
    <Col>
      <Card className={preloader ? "shadow-sm preloader" : "shadow-sm"}>
        <Card.Body>
          <Plot 
            data={data} 
            layout={{title: 'Динамика продаж', autosize: true}}
            style={{width: "100%", height: "100%"}}
          ></Plot>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default DynamicSale
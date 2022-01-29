import moment from 'moment';
import { useState, useEffect } from 'react';
import { Col, Card } from 'react-bootstrap'

import {dateFormat} from '../../../constants'
import ThreeLinesTwoColumnsBelow from '../../components/UI/cards/ThreeLinesTwoColumnsBelow';
import { fetchComparativeAnalysis } from '../../api/indicators';

export default function ComparativeAnalysis({filter}) {
  const def = {price: '0 руб', percent: '0%'}
  const [indicators, setData] = useState([]);
  const [preloader, setPreloader] = useState(false);
  const {periodStart, periodEnd} = filter
  const titles = ['Продажи 1 месяц', 'Продажи 1 год', 'Средний чек 1 месяц', 'Средний чек 1 год'];
  const period =  `${moment(periodStart).format(dateFormat)} - ${moment(periodEnd).format(dateFormat)}`
  

  useEffect(() => {
    (async () => {
      setPreloader(true)
      setData(await fetchComparativeAnalysis(filter))
    })().finally(() => setPreloader(false));
  }, [filter])

  return <>
    {
      !indicators.length || preloader
      ? [1,2,3,4].map((i) => 
        <Col key={i}>
          <ThreeLinesTwoColumnsBelow.Placeholder />
        </Col>
      )
      : indicators.map((indicator, index)  => (
        <Col key={index}>
          <ThreeLinesTwoColumnsBelow
            top={titles[index]} 
            center={indicator.price}
            bottomLeft={indicator.percent}
            bottomRight={period}
          />
        </Col>
      ))
    }
  </>
}
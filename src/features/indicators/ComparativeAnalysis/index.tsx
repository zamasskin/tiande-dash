
import { useEffect, useState } from 'react'
import { Col, Card} from 'react-bootstrap'
import { useAppSelector } from '../../../app/hooks';
import { selectPeriodEnd, selectPeriodStart } from '../filterSlice';
import {dateFormat} from '../../../constants'
import moment from 'moment';

function ComparativeAnalysis() {
  const periodStart = useAppSelector(selectPeriodStart);
  const periodEnd = useAppSelector(selectPeriodEnd);
  const [indicators, setData] = useState([]);
  const def = {price: '0 руб', percent: '0%'}
  const [
    salesMonth=def, salesYear = def,
    checkMonth=def, checkYear = def
  ] = indicators


  useEffect(() => {
    setData([
      {price: '0 руб', percent: '5%'},
      {price: '1 руб', percent: '6%'},
      {price: '2 руб', percent: '7%'},
      {price: '3 руб', percent: '8%'},
    ])
    console.log(periodStart, periodEnd)
  }, [periodStart, periodEnd])
  return (
    <>
      <Col>
        <ComparativeAnalysis.Card 
          title="Продажи 1 месяц" 
          price={salesMonth.price}
          percent={salesMonth.percent}/>
      </Col>
      <Col>
        <ComparativeAnalysis.Card 
          title="Продажи 1 год" 
          price={salesYear.price}
          percent={salesYear.percent}/>
      </Col>
      <Col>
        <ComparativeAnalysis.Card 
          title="Средний чек 1 месяц" 
          price={checkMonth.price}
          percent={checkMonth.percent}/>
      </Col>
      <Col>
        <ComparativeAnalysis.Card 
          title="Средний чек 1 год" 
          price={checkYear.price}
          percent={checkYear.percent}/>
      </Col>
    </>
  )
}


ComparativeAnalysis.Card = function({title, price, percent}) {
  const periodStart = useAppSelector(selectPeriodStart);
  const periodEnd = useAppSelector(selectPeriodEnd);
  const period =  `${moment(periodStart).format(dateFormat)} - ${moment(periodEnd).format(dateFormat)}`
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <p>{title}</p>
        <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
          <h3 className="mb-0 mb-md-2 mb-xl-0 order-xl-0">{price}</h3>
        </div>
        <p className="mb-0 mt-2 text-success">
          {percent}
          <span className="text-black ml-1" style={{color: 'black'}}>
            <small> {period}</small>
          </span>
        </p>
      </Card.Body>
    </Card>
  )
}


export default ComparativeAnalysis
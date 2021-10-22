
import { useEffect } from 'react'
import { Col, Card} from 'react-bootstrap'
import { useAppSelector } from '../../../app/hooks';
import { selectPeriodEnd, selectPeriodStart } from '../filterSlice';
import {dateFormat} from '../../../constants'

function ComparativeAnalysis() {
  const periodStart = useAppSelector(selectPeriodStart);
  const periodEnd = useAppSelector(selectPeriodEnd);

  useEffect(() => {
    // console.log(periodStart, periodEnd)
  })
  return (
    <>
      <Col>
        <ComparativeAnalysis.Card 
          title="Продажи 1 месяц" 
          price="-323 235,85 руб"
          percent="-34,61%"/>
      </Col>
      <Col>
        <ComparativeAnalysis.Card 
          title="Продажи 1 год" 
          price="-270 390,11 руб"
          percent="-30,69%"/>
      </Col>
      <Col>
        <ComparativeAnalysis.Card 
          title="Средний чек 1 месяц" 
          price="2,77 руб"
          percent="0,14%"/>
      </Col>
      <Col>
        <ComparativeAnalysis.Card 
          title="Средний чек 1 год" 
          price="-2 030,71 руб"
          percent="-51,39%"/>
      </Col>
    </>
  )
}


ComparativeAnalysis.Card = function({title, price, percent}) {
  const periodStart = useAppSelector(selectPeriodStart);
  const periodEnd = useAppSelector(selectPeriodEnd);
  // const strPeriod = () => `${periodStart.format(dateFormat)} - ${periodEnd.format(dateFormat)}`
  // const period = `${periodStart.format(dateFormat)} - ${periodEnd.format(dateFormat)}`
  useEffect(() => {
    // console.log(strPeriod())
  })
  const period = ""
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
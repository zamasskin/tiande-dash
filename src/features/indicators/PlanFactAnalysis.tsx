import { useState, useEffect } from 'react';
import { Col, Card} from 'react-bootstrap'

import { useAppSelector } from '../../app/hooks';
import { fetchPlanFactAnalysis } from '../../models/api/indicators';
import { selectFilterIndicator } from './filterSlice';

function PlanFactAnalysis() {
  const $d = "0  руб";
  const filter = useAppSelector(selectFilterIndicator);
  const [data, setData] = useState({fact: $d, plan: $d, abc: $d, otn: $d});
  useEffect(() => {
    (async () => {
      setData(await fetchPlanFactAnalysis(filter))
    })();
  }, [filter])
  return (
    <>
      <Col>
        <CardItem title="План продаж">{data.plan}</CardItem>
      </Col>
      <Col>
        <CardItem title="Факт продаж">{data.fact}</CardItem>
      </Col>
      <Col>
        <CardItem title="Абсолютное отклонение">{data.abc}</CardItem>
      </Col>
      <Col>
      <CardItem title="Относительное отклонение">{data.otn}</CardItem>
      </Col>
    </>
  )
}

export function CardItem({title, children = ""}) {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="text-md-center text-xl-left">{title}</Card.Title>
        <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
          <h3 className="mb-0 mb-md-2 mb-xl-0 order-xl-0">{children}</h3>
        </div>
      </Card.Body>
    </Card>
  )
}

export default PlanFactAnalysis
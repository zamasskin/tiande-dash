import { useState, useEffect } from "react";
import { Col, Card } from "react-bootstrap";

import { useAppSelector } from "../../../app/hooks";
import { fetchPlanFactAnalysis } from "../../api/indicators";
import { selectFilterIndicator } from ".././filterSlice";

function PlanFactAnalysis() {
  const $d = "0  руб";
  const filter = useAppSelector(selectFilterIndicator);
  const [data, setData] = useState({ fact: $d, plan: $d, abc: $d, otn: $d });
  const [preloader, setPreloader] = useState(false);
  useEffect(() => {
    (async () => {
      setPreloader(true);
      setData(await fetchPlanFactAnalysis(filter));
    })().finally(() => setPreloader(false));
  }, [filter]);
  return (
    <>
      <Col>
        <CardItem title="План продаж" preloader={preloader}>
          {data.plan}
        </CardItem>
      </Col>
      <Col>
        <CardItem title="Факт продаж" preloader={preloader}>
          {data.fact}
        </CardItem>
      </Col>
      <Col>
        <CardItem title="Абсолютное отклонение" preloader={preloader}>
          {data.abc}
        </CardItem>
      </Col>
      <Col>
        <CardItem title="Относительное отклонение" preloader={preloader}>
          {data.otn}
        </CardItem>
      </Col>
    </>
  );
}

export function CardItem({ title, children = "", preloader = false }) {
  return (
    <Card className={preloader ? "shadow-sm preloader" : "shadow-sm"}>
      <Card.Body>
        <p className="card-title text-md-left">{title}</p>
        <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
          <h3 className="mb-0 mb-md-2 mb-xl-0 order-xl-0">{children}</h3>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PlanFactAnalysis;

import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";

import TwoLines from "../../components/UI/cards/TwoLines";
import { fetchPlanFactAnalysis } from "../../api/indicators";

export default function PlanFactAnalysis({ filter }) {
  const [data, setData] = useState({});
  const [preloader, setPreloader] = useState(false);
  const titles = {
    fact: "План продаж",
    plan: "Факт продаж",
    abc: "Абсолютное отклонение",
    otn: "Относительное отклонение",
  };

  useEffect(() => {
    (async () => {
      setPreloader(true);
      setData(await fetchPlanFactAnalysis(filter));
    })().finally(() => setPreloader(false));
  }, [filter]);

  return (
    <>
      {Object.entries(titles).map(([key, title]) =>
        preloader || Object.keys(data).length === 0 ? (
          <Col key={key}>
            <TwoLines.Placeholder />
          </Col>
        ) : (
          <Col key={key}>
            <TwoLines top={title} bottom={data[key]} />
          </Col>
        )
      )}
    </>
  );
}

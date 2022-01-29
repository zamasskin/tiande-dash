import { useEffect, useState } from "react";
import { Col, Card, Table } from "react-bootstrap";
import * as uuid from "uuid";

import { fetchSalesPerformance } from "../../api/indicators";

function SalesPerformance({ filter }) {
  const [performanceList, setPerformanceList] = useState([]);
  const [preloader, setPreloader] = useState(false);

  useEffect(() => {
    (async () => {
      setPreloader(true);
      setPerformanceList(await fetchSalesPerformance(filter));
    })().finally(() => setPreloader(false));
  }, [filter]);

  function getValue(value, cols = 5) {
    if (preloader || performanceList.length === 0) {
      return (
        <div>
          <span className={["placeholder", `col-${cols}`].join(" ")}></span>
        </div>
      );
    }
    return value;
  }

  const indicators = performanceList.length
    ? performanceList
    : Array(3)
        .fill(true)
        .map(() => ({ id: uuid.v4() }));
  return (
    <>
      {indicators.map((performance, i) => (
        <Col key={performance.id}>
          <Card className="shadow-sm placeholder-glow">
            <Card.Body>
              {preloader || performanceList.length === 0 ? (
                <p className="card-title text-md-left">
                  <span className="placeholder col-5"></span>
                </p>
              ) : (
                <p className="card-title text-md-left">{performance.name}</p>
              )}
              <div>
                <Table>
                  <thead>
                    <tr>
                      <th>Значение</th>
                      <th>Показатель</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Период:</td>
                      <td>{getValue(performance.period, 8)}</td>
                    </tr>
                    <tr>
                      <td>Количество дней:</td>
                      <td>{getValue(performance.days, 2)}</td>
                    </tr>
                    <tr>
                      <td>Сумма продаж:</td>
                      <td>{getValue(performance.salesSum, 7)}</td>
                    </tr>
                    <tr>
                      <td>Продажи в день:</td>
                      <td>{getValue(performance.sumDays, 7)}</td>
                    </tr>
                    <tr>
                      <td>Сумма продаж по новичкам:</td>
                      <td>{getValue(performance.salesSumNew, 7)}</td>
                    </tr>
                    <tr>
                      <td>Средний чек:</td>
                      <td>{getValue(performance.averageCheck, 7)}</td>
                    </tr>
                    <tr>
                      <td>Кол-во заказов:</td>
                      <td>{getValue(performance.numberOfOrders, 5)}</td>
                    </tr>
                    <tr>
                      <td>Количество Новичков:</td>
                      <td>{getValue(performance.numberOfClientsNew, 4)}</td>
                    </tr>
                    <tr>
                      <td>Доля новичков:</td>
                      <td>{getValue(performance.shareOfNewbies, 5)}</td>
                    </tr>
                    <tr>
                      <td>Доля новичков по ТО:</td>
                      <td>{getValue(performance.shareOfNewbiesBySale, 5)}</td>
                    </tr>
                    <tr>
                      <td>Доля самовывоза:</td>
                      <td>{getValue(performance.shareOfPickup, 5)}</td>
                    </tr>
                    <tr>
                      <td>Баллы:</td>
                      <td>{getValue(performance.balls, 7)}</td>
                    </tr>
                    <tr>
                      <td>Лояльность:</td>
                      <td>{getValue(performance.loyalty, 8)}</td>
                    </tr>
                    <tr>
                      <td>Кол-во клиентов:</td>
                      <td>{getValue(performance.numberOfClients, 4)}</td>
                    </tr>
                    <tr>
                      <td>Средний чек баллы:</td>
                      <td>{getValue(performance.averageCheckBalls, 4)}</td>
                    </tr>
                    <tr>
                      <td>Заказы по лояльности:</td>
                      <td>{getValue(performance.numberOfOrdersLoyalty, 4)}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
}

export default SalesPerformance;

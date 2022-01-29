import moment from 'moment';
import { useState, useEffect } from 'react';
import { Col, Card, Table} from 'react-bootstrap'

import { useAppSelector } from '../../../app/hooks';
import { selectFilterIndicator } from '../filterSlice';
import { fetchSalesPerformance } from '../../api/indicators';
import { SalesPerformanceDefault } from '../../../models/indicators/initData';


function SalesPerformance() {
  const filter = useAppSelector(selectFilterIndicator);
  const [performanceList, setData] = useState([SalesPerformanceDefault, SalesPerformanceDefault, SalesPerformanceDefault]);
  const [preloader, setPreloader] = useState(false);
  useEffect(() => {
    (async () => {
      setPreloader(true)
      setData(await fetchSalesPerformance(filter))
    })().finally(() => setPreloader(false));
  }, [filter])

 const [currentData, dataMonthAgo, dataYearAgo] = performanceList
  return(
    <>
      <Col>
        <Performance 
          name="Показатели текущего периода" 
          indicators={currentData} 
          preloader={preloader}/>
      </Col>
      <Col>
        <Performance 
          name="Показатели периода со сдвигом -1 месяц" 
          indicators={dataMonthAgo} 
          preloader={preloader}/>
      </Col>
      <Col>
        <Performance 
          name="Показатели периода со сдвигом -1 год" 
          indicators={dataYearAgo} 
          preloader={preloader}/>
      </Col>
    </>
  )
}


export function Performance({name, indicators, preloader=false}) {
  return (
    <Card className={preloader ? "shadow-sm preloader" : "shadow-sm"}>
      <Card.Body>
        <p className="card-title text-md-left">{name}</p>
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
                <td>{indicators.period}</td>
              </tr>
              <tr>
                <td>Количество дней:</td>
                <td>{indicators.days}</td>
              </tr>
              <tr>
                <td>Сумма продаж:</td>
                <td>{indicators.salesSum}</td>
              </tr>
              <tr>
                <td>Продажи в день:</td>
                <td>{indicators.sumDays}</td>
              </tr>
              <tr>
                <td>Сумма продаж по новичкам:</td>
                <td>{indicators.salesSumNew}</td>
              </tr>
              <tr>
                <td>Средний чек:</td>
                <td>{indicators.averageCheck}</td>
              </tr>
              <tr>
                <td>Кол-во заказов:</td>
                <td>{indicators.numberOfOrders}</td>
              </tr>
              <tr>
                <td>Количество Новичков:</td>
                <td>{indicators.numberOfClientsNew}</td>
              </tr>
              <tr>
                <td>Доля новичков:</td>
                <td>{indicators.shareOfNewbies}</td>
              </tr>
              <tr>
                <td>Доля новичков по ТО:</td>
                <td>{indicators.shareOfNewbiesBySale}</td>
              </tr>
              <tr>
                <td>Доля самовывоза:</td>
                <td>{indicators.shareOfPickup}</td>
              </tr>
              <tr>
                <td>Баллы:</td>
                <td>{indicators.balls}</td>
              </tr>
              <tr>
                <td>Лояльность:</td>
                <td>{indicators.loyalty}</td>
              </tr>
              <tr>
                <td>Кол-во клиентов:</td>
                <td>{indicators.numberOfClients}</td>
              </tr>
              <tr>
                <td>Средний чек баллы:</td>
                <td>{indicators.averageCheckBalls}</td>
              </tr>
              <tr>
                <td>Заказы по лояльности:</td>
                <td>{indicators.numberOfOrdersLoyalty}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  )
} 

export default SalesPerformance
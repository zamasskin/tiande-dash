import moment from 'moment';
import { useState } from 'react';
import { Col, Card, Table} from 'react-bootstrap'

import { useAppSelector } from '../../app/hooks';
import { selectFilterIndicator } from './filterSlice';
import { getFilterMonthAgo, getFilterYearAgo } from "../../models/indicators/filter"
import { dateFormat } from '../../constants';
import { indicators } from '../../models/date';
import { fetchSalesPerformance } from '../../models/api/indicators';
import { SalesPerformanceDefault } from '../../models/indicators/initData';


function SalesPerformance() {
  const filter = useAppSelector(selectFilterIndicator)
  return(
    <>
      <Col>
        <Performance name="Показатели текущего периода" filter={filter} />
      </Col>
      <Col>
        <Performance name="Показатели периода со сдвигом -1 месяц" filter={getFilterMonthAgo(filter)} />
      </Col>
      <Col>
        <Performance name="Показатели периода со сдвигом -1 год" filter={getFilterYearAgo(filter)} />
      </Col>
    </>
  )
}


export function Performance({name, filter}) {
  const [data, setData] =  useState(SalesPerformanceDefault);
  const {periodStart, periodEnd} = filter;
  const period =  `${moment(periodStart).format(dateFormat)} - ${moment(periodEnd).format(dateFormat)}`
  const days = indicators.diff(periodStart, periodStart)

  fetchSalesPerformance(filter).then(result => console.log(setData)).catch(err => console.log(err))
  
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="ext-md-center text-xl-left">{name}</Card.Title>
        {/* <p className="card-title text-md-center text-xl-left">{name}</p> */}
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
                <td>{period}</td>
              </tr>
              <tr>
                <td>Количество дней:</td>
                <td>{days}</td>
              </tr>
              <tr>
                <td>Сумма продаж:</td>
                <td>{data.salesSum}</td>
              </tr>
              <tr>
                <td>Продажи в день:</td>
                <td>{data.sumDays}</td>
              </tr>
              <tr>
                <td>Сумма продаж по новичкам:</td>
                <td>{data.salesSumNew}</td>
              </tr>
              <tr>
                <td>Средний чек:</td>
                <td>{data.averageCheck}</td>
              </tr>
              <tr>
                <td>Кол-во заказов:</td>
                <td>{data.numberOfOrders}</td>
              </tr>
              <tr>
                <td>Количество Новичков:</td>
                <td>{data.numberOfClientsNew}</td>
              </tr>
              <tr>
                <td>Доля новичков:</td>
                <td>{data.shareOfNewbies}</td>
              </tr>
              <tr>
                <td>Доля новичков по ТО:</td>
                <td>{data.shareOfNewbiesBySale}</td>
              </tr>
              <tr>
                <td>Доля самовывоза:</td>
                <td>{data.shareOfPickup}</td>
              </tr>
              <tr>
                <td>Баллы:</td>
                <td>{data.balls}</td>
              </tr>
              <tr>
                <td>Лояльность:</td>
                <td>{data.loyalty}</td>
              </tr>
              <tr>
                <td>Кол-во клиентов:</td>
                <td>{data.numberOfClients}</td>
              </tr>
              <tr>
                <td>Средний чек баллы:</td>
                <td>{data.averageCheckBalls}</td>
              </tr>
              <tr>
                <td>Заказы по лояльности:</td>
                <td>{data.numberOfOrdersLoyalty}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  )
} 

export default SalesPerformance
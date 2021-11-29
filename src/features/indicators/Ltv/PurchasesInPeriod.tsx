import { useState, useEffect } from 'react';
import { Card, Table } from "react-bootstrap"

import { useAppSelector } from "../../../app/hooks";
import { fetchPurchasesInPeriod } from '../../api/indicators';
import { selectFilterIndicator } from '../filterSlice';

function PurchasesInPeriod() {
  const filter = useAppSelector(selectFilterIndicator);
  const [data, setData] = useState([]);
  const [preloader, setPreloader] = useState(false);
  useEffect(() => {
    (async () => {
      setPreloader(true)
      setData(await fetchPurchasesInPeriod(filter))
    })().finally(() => setPreloader(false))
  }, [filter])

  return (
    <Card border="light" className={preloader ? "preloader" : null}>
      <Card.Body>
        <Card.Title>Частота покупок в периоде</Card.Title>
        <Table>
          <thead>
            <tr>
              <th>Количество покупок</th>
              <th>Количество человек</th>
              <th>Доля от клиентов</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, i) => (
                <tr key={i}>
                  <td>{item.cnt}</td>
                  <td>{item.count}</td>
                  <td>{item.proportion}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default PurchasesInPeriod
import { useState, useEffect } from 'react';
import { Col, Card, Table} from 'react-bootstrap'

import { useAppSelector } from '../../app/hooks';
import { selectFilterIndicator } from './filterSlice';
import { fetchDeliveryList } from '../../models/api/indicators';

function DeliveryList() {
  const filter = useAppSelector(selectFilterIndicator);
  const [deliveryList, setData] = useState([]);
  useEffect(() => {
    (async () => {
      setData(await fetchDeliveryList(filter))
    })();
  }, [filter])
  return (
    <Col>
      <Card className="shadow-sm">
        <Card.Body>
          <Table>
            <thead>
              <tr>
                <th>Значение</th>
                <th>Показатель</th>
                <th>Доля</th>
              </tr>
            </thead>
            <tbody>
              {deliveryList.map(({name, type, sum, share}, i) => (
                <tr key={i}>
                  <td>
                    <b>{name}</b> - {type}
                  </td>
                  <td>{sum}</td>
                  <td>{share}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default DeliveryList
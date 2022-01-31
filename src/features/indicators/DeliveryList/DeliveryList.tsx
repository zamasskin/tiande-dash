import { useState, useEffect } from "react";
import { Col, Card, Table } from "react-bootstrap";

import { fetchDeliveryList } from "../../api/indicators";

export default function DeliveryList({ filter }) {
  const [deliveryList, setData] = useState([]);
  const [preloader, setPreloader] = useState(false);

  useEffect(() => {
    (async () => {
      setPreloader(true);
      setData(await fetchDeliveryList(filter));
    })().finally(() => setPreloader(false));
  }, [filter]);

  const TableBody = () => {
    if (preloader) {
      return (
        <tbody>
          <tr>
            <td>
              <span className="placeholder col-7"></span>
            </td>
            <td>
              <span className="placeholder col-3"></span>
            </td>
            <td>
              <span className="placeholder col-3"></span>
            </td>
          </tr>
        </tbody>
      );
    } else if (deliveryList.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={3} className="text-center">
              <b>Данные не найдены</b>
            </td>
          </tr>
        </tbody>
      );
    } else {
      return (
        <tbody>
          {deliveryList.map(({ name, type, sum, share }, i) => (
            <tr key={i}>
              <td>
                <b>{name}</b> - {type}
              </td>
              <td>{sum}</td>
              <td>{share}</td>
            </tr>
          ))}
        </tbody>
      );
    }
  };

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
            <TableBody />
          </Table>
        </Card.Body>
      </Card>
    </Col>
  );
}

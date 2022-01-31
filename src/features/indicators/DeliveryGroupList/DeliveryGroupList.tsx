import { useEffect, useState } from "react";
import { Col, Card, Table } from "react-bootstrap";

import { fetchDeliveryGroupList } from "../../api/indicators";

export default function DeliveryGroupList({ filter }) {
  const [deliveryGroupList, setData] = useState([]);
  const [preloader, setPreloader] = useState(false);

  useEffect(() => {
    (async () => {
      setPreloader(true);
      setData(await fetchDeliveryGroupList(filter));
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
    } else if (deliveryGroupList.length === 0) {
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
          {deliveryGroupList.map(({ type, sum, share }, i) => (
            <tr key={i}>
              <td>{type}</td>
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
      <Card className={preloader ? "shadow-sm preloader" : "shadow-sm"}>
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

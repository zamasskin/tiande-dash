import { useState, useEffect } from "react";
import { Col, Card, Table } from "react-bootstrap";

import { useAppSelector } from "../../../app/hooks";
import { selectFilterIndicator } from "../filterSlice";
import { fetchDeliveryGroupList } from "../../api/indicators";

function DeliveryGroupList() {
  const filter = useAppSelector(selectFilterIndicator);
  const [deliveryGroupList, setData] = useState([]);
  const [preloader, setPreloader] = useState(false);
  useEffect(() => {
    (async () => {
      setPreloader(true);
      setData(await fetchDeliveryGroupList(filter));
    })().finally(() => setPreloader(false));
  }, [filter]);

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
            <tbody>
              {deliveryGroupList.map(({ type, sum, share }, i) => (
                <tr key={i}>
                  <td>{type}</td>
                  <td>{sum}</td>
                  <td>{share}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default DeliveryGroupList;

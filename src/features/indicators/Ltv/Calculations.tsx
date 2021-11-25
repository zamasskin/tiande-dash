import { useState, useEffect } from 'react';
import {Col, Card} from "react-bootstrap"

import { useAppSelector } from "../../../app/hooks";
import { fetchLtvIndicators } from '../../api/indicators';
import { selectFilterIndicator } from '../filterSlice';

function Calculations() {
  const filter = useAppSelector(selectFilterIndicator);
  const [data, setData] = useState({register: '0', clients: '0', proportion: '0%'});
  const [preloader, setPreloader] = useState(false);
  useEffect(() => {
    (async () => {
      setPreloader(true)
      setData(await fetchLtvIndicators(filter))
    })().finally(() => setPreloader(false))
  }, [filter])
  return (
    <>
      <Col>
        <Item title="LTV (Регистрации)" preloader={preloader}>{data.register}</Item>
      </Col>
      <Col>
        <Item title="LTV (Активные клиенты)" preloader={preloader}>{data.clients}</Item>
      </Col>
      <Col>
        <Item title="Доля активных клиентов" preloader={preloader}>{data.proportion}</Item>
      </Col>
    </>
  )
}

export function Item({title, children = "", preloader = false}) {
  return (
    <Card border="light" className={preloader ? "preloader" : null}>
      <Card.Body>
        <p className="card-title text-md-left">{title}</p>
        <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
          <h3 className="mb-0 mb-md-2 mb-xl-0 order-xl-0">{children}</h3>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Calculations
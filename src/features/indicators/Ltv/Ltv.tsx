import moment from "moment";
import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Table } from "react-bootstrap";

import FormGroup from "../../components/UI/FormGroup";
import PeriodBase from "../../components/filter/Period";
import TwoLines from "../../components/UI/cards/TwoLines";
import { SalesMonthGroup } from "./SalesMonth";

import { fetchLtvIndicators } from "../../api/indicators";
import { fetchLtvSalesMonth } from "../../api/indicators";
import { fetchPurchasesInPeriod } from "../../api/indicators";

export default function Ltv({ filter, setFilter }) {
  function onChange({ startDate, endDate }) {
    setFilter({
      ...filter,
      periodUserRegisterStart: startDate
        ? startDate.toDate().getTime()
        : filter.periodUserRegisterStart,
      periodUserRegisterEnd: endDate
        ? endDate.toDate().getTime()
        : filter.periodUserRegisterEnd,
    });
  }

  const startDate =
    filter.periodUserRegisterStart > 0
      ? moment(filter.periodUserRegisterStart)
      : null;
  const endDate =
    filter.periodUserRegisterEnd > 0
      ? moment(filter.periodUserRegisterEnd)
      : null;

  return (
    <Col>
      <Card className="shadow-sm">
        <Card.Header>
          <Form>
            <FormGroup controlId="period-register" title="Период регистрации">
              <PeriodBase
                startDate={startDate}
                endDate={endDate}
                name="period"
                onChange={onChange}
              />
            </FormGroup>
          </Form>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <LtvCalculations filter={filter} />
          </Row>
          <Row>
            <Col>
              <SaleMonth filter={filter} />
            </Col>
            <Col>
              <PurchasesInPeriod filter={filter} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

function PurchasesInPeriod({ filter }) {
  const [data, setData] = useState([]);
  const [preloader, setPreloader] = useState(false);

  useEffect(() => {
    (async () => {
      setPreloader(true);
      setData(await fetchPurchasesInPeriod(filter));
    })().finally(() => setPreloader(false));
  }, [filter]);

  const TableBody = () => {
    if (preloader) {
      return (
        <tbody>
          <tr>
            <td>
              <span className="placeholder col-3"></span>
            </td>
            <td>
              <span className="placeholder col-5"></span>
            </td>
            <td>
              <span className="placeholder col-3"></span>
            </td>
          </tr>
        </tbody>
      );
    } else if (data.length === 0) {
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
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.cnt}</td>
              <td>{item.count}</td>
              <td>{item.proportion}</td>
            </tr>
          ))}
        </tbody>
      );
    }
  };

  return (
    <Card border="light">
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
          <TableBody />
        </Table>
      </Card.Body>
    </Card>
  );
}

function SaleMonth({ filter }) {
  const [data, setData] = useState([]);
  const [preloader, setPreloader] = useState(false);
  useEffect(() => {
    (async () => {
      setPreloader(true);
      setData(await fetchLtvSalesMonth(filter));
    })().finally(() => setPreloader(false));
  }, [filter]);

  const TableBody = () => {
    if (preloader) {
      return (
        <tbody>
          <tr className="placeholder-glow">
            <td>
              <span className="placeholder col-5"></span>
            </td>
            <td>
              <span className="placeholder col-7"></span>
            </td>
            <td>
              <span className="placeholder col-3"></span>
            </td>
            <td>
              <span className="placeholder col-2"></span>
            </td>
          </tr>
        </tbody>
      );
    } else if (data.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={4} className="text-center">
              <b>Данные не найдены</b>
            </td>
          </tr>
        </tbody>
      );
    } else {
      return <SalesMonthGroup data={data} />;
    }
  };

  return (
    <Card border="light">
      <Card.Body>
        <Card.Title>Продажи по месяцам</Card.Title>
        <Table>
          <thead>
            <tr>
              <th>Месяц</th>
              <th>Продажи</th>
              <th>Клиенты</th>
              <th>Доля от клиентов</th>
            </tr>
          </thead>
          <TableBody />
        </Table>
      </Card.Body>
    </Card>
  );
}

function LtvCalculations({ filter }) {
  const [data, setData] = useState({});
  const [preloader, setPreloader] = useState(false);
  const titles = {
    register: "Количество регистраций / LTV",
    clients: "Количество клиентов / LTV",
    proportion: "Доля активных клиентов",
  };

  useEffect(() => {
    (async () => {
      setPreloader(true);
      setData(await fetchLtvIndicators(filter));
    })().finally(() => setPreloader(false));
  }, [filter]);

  function mapElement([key, title]) {
    if (Object.keys(data).length === 0 || preloader) {
      return (
        <Col key={key}>
          <TwoLines.Placeholder border="light" className="" />
        </Col>
      );
    } else {
      return (
        <Col key={key}>
          <TwoLines top={title} bottom={data[key]} />
        </Col>
      );
    }
  }

  return <>{Object.entries(titles).map(mapElement)}</>;
}

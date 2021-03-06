import type { NextPage } from 'next'
import Head from 'next/head'

import { Container, Navbar, Row, Col} from 'react-bootstrap'

import Filter from '../features/indicators/Filter'
import ComparativeAnalysis from '../features/indicators/ComparativeAnalysis'
import SalesPerformance from '../features/indicators/SalesPerformance'
import PlanFactAnalysis from '../features/indicators/PlanFactAnalysis'
import DeliveryList from '../features/indicators/DeliveryList'
import DeliveryGroupList from '../features/indicators/DeliveryGroupList'
import Login from '../features/components/Login'
import Ltv from '../features/indicators/Ltv'


const IndicatorsPage: NextPage = () => { 
  return <>
    <Head>
      <title>Бизнес Индикаторы</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Login>
      <Navbar bg="primary" variant="dark" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="/indicators">Отчеты</Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid>
        <Row className="mb-3">
          <Col>
            <Filter/>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Сравнительных анализ абс. отклонений</h2>
          </Col>
        </Row>
        <Row className="mb-3">
          <ComparativeAnalysis/>
        </Row>
        <Row>
          <Col>
            <h2>Показатели продаж</h2>
          </Col>
        </Row>
        <Row className="mb-3">
          <SalesPerformance/>
        </Row>
        <Row>
          <Col>
            <h2>План-фактный анализ</h2>
          </Col>
        </Row>
        <Row className="mb-3">
          <PlanFactAnalysis />
        </Row>
        <Row>
          <Col>
            <h2>LTV</h2>
          </Col>
        </Row>
        <Row className="mb-3">
          <Ltv />
        </Row>
        <Row>
          <Col>
            <h2>Распределение по службам доставок</h2>
          </Col>
        </Row>
        <Row className="mb-3">
          <DeliveryList />
        </Row>
        <Row>
          <Col>
            <h2>Распределение по способу получения</h2>
          </Col>
          <Row className="mb-3">
            <DeliveryGroupList />
          </Row>
        </Row>
      </Container>
    </Login>
  </>
}

export default IndicatorsPage
import type { NextPage } from 'next'
import Head from 'next/head'

import { Container, Navbar, Row, Col} from 'react-bootstrap'

import Filter from '../features/indicators/Filter'
import ComparativeAnalysis from '../features/indicators/ComparativeAnalysis'
import SalesPerformance from '../features/indicators/SalesPerformance'
import PlanFactAnalysis from '../features/indicators/PlanFactAnalysis'


const IndicatorsPage: NextPage = () => { 
  return <>
    <Head>
      <title>Бизнес Индикаторы</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
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
    </Container>
  </>
}

export default IndicatorsPage
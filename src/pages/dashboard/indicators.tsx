import { NextPage } from "next"
import Router from 'next/router'
import Head from 'next/head'
import { useState } from "react";
import { Container, Navbar, Row, Col} from 'react-bootstrap'


import { getDefaultDateRange } from "../../features/functions/date";
import FilterIndicators from "../../features/indicators/FilterIndicators"
import { FilterState } from "../../features/indicators/FilterIndicators/interfaces";
import ComparativeAnalysis from "../../features/indicators/ComparativeAnalysis/ComparativeAnalysis";
import SalesPerformance from "../../features/indicators/SalesPerformance/SalesPerformance";

const IndicatorsDashboardPage: NextPage<{filterValues: FilterState}> = ({filterValues}) => {
  const [filter, setFilter] = useState(filterValues);

  function applyFilter(filter) {
    setFilter(filter);
    Router.push({
      query: filter
    })
  }

  return <>
    <Head>
      <title>Бизнес Индикаторы</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar bg="primary" variant="dark" className="mb-3">
      <Container fluid>
        <Navbar.Brand href="/indicators">Бизнес Индикаторы</Navbar.Brand>
      </Container>
    </Navbar>
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <FilterIndicators apply={applyFilter} value={filter}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Сравнительных анализ абс. отклонений</h2>
        </Col>
      </Row>
      <Row className="mb-3">
        <ComparativeAnalysis filter={filter}/>
      </Row>
      <Row>
        <Col>
          <h2>Показатели продаж</h2>
        </Col>
      </Row>
      <Row className="mb-3">
        <SalesPerformance filter={filter}/>
      </Row>
    </Container>
    
  </>
}


export async function getServerSideProps({query}) {
 
  const [startDate, endDate] = getDefaultDateRange();
  const filterValues = {
    periodStart: Number(query?.periodStart) || startDate.getTime(),
    periodEnd: Number(query?.periodEnd) || endDate.getTime(),
    country: Number(query?.country) || 0,
    storage: query?.storage || "",
    currency: query?.currency || "",
    isApp: Number(query?.isApp) || 0,
    loyalty: Number(query?.loyalty) || 0,
    pickup: query?.pickup || "",
    payOrder: Number(query?.payOrder) || 0,
    registrationMethod: query?.registrationMethod || "",
    periodUserNewStart: Number(query?.periodUserNewStart) ||  0,
    periodUserNewEnd: Number(query?.periodUserNewEnd) || 0,
    isEs: Number(query?.isEs) || 0,
    isBoutique: Number(query?.isBoutique) ||  0,
    periodUserRegisterStart: Number(query?.periodUserRegisterStart) || startDate.getTime(),
    periodUserRegisterEnd: Number(query?.periodUserRegisterEnd) || endDate.getTime()
  }

  return {
    props: {filterValues}
  }
}


export default IndicatorsDashboardPage
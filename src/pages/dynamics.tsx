import type { NextPage } from 'next'
import Router from 'next/router'
import { useEffect } from "react";
import Head from 'next/head'
import { Container, Navbar, Row, Col} from 'react-bootstrap'

import Filter from "../features/dynamics/Filter"
import DynamicSale from "../features/dynamics/DynamicSale"

const DynamicsPage: NextPage = () => {
  return <>
    <Head>
      <title>Динамика продаж</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar bg="primary" variant="dark" className="mb-3">
      <Container fluid>
        <Navbar.Brand href="/dynamics">Отчеты</Navbar.Brand>
      </Container>
    </Navbar>
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <Filter/>
        </Col>
      </Row>
      <DynamicsPageContent />
    </Container>
  </>
}


const DynamicsPageContent = () => {
  return (
    <Row className="mb-3">
        <Col>
          <DynamicSale />
        </Col>
    </Row>
  )
}

export default DynamicsPage
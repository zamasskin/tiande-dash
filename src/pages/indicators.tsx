import type { NextPage } from 'next'
import { Container, Navbar, Row, Col} from 'react-bootstrap'

import Filter from '../features/indicators/Filter'
import ComparativeAnalysis from '../features/indicators/ComparativeAnalysis'


const IndicatorsPage: NextPage = () => { 
  return <>
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
    </Container>
  </>
}

export default IndicatorsPage
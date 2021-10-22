import type { NextPage } from 'next'
import { Container, Navbar, Row, Col} from 'react-bootstrap'

import Filter from '../features/indicators/Filter'


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
          2
        </Col>
      </Row>
    </Container>
  </>
}

export default IndicatorsPage

import {Card, Row, Col, FormGroup, FormLabel, FormSelect} from 'react-bootstrap'

import Period from './Period'
import Country from './Country'

function Filter() {
  return <Card bg="light" className="shadow-sm">
    <Card.Body>
      <Row>
        <Col md={2}>
          <FormGroup>
            <FormLabel>Период</FormLabel>
            <Period></Period>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <FormLabel>Страна</FormLabel>
            <Country />
          </FormGroup>
        </Col>
      </Row>
    </Card.Body>
  </Card>
}

export default Filter
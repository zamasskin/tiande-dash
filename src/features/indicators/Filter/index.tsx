
import {Card, Row, Col, FormGroup, FormLabel, FormSelect} from 'react-bootstrap'

import Period from './Period'

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
      </Row>
    </Card.Body>
  </Card>
}

export default Filter
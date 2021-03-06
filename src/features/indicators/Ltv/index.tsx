import {Row, Col, Card, Form, ListGroup} from "react-bootstrap"

import PeriodRegister from '../Filter/PeriodRegister'
import Calculations from './Calculations'
import SalesMonth from './SalesMonth'
import PurchasesInPeriod from './PurchasesInPeriod'

function Ltv() {
  return (
    <>
      <Col>
        <Card className="shadow-sm">
          <Card.Header>
            <Form>
              <Form.Group as={Col} md="2" controlId="period-register" className="mb-3">
                <Form.Label>Период регистрации</Form.Label>
                <PeriodRegister />
              </Form.Group>
            </Form>
          </Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Calculations />
            </Row>
            <Row>
              <Col>
                <SalesMonth />
              </Col>
              <Col>
                <PurchasesInPeriod />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}

export default Ltv
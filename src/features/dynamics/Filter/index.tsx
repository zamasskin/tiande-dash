import {Card, Row, Col, Form} from 'react-bootstrap'

import Period from './Period'
import Country from './Country'
import Currencies from './Currencies'
import AppSelect from './AppSelect'
import IsLoyalty from './IsLoyalty'
import ShipmentMethod from './ShipmentMethod'
import IsPay from './IsPay'
import RegisterMethod from './RegisterMethod'
import PeriodNew from './PeriodNew'
import IsEs from './IsEs'
import PeriodType from './PeriodType'

function Filter() {
  return (
    <Card bg="light" className="shadow-sm">
      <Card.Body>
        <Form>
          <Row>
            <Form.Group as={Col} md="2" controlId="period" className="mb-3">
              <Form.Label>Период</Form.Label>
              <Period />
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="period-new" className="mb-3">
              <Form.Label>Период новичка</Form.Label>
              <PeriodNew />
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="country" className="mb-3">
              <Form.Label>Страна</Form.Label>
              <Country />
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="currency" className="mb-3">
              <Form.Label>Валюта</Form.Label>
              <Currencies/>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="is-app" className="mb-3">
              <Form.Label>Приложение</Form.Label>
              <AppSelect/>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="is-loyalty" className="mb-3">
              <Form.Label>Заказы лояльности</Form.Label>
              <IsLoyalty/>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="shipment-method" className="mb-3">
              <Form.Label>Самовывоз</Form.Label>
              <ShipmentMethod/>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="is-pay" className="mb-3">
              <Form.Label>Оплаченные заказы</Form.Label>
              <IsPay />
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="register-method" className="mb-3">
              <Form.Label>Метод регистрации</Form.Label>
              <RegisterMethod />
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="is-es" className="mb-3">
              <Form.Label>Страны ЕС</Form.Label>
              <IsEs />
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="period-type" className="mb-3">
              <Form.Label>Тип периода</Form.Label>
              <PeriodType />
            </Form.Group>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}


export default Filter
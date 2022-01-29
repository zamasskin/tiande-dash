import moment from 'moment'
import {Card, Row, Col, Form} from 'react-bootstrap'


import FormGroup from '../../components/UI/FormGroup'
import PeriodBase from '../../components/filter/Period'
import CountryBase from '../../components/filter/Country'
import CurrenciesBase from '../../components/filter/Currencies'
import StoragesBase from '../../components/filter/Storages'
import SelectYN from '../../components/filter/SelectYN';
import ShipmentMethodBase from '../../components/filter/ShipmentMethod'
import RegisterMethodBase from '../../components/filter/RegisterMethod';

export default function FilterIndicators({apply, value}) {
  return <Card bg="light" className="shadow-sm">
    <Card.Body>
      <Form>
        <Row>
          {/* Период */}
          <FormGroup controlId="period" title="Период">
            <PeriodBase 
              startDate={value.periodStart > 0 ? moment(value.periodStart) : null}
              endDate={value.periodEnd > 0 ? moment(value.periodEnd): null}
              name="period"
              onChange={({ startDate, endDate}) => {
                apply({...value,  
                  periodStart: startDate ? startDate.toDate().getTime() : value.periodStart,
                  periodEnd: endDate ? endDate.toDate().getTime() : value.periodEnd
                })
              }}
            />
          </FormGroup>
          {/* Период новичка */}
          <FormGroup controlId="period-new" title="Период новичка">
            <PeriodBase 
                startDate={value.periodUserNewStart > 0 ? moment(value.periodUserNewStart) : null}
                endDate={value.periodUserNewEnd > 0 ? moment(value.periodUserNewEnd): null}
                name="period"
                onChange={({ startDate, endDate}) => {
                  apply({...value, 
                    periodUserNewStart: startDate ? startDate.toDate().getTime() : value.periodUserNewStart,
                    periodUserNewEnd: endDate ? endDate.toDate().getTime() : value.periodUserNewEnd
                  })
                }}
              />
          </FormGroup>
          {/* страна */}
          <FormGroup controlId="country" title="Страна">
            <CountryBase 
              size="lg"
              value={value.country} 
              onChange={(ev: any) => apply({...value, country: ev.target.value})}
            />
          </FormGroup>
          {/* Склад */}
          <FormGroup controlId="storage" title="Склад">
            <StoragesBase 
            size="lg"
            value={value.storage}
            onChange={(ev: any) => apply({...value, storage: ev.target.value})}/>
          </FormGroup>
          {/* Валюта */}
          <FormGroup controlId="currency" title="Валюта">
            <CurrenciesBase 
              value={value.currency}
              size="lg" 
              onChange={(ev: any) => apply({...value, currency: ev.target.value}) }
            />
          </FormGroup>
          {/* Приложение */}
          <FormGroup controlId="is-app" title="Приложение">
            <SelectYN 
              size="lg"
              value={value.isApp}
              onChange={(ev: any) =>  apply({...value, isApp: ev.target.value})}
            />
          </FormGroup>
          {/* Заказы лояльности */}
          <FormGroup controlId="is-loyalty" title="Заказы лояльности">
            <SelectYN 
              size="lg"
              value={value.loyalty}
              onChange={(ev: any) =>apply({...value, loyalty: ev.target.value})}
            />
          </FormGroup>
          {/* Самовывоз */}
          <FormGroup controlId="shipment-method" title="Самовывоз">
            <ShipmentMethodBase 
              value={value.pickup}
              size="lg" 
              onChange={(ev: any) => apply({...value, pickup: ev.target.value}) }
            />
          </FormGroup>
          {/* Оплаченные заказы */}
          <FormGroup controlId="is-pay" title="Оплаченные заказы">
            <SelectYN 
              size="lg"
              value={value.payOrder}
              onChange={(ev: any) => apply({...value, payOrder: ev.target.value})}
            />
          </FormGroup>
          {/* Метод регистрации */}
          <FormGroup controlId="register-method" title="Метод регистрации">
            <RegisterMethodBase 
              size="lg"
              value={value.registrationMethod}
              onChange={(ev: any) => apply({...value, registrationMethod: ev.target.value})}
            />
          </FormGroup>
          <FormGroup controlId="is-es" title="Страны ЕС">
            <SelectYN 
              size="lg"
              value={value.isEs}
              onChange={(ev: any) => apply({...value, isEs: ev.target.value})}
            />
          </FormGroup>
          <FormGroup controlId="is-boutique" title="Бутик тианде">
              <SelectYN 
                size="lg"
                value={value.isBoutique}
                onChange={(ev: any) => apply({...value, isBoutique: ev.target.value})}
              />
          </FormGroup>
        </Row>
      </Form>
    </Card.Body>
    
  </Card>
}
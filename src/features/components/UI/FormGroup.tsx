import {Card, Row, Col, Form} from 'react-bootstrap'

export default function FormGroup({controlId, title, children}) {
  return <Form.Group as={Col} md="2" controlId={controlId} className="mb-3">
    <Form.Label>{title}</Form.Label>
    {children}
  </Form.Group>
}
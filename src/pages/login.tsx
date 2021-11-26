import  React, { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap'
import Router from 'next/router'

import { fetchLogin } from '../features/api/login';

const Login: NextPage = () => {
  const [values, setValues] = useState({
    load: false,
    type: 1,
    login: "",
    password: "",
    error: false
  });

  const success = () => {
    setValues({...values, load: false})
    Router.push(localStorage.getItem("backPath") || "/")
  }
  const sendForm = () => {
    setValues({...values, error: false, load: true})
    fetchLogin(values)
      .then(success)
      .catch(err => setValues({...values, error: err.message,  load: false}))
  }

  return (
   <>
      <Head>
        <title>Авторизация</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="wrapper fadeInDown">
        <div id="login">
          <h3 className="text-center text-white pt-5">Login form</h3>
          <Container>
            <Row id="login-row" className="justify-content-center align-items-center">
              <Col md="6" id="login-column">
                <Col md="12" id="login-box">
                  <Form id="login-form" className="form">
                    <h3 className="text-center text-info">Авторизация</h3>
                    <Form.Group className="form-group" controlId="type">
                      <Form.Check 
                        inline 
                        label="Оnline Business Center" 
                        name="type" 
                        type="radio" 
                        className="text-info" 
                        value="1"
                        checked={values.type === 1}
                        onChange={() => setValues({...values, type: 1})}
                      />
                      <Form.Check 
                        inline 
                        label="Оnline Office" 
                        name="type" 
                        type="radio" 
                        value="2"
                        className="text-info"
                        checked={values.type !== 1}
                        onChange={() => setValues({...values, type: 2})}
                      />
                      <hr/>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="login">
                      <Form.Label className="text-info">Логин</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="" 
                        value={values.login}
                        onChange={(ev) => setValues({...values, login: ev.target.value})}
                      />
                    </Form.Group>
                    <Form.Group className="form-group" controlId="login">
                      <Form.Label className="text-info">Пароль</Form.Label>
                      <Form.Control 
                        type="password" 
                        placeholder=""
                        value={values.password}
                        onChange={(ev) => setValues({...values, password: ev.target.value})}
                      />
                    </Form.Group>
                    <Form.Group className="form-group" controlId="submit">
                      <Button variant="info" type="button" onClick={sendForm}>
                        Войти
                      </Button>
                    </Form.Group>
                    {values.load && (
                      <Spinner animation="border" role="status" variant="primary">
                      <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    )}
                    {values.error && <Alert variant="danger">{values.error}</Alert>}
                  </Form>
                </Col>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
   </>
  )
}


export default Login
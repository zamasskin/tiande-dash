import { Container, Navbar, Row, Col, Card, Spinner} from 'react-bootstrap'
import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas'
import Cookies from "js-cookie";
import { fetchSession } from '../api/session';



function getCanvas(): Promise<HTMLElement> {
  return new Promise(ok => {
    html2canvas(document.querySelector("body")).then(canvas => {
      const wrap = document.createElement("DIV");
      wrap.classList.add("login-canvas");
      wrap.appendChild(canvas);
      ok(wrap);
    });
  })
}

function Login({children}) {
  const [show, setShow] = useState(true); 
  const openForm = () => {
    localStorage.setItem('backPath', window.location.pathname);
    window.location.href = '/login'
  }


  useEffect(() => {
   (async() => {
    const phpSessId = Cookies.get("PHPSESSID");
    if(!phpSessId) {
     return openForm();
    }
    const sessionData = await fetchSession(phpSessId);
    if((Array.isArray(sessionData) && sessionData.length === 0 ) || !sessionData) {
      return openForm();
    }
   })()
  }, [])
  return children;
}


export default Login
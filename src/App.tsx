import React from "react";

import "./App.scss";
// Components
import { ContactForm } from "./components/ContactForm/ContactForm";
import { UserCard } from "./components/UserCard/UserCard";

// Bootstrap style
import { Container, Row, Col } from "react-bootstrap";

function App() {
   return (
      <Container className="pt-5">
         <Row>
            <Col>
               <ContactForm />
            </Col>
            <Col>
               <UserCard email="" firstName="" lastName="" note="" />
            </Col>
         </Row>
      </Container>
   );
}

export default App;

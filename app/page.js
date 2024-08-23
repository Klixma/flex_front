"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // use `next/navigation` instead of `next/router`
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  let navigate = useRouter();
  const routeChange = () => {
    let path = `/dashboard/dashboard1`;
    navigate.push(path);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    routeChange();
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <div className="login-form">
            <h2 className="text-center">Welcome back!</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-4 w-100">
                Sign In
              </Button>
            </Form>
            <div className="text-center mt-3">
              <a href="#">Forgot password?</a>
              <br />
              <a href="#">Don't have an account? Create an Account</a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

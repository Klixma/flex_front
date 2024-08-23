import React from 'react';
import Layout from '../components/Layout';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard1 = () => {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Today Orders</Card.Title>
                <Card.Text>5,472</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Today Earnings</Card.Title>
                <Card.Text>$47,589</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Profit Gain</Card.Title>
                <Card.Text>$8,943</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Total Earnings</Card.Title>
                <Card.Text>$57.12M</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Add more components like Timeline, Recent Transactions, Charts, etc. */}
      </Container>
    </Layout>
  );
};

export default Dashboard1;

"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Row,
  InputGroup,
  Tooltip,
  Modal,
} from "react-bootstrap";
import InvoiceItemTable from "./invoice_item_table";
import NavigationBar from "../components/Navigation";
import DealerForInvoice from "./comp/delare_search_invoice";

function CreateInvoice() {
  const [data, setData] = useState({
    id_dealer: null,
    customer_name: "",
    customer_address: "",
    customer_tp: "",
    note: "",
  });

  const { id_dealer, customer_name, customer_address, customer_tp, note } =
    data;

  // Store user_id in state
  const [user_id, setUserId] = useState("");

  // Fetch user_id from localStorage when component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) setUserId(storedUserId);
  }, []);

  // Handle form field changes
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Modal state
  const [select, setSelect] = useState(false);

  const handleShowModal = () => setSelect(true);
  const handleCloseModal = () => setSelect(false);

  // Focus on the first input field on mount
  useEffect(() => {
    const textField = document.getElementById("customer_name");
    if (textField) textField.focus();
  }, []);

  return (
    <>
      <NavigationBar />
      <Row className="mt-5 pt-4">
        <Card className="box-shadow-0 card text-white bg-secondary">
          <Card.Header>
            <h4 className="card-title mb-1">Create Invoice</h4>
          </Card.Header>
          <Card.Body className="pt-0">
            <Row>
              <Col lg={3} xl={3} md={3} sm={3}>
                {/* Customer Name */}
                <FormGroup>
                  <Form.Label htmlFor="customer_name">
                    Customer Name
                    <Button
                      className="btn btn-primary btn-sm ms-2"
                      onClick={handleShowModal}
                    >
                      Search Customer
                    </Button>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    placeholder="Customer Name"
                    onChange={changeHandler}
                    value={customer_name}
                  />
                </FormGroup>
              </Col>
              <Col lg={3} xl={3} md={3} sm={3}>
                {/* Customer Address */}
                <FormGroup>
                  <Form.Label htmlFor="customer_address">
                    Customer Address
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="customer_address"
                    name="customer_address"
                    placeholder="Customer Address"
                    onChange={changeHandler}
                    value={customer_address}
                  />
                </FormGroup>
              </Col>
              <Col lg={3} xl={3} md={3} sm={3}>
                {/* Phone Number */}
                <Form.Label htmlFor="customer_tp">Phone Number</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <Tooltip placement="top" title="Phone Number Please">
                      <i className="fab fa-whatsapp"></i>
                    </Tooltip>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    id="customer_tp"
                    name="customer_tp"
                    onChange={changeHandler}
                    value={customer_tp}
                  />
                </InputGroup>
              </Col>
              <Col lg={3} xl={3} md={3} sm={3}>
                {/* Note */}
                <FormGroup>
                  <Form.Label htmlFor="note">Note</Form.Label>
                  <Form.Control
                    type="text"
                    id="note"
                    name="note"
                    placeholder="Note"
                    onChange={changeHandler}
                    value={note}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>

      <br />

      <Row>
        <Card className="box-shadow-0">
          <Card.Body className="pt-0">
            <InvoiceItemTable
              id_dealer={data.id_dealer}
              customer_name={customer_name}
              customer_address={customer_address}
              customer_tp={customer_tp}
              note={note}
              user_id={user_id}
            />
          </Card.Body>
        </Card>
      </Row>

      {/* Modal for selecting customer */}
      <Modal show={select} onHide={handleCloseModal}>
        <DealerForInvoice setSelect={setSelect} setData={setData} />
      </Modal>
    </>
  );
}

export default CreateInvoice;

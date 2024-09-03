"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Row,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import apiBaseUrl from "../../../utils/comp/ip";
import GRNItemTable from "./grn_item_table";
import NavigationBar from "../components/Navigation";

function CreateGRN() {
  const [data, setData] = useState({
    bill_no: "",
    supplier_name: "",
    supplier_address: "",
    supplier_tp: "",
    purchase_date: "",
    po_number: "",
    job_number: "",
  });
  const {
    bill_no,
    supplier_name,
    supplier_address,
    supplier_tp,
    purchase_date,
    po_number,
    job_number,
  } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const pressEnter = (e) => {
    const tFP = e.target.id;
    if (e.keyCode === 13) {
      tFP == "bill_no"
        ? document.getElementById("purchase_date").focus()
        : tFP == "purchase_date"
        ? document.getElementById("po_number").focus()
        : tFP == "po_number"
        ? document.getElementById("job_number").focus()
        : tFP == "job_number"
        ? document.getElementById("supplier_name").focus()
        : tFP == "supplier_name"
        ? document.getElementById("supplier_address").focus()
        : tFP == "supplier_address"
        ? document.getElementById("supplier_tp").focus()
        : tFP == "supplier_tp"
        ? document.getElementById("item").focus()
        : tFP == "phone_number"
        ? document.getElementById("address").focus()
        : tFP == "address"
        ? document.getElementById("description").focus()
        : "";
    }
  };

  React.useEffect(() => {
    // Set focus on the text field
    const textField = document.getElementById("bill_no") || ref.current;
    if (textField) {
      textField.focus();
    }
  }, []);
  return (
    <div>
      <NavigationBar />
      <Row className=" mt-5 pt-4">
        <Col lg={8} xl={8} md={8} sm={12}>
          <Card className="box-shadow-0">
            <Card.Header>
              <h4 className="card-title mb-1">Create GRN</h4>
              <p className="mb-2">You can create new GRN in here.</p>
            </Card.Header>
            <Card.Body className=" pt-0">
              <Row>
                <Col lg={6} xl={6} md={6} sm={6}>
                  <FormGroup className="form-group">
                    <Form.Label htmlFor="bill_no">Bill No:</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="bill_no"
                      name="bill_no"
                      placeholder="Bill No"
                      onChange={changeHandler}
                      defaultValue={bill_no}
                      onKeyDown={pressEnter}
                    />
                  </FormGroup>
                </Col>

                <Col lg={6} xl={6} md={6} sm={6}>
                  <FormGroup className="form-group">
                    <Form.Label htmlFor="purchase_date">
                      Purchase Date:
                    </Form.Label>
                    <Form.Control
                      type="date"
                      className="form-control"
                      id="purchase_date"
                      name="purchase_date"
                      placeholder="Purchase Date"
                      onChange={changeHandler}
                      defaultValue={purchase_date}
                      onKeyDown={pressEnter}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={6} xl={6} md={6} sm={6}>
                  <FormGroup className="form-group">
                    <Form.Label htmlFor="po_number">PO Number:</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="po_number"
                      name="po_number"
                      placeholder="PO Number"
                      onChange={changeHandler}
                      defaultValue={po_number}
                      onKeyDown={pressEnter}
                    />
                  </FormGroup>
                </Col>

                <Col lg={6} xl={6} md={6} sm={6}>
                  <FormGroup className="form-group">
                    <Form.Label htmlFor="job_number">Job Number:</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="job_number"
                      name="job_number"
                      placeholder="Job Number"
                      onChange={changeHandler}
                      defaultValue={job_number}
                      onKeyDown={pressEnter}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} xl={4} md={4} sm={12}>
          <Card className="box-shadow-0">
            <Card.Body className=" pt-0">
              <div className="form-horizontal">
                {/* Supplier name text field */}
                <FormGroup className="form-group">
                  <Form.Label htmlFor="supplier_name">Supplier Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="supplier_name"
                    name="supplier_name"
                    placeholder="Supplier Name"
                    onChange={changeHandler}
                    defaultValue={supplier_name}
                    onKeyDown={pressEnter}
                  />
                </FormGroup>
                {/* Supplier Address text field */}
                <FormGroup className="form-group">
                  <Form.Label htmlFor="supplier_address">
                    Supplier Address
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="supplier_address"
                    name="supplier_address"
                    placeholder="Supplier Address"
                    onChange={changeHandler}
                    defaultValue={supplier_address}
                    onKeyDown={pressEnter}
                  />
                </FormGroup>
                <Form.Label htmlFor="supplier_tp">Phone Number</Form.Label>
                <InputGroup className="input-group mb-3">
                  <InputGroup.Text className="input-group-text">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Phone Number Please</Tooltip>}
                    >
                      <i className="fab fa-whatsapp"></i>
                    </OverlayTrigger>
                  </InputGroup.Text>
                  <Form.Control
                    className="form-control"
                    type="text"
                    id="supplier_tp"
                    name="supplier_tp"
                    onChange={changeHandler}
                    defaultValue={supplier_tp}
                    onKeyDown={pressEnter}
                  />
                </InputGroup>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <Col lg={12} xl={12} md={12} sm={12}>
          <Card className="box-shadow-0">
            <Card.Body className="pt-0">
              <div className="form-horizontal">
                <GRNItemTable
                  bill_no={bill_no}
                  supplier_name={supplier_name}
                  supplier_address={supplier_address}
                  supplier_tp={supplier_tp}
                  purchase_date={purchase_date}
                  po_number={po_number}
                  job_number={job_number}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CreateGRN;

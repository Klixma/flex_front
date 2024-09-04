"use client";
import React, { useState, useEffect } from "react";
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
  Modal,
  Table,
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

  const [select, setSelect] = useState(false);
  const [suppliers, setSuppliers] = useState([]);

  const handleShowModal = () => {
    setSelect(true);
    fetchSuppliers();
  };

  const viewDemoClose = () => {
    setSelect(false);
  };

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/grn/suplers");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const selectSupplier = (supplier) => {
    setData({
      ...data,
      supplier_name: supplier.supplier_name,
      supplier_address: supplier.address,
      supplier_tp: supplier.tp_no,
    });
    setSelect(false); // Close the modal after selection
  };

  const pressEnter = (e) => {
    const tFP = e.target.id;
    if (e.keyCode === 13) {
      tFP === "bill_no"
        ? document.getElementById("purchase_date").focus()
        : tFP === "purchase_date"
        ? document.getElementById("po_number").focus()
        : tFP === "po_number"
        ? document.getElementById("job_number").focus()
        : tFP === "job_number"
        ? document.getElementById("supplier_name").focus()
        : tFP === "supplier_name"
        ? document.getElementById("supplier_address").focus()
        : tFP === "supplier_address"
        ? document.getElementById("supplier_tp").focus()
        : tFP === "supplier_tp"
        ? document.getElementById("item").focus()
        : "";
    }
  };

  useEffect(() => {
    const textField = document.getElementById("bill_no");
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
                      value={bill_no}
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
                      value={purchase_date}
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
                      value={po_number}
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
                      value={job_number}
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
                  <Form.Label htmlFor="supplier_name">
                    Supplier Name{" "}
                    <Button
                      className="btn btn-primary btn-sm"
                      onClick={handleShowModal}
                    >
                      Search Supplier
                    </Button>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="supplier_name"
                    name="supplier_name"
                    placeholder="Supplier Name"
                    onChange={changeHandler}
                    value={supplier_name}
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
                    value={supplier_address}
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
                    value={supplier_tp}
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

      {/* Modal to select supplier */}
      <Modal show={select} onHide={viewDemoClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, index) => (
                <tr key={index}>
                  <td>{supplier.supplier_name}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.tp_no}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => selectSupplier(supplier)}
                    >
                      Select
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={viewDemoClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateGRN;

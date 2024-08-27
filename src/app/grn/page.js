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
    phone_number: "",
    address: "",
    description: "",
  });
  const {
    bill_no,
    supplier_name,
    supplier_address,
    supplier_tp,
    phone_number,
    address,
    description,
  } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const pressEnter = (e) => {
    const tFP = e.target.id;
    if (e.keyCode === 13) {
      tFP == "bill_no"
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
        : tFP == "description"
        ? handleSubmit()
        : "";
    }
  };

  const handleSubmit = async () => {
    if (supplier_name  == "") {
      Swal.fire({
        title: "Warning!",
        allowOutsideClick: false,
        confirmButtonText: "ok",
        cancelButtonColor: "#38cab3",
        text: "Dealer Name is required.",
      });
    } else if (supplier_tp == "" || phone_number == "") {
      Swal.fire({
        title: "Warning!",
        allowOutsideClick: false,
        confirmButtonText: "ok",
        cancelButtonColor: "#38cab3",
        text: "One phone number is required.",
      });
    } else if (address == "") {
      Swal.fire({
        title: "Warning!",
        allowOutsideClick: false,
        confirmButtonText: "ok",
        cancelButtonColor: "#38cab3",
        text: "Address is required.",
      });
    } else {
      try {
        const response = await axios.post(
          `${apiBaseUrl}/delaer/create`,
          {
            dealer_name: supplier_name ,
            dealer_supplier_address: supplier_address,
            supplier_tp: supplier_tp,
            phone_number: phone_number,
            address: address,
            description: description,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (response.status === 200) {
          Swal.fire({
            title: "Well done!",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "ok",
            cancelButtonColor: "#38cab3",
            text: response.data.message,
          });
        }
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);

            if (error.response.status === 500) {
              Swal.fire({
                title: "Warning!",
                allowOutsideClick: false,
                confirmButtonText: "ok",
                cancelButtonColor: "#38cab3",
                text: error.response.data.message,
              });
            }
          } else if (error.request) {
            console.error("No response received. Request:", error.request);
            alert("No response received from the server.");
          } else {
            console.error("Error setting up the request:", error.message);
            alert("Error: " + error.message);
          }

          console.error("Error config:", error.config);
        }
      }
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
        <Col lg={6} xl={6} md={6} sm={12}>
          <Card className="box-shadow-0">
            <Card.Header>
              <h4 className="card-title mb-1">Create GRN</h4>
              <p className="mb-2">You can create new GRN in here.</p>
            </Card.Header>
            <Card.Body className=" pt-0">
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
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} xl={6} md={6} sm={12}>
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

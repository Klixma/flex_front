"use client"; // Add this line at the top of the file

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Modal, Row, Col, FormGroup } from "react-bootstrap";
import apiBaseUrl from "../../../../utils/comp/ip";
import NavigationBar from "../../components/Navigation";
import SearchGRN from "../grn_search/full_view_gnr";

function GRNSummary() {
  const [select, setSelect] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [idGRN, setIdGRN] = React.useState("ttt");
  const [datetime, setDatetime] = React.useState();

  const handleShowModal = (modal, id_item) => {
    if (modal === "select") {
      setIdGRN(id_item);
      setSelect(true);
    }
  };

  const viewDemoClose = (modal) => {
    switch (modal) {
      case "select":
        setSelect(false);
        break;
      default:
        break;
    }
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/grn/summary`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setData(response.data);
        } else if (response.status === 401) {
          alert(response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert(error.response.data.message);
        } else {
          console.error(error);
        }
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <NavigationBar />
      <div className="breadcrumb-header justify-content-between mt-5 pt-3">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1 p-3">
            GRN Summary
          </span>
          <Row>
            <Col lg={6} xl={6} md={6} sm={6}>
              <FormGroup className="form-group">
                <Form.Label htmlFor="date">Date:</Form.Label>
                <Form.Control
                  type="monthe"
                  className="form-control"
                  id="date"
                  name="date"
                  // onChange={changeHandler}
                  value={datetime}
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
      </div>
      <Row className="row-sm p-2">
        <Col lg={12}>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>Bill No</th>
                <th>Item Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th style={{ textAlign: "right" }}>Unit Price (Rs:)</th>
                <th style={{ textAlign: "right" }}>Amount (Rs:)</th>
                <th>Supplier Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={`${item.id_grn}-${item.item_name}`}>
                  <td>{item.bill_no}</td>
                  <td>{item.item_name}</td>
                  <td>{item.description}</td>
                  <td>{item.qnty}</td>
                  <td style={{ textAlign: "right" }}>
                    {Number(item.unit_price).toFixed(2)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {Number(item.Amount).toFixed(2)}
                  </td>
                  <td>{item.supplier_name}</td>
                  <td>
                    <Button
                      variant={item.cancel === 1 ? "danger" : "primary"}
                      onClick={() => handleShowModal("select", item.id_grn)}
                    >
                      <span className="glyphicon glyphicon-th-list"></span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>

      <Modal
        show={select}
        onHide={() => viewDemoClose("select")}
        className="modal-xl"
      >
        <SearchGRN setSelect={setSelect} id={idGRN} />
      </Modal>
    </>
  );
}

export default GRNSummary;

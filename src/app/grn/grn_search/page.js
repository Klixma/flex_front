"use client"; // Add this line at the top of the file

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import apiBaseUrl from "../../../../utils/comp/ip";
import NavigationBar from "../../components/Navigation";
import SearchGRN from "./full_view_gnr";

function GRNSearch() {
  const [select, setSelect] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [idGRN, setIdGRN] = React.useState("ttt");
  const [pageCount, setPageCount] = React.useState(0);

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
        const response = await axios.get(`${apiBaseUrl}/grn/searchall`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setData(response.data);
          setPageCount(Math.ceil(response.data.length / 10)); // Assuming 10 items per page
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

  // Date formatting function
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString)
      .toLocaleDateString(undefined, options)
      .replace(",", "");
  };

  return (
    <>
      <NavigationBar />
      <div className="breadcrumb-header justify-content-between mt-5 pt-3">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1 p-3">
            Search GRN
          </span>
        </div>
      </div>
      <Row className="row-sm p-2">
        <Col lg={12}>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>ID GRN</th>
                <th>Bill No</th>
                <th>Date & time</th>
                <th>Supplier Name</th>
                <th>Supplier TP</th>
                <th>Total</th>
                <th>Payment Methods</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id_grn}>
                  <td>{item.id_grn}</td>
                  <td>{item.bill_no}</td>
                  <td>{formatDate(item.date_time)}</td>
                  <td>{item.supplier_name}</td>
                  <td>{item.tp_no}</td>
                  <td>{item.total_value}</td>
                  <td>{item.methods}</td>
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

export default GRNSearch;

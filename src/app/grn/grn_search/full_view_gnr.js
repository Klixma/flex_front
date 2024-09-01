import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Modal,
  Row,
} from "react-bootstrap";
import apiBaseUrl from ".././../../../utils/comp/ip";
import GRN from "./print_grn";

function SearchGRN({ setSelect, id }) {
  // State to store GRN data
  const [data, setData] = useState({
    item_name: "",
    unit_of_measure: "",
    unit_price: "",
    description: "",
    active: false, // Ensure active is a boolean
  });

  // Function to close modal
  const viewDemoClose = (modal) => {
    if (modal === "select") {
      setSelect(false);
    }
  };

  // Print function to handle printing the GRN content
  const printQ = () => {
    const printContent = document.getElementById("grn-content").innerHTML;
    const mywindow = window.open("", "Stock Management System", "height=1000,width=793");
    
    mywindow.document.write("<html><head><title>Print GRN</title>");
    // Optional: Include your CSS styles if needed
    mywindow.document.write("</head><body>");
    mywindow.document.write(printContent);
    mywindow.document.write("</body></html>");

    mywindow.document.close(); // For IE compatibility
    mywindow.focus(); // For IE compatibility

    mywindow.print();
    mywindow.close();
  }

  return (
    <>
      <Modal.Header>
        <Modal.Title>Full View GRN</Modal.Title>
        <Button
          variant=""
          className="btn btn-close"
          onClick={() => viewDemoClose("select")}
        ></Button>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={12} xl={12} md={12} sm={12}>
            <Card className="box-shadow-0">
              <Card.Body className="pt-0" id="grn-content">
                <GRN id={id} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          className="btn me-2"
          onClick={printQ}
        >
          Print
        </Button>
      </Modal.Footer>
    </>
  );
}

export default SearchGRN;

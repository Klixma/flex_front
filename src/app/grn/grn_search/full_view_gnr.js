import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import apiBaseUrl from ".././../../../utils/comp/ip";
import GRN from "./print_grn";
import Swal from "sweetalert2";

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
    const mywindow = window.open(
      "",
      "Stock Management System",
      "height=1000,width=793"
    );

    mywindow.document.write("<html><head><title>Print GRN</title>");
    // Optional: Include your CSS styles if needed
    mywindow.document.write("</head><body>");
    mywindow.document.write(printContent);
    mywindow.document.write("</body></html>");

    mywindow.document.close(); // For IE compatibility
    mywindow.focus(); // For IE compatibility

    mywindow.print();
    mywindow.close();
  };

  const deleteGRN = async () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `${apiBaseUrl}/grn/canclegrn?id=${id}`,
            {},
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          if (response.status === 200) {
            Swal.fire("Saved!", "", response.data.message);
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
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
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
        <Button variant="primary" className="btn me-2" onClick={printQ}>
          Print
        </Button>
        <Button variant="danger" className="btn me-2" onClick={deleteGRN}>
          Cancle GRN
        </Button>
      </Modal.Footer>
    </>
  );
}

export default SearchGRN;

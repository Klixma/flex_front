import React, { useState, useEffect } from "react";
import axios from "axios";
import apiBaseUrl from "../../../../utils/comp/ip";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  InputGroup,
  OverlayTrigger,
  Tooltip,
  Modal,
} from "react-bootstrap";

function DealerForInvoice({ setSelect, setData }) {
  const [dealerData, setDealerData] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const { id_dealer, dealer_name, address, phone_number, whatsapp_number } =
    dealerData;

  useEffect(() => {
    const textField = document.getElementById("dealer_phone_number");
    if (textField) {
      textField.focus();
    }
  }, []);

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const searchDealer = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/delaer/search_using_pno_for_msheet?dealer_phone_number=${phoneNumber}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 && response.data.length > 0) {
        setDealerData(response.data[0]);
      } else {
        setDealerData({});
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert(error.response.data.message);
      } else {
        console.error(error);
      }
    }
  };

  function addToQuotation() {
    setData((prevData) => ({
      ...prevData,
      id_dealer: id_dealer || "",
      customer_name: dealer_name || "",
      customer_address: address || "",
      customer_tp: whatsapp_number || "",
    }));
    setSelect(false);
  }

  const viewDemoClose = () => {
    setSelect(false);
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>
          <Card.Header>
            <h4 className="card-title mb-1">Dealer</h4>
            <p className="mb-2">You can search Dealer.</p>
          </Card.Header>
        </Modal.Title>
        <Button
          variant=""
          className="btn btn-close"
          onClick={() => viewDemoClose()}
        >
          x
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={12} xl={12} md={12} sm={12}>
            <Card className="box-shadow-0">
              <Card.Body className="pt-0">
                <Col lg={12} xl={12} md={12} sm={12}>
                  <Form.Label htmlFor="dealer_phone_number">
                    Phone Number
                  </Form.Label>
                  <InputGroup className="input-group mb-3">
                    <InputGroup.Text className="input-group-text">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Dealer Phone Number</Tooltip>}
                      >
                        <i className="si si-phone" title="si-phone"></i>
                      </OverlayTrigger>
                    </InputGroup.Text>
                    <Form.Control
                      className="form-control"
                      type="text"
                      id="dealer_phone_number"
                      name="dealer_phone_number"
                      onChange={handleChange}
                      value={phoneNumber || ""} // Default empty value to avoid undefined
                      onKeyDown={(e) => e.keyCode === 13 && searchDealer()}
                    />
                    <Button
                      variant="primary"
                      className="btn btn-info"
                      onClick={searchDealer}
                    >
                      Search
                    </Button>
                  </InputGroup>
                </Col>
                {dealerData && (
                  <Row>
                    <Col lg={12} xl={12} md={12} sm={12}>
                      <Form.Group className="mb-4">
                        <Form.Label>Dealer Name: {dealer_name}</Form.Label>
                        <Form.Label>Address: {address}</Form.Label>
                        <Form.Label>whatsapp: {whatsapp_number}</Form.Label>
                        <br />
                        <Form.Label>Phone: {phone_number}</Form.Label>
                      </Form.Group>
                    </Col>
                  </Row>
                )}
                <Button
                  className="btn btn-primary mt-3"
                  onClick={addToQuotation}
                >
                  Add To Invoice
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </>
  );
}

export default DealerForInvoice;

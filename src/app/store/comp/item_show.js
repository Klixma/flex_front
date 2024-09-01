"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import apiBaseUrl from "../../../../utils/comp/ip";
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
} from "react-bootstrap";

function ItemShow({ itemid }) {
  const [data, setData] = useState({
    item_name: "",
    unit_of_measure: "piece",
    unit_price: "",
    description: "",
  });

  const { item_name, unit_of_measure, unit_price, description } = data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/store/search_usingid?id_item=${itemid}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const fetchedData = response.data[0];
          setData({
            ...fetchedData,
            active: fetchedData.active === 1 || fetchedData.active === true, // Ensure active is a boolean
          });
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
  }, [itemid]);
  return (
    <div>
      <Col>
        <Card className="custom-card overflow-hidden">
          <Card.Body>
            <div>
              <div className="form-horizontal">
                {/* Dealer name text field */}
                <FormGroup className="form-group">
                  <Form.Label htmlFor="item_name">Item Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="item_name"
                    name="item_name"
                    placeholder="Item Name"
                    defaultValue={item_name}
                    disabled
                  />
                </FormGroup>

                <FormGroup className="control-group form-group">
                  <Form.Label className="form-label">
                    Unit of measure
                  </Form.Label>

                  <select
                    className="form-select form-control"
                    name="unit_of_measure"
                    id="unit_of_measure"
                    defaultValue={unit_of_measure}
                    disabled
                  >
                    <option value="piece">piece</option>
                    <option value="feet">feet</option>
                    <option value="inches">inches</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                    <option value="L">L</option>
                    <option value="kg">kg</option>
                    <option value="Sqft">Sqft</option>
                    <option value="l feet">l feet</option>
                  </select>
                </FormGroup>

                <FormGroup className="form-group">
                  <Form.Label htmlFor="unit_price">Cost of unit</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="unit_price"
                    name="unit_price"
                    placeholder="Unit Price"
                    defaultValue={unit_price}
                    disabled
                  />
                </FormGroup>
                {/* Item Description text field */}
                <FormGroup className="form-group">
                  <Form.Label htmlFor="description">Description</Form.Label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Description"
                    defaultValue={description}
                    rows="3"
                    disabled
                  />
                </FormGroup>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default ItemShow;

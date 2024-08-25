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
} from "react-bootstrap";
import Swal from "sweetalert2";
import apiBaseUrl from ".././../../utils/comp/ip";
import ItemUpdate from "./item_update";

function UpdateItem({ setSelect, id_item }) {
  const [data, setData] = useState({
    item_name: "",
    unit_of_measure: "",
    unit_price: "",
    description: "",
    active: false, // Ensure active is a boolean
  });

  const { item_name, unit_of_measure, unit_price, description, active } = data;

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const pressEnter = (e) => {
    const tFP = e.target.id;
    if (e.keyCode === 13) {
      tFP === "item_name"
        ? document.getElementById("company_name").focus()
        : tFP === "company_name"
        ? document.getElementById("unit_price").focus()
        : tFP === "unit_price"
        ? document.getElementById("description").focus()
        : tFP === "description"
        ? ItemUpdate(id_item, data, viewDemoClose)
        : "";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/store/search_usingid?id_item=${id_item}`,
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
  }, [id_item]);

  useEffect(() => {
    const textField = document.getElementById("item_name");
    if (textField) {
      textField.focus();
    }
  }, []);

  return (
    <>
      <Modal.Header>
        <Modal.Title>
          <Card.Header>
            <h4 className="card-title mb-1">Update Item</h4>
            <p className="mb-2">You can update item.</p>
          </Card.Header>
        </Modal.Title>
        <Button
          variant=""
          className="btn btn-close"
          onClick={() => viewDemoClose("select")}
        >
          x
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={12} xl={12} md={12} sm={12}>
            <Card className="box-shadow-0">
              <Card.Body className="pt-0">
                <div className="form-horizontal">
                  {/* Item Name */}
                  <FormGroup className="form-group">
                    <Form.Label htmlFor="item_name">Item Name</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="item_name"
                      name="item_name"
                      placeholder="Item Name"
                      onChange={changeHandler}
                      value={item_name}
                      onKeyDown={pressEnter}
                    />
                  </FormGroup>

                  {/* Unit of Measure */}
                  <FormGroup className="control-group form-group">
                    <Form.Label className="form-label">
                      Unit of Measure
                    </Form.Label>
                    <select
                      className="form-select form-control"
                      name="unit_of_measure"
                      id="unit_of_measure"
                      onChange={changeHandler}
                      value={unit_of_measure}
                    >
                      <option value="piece">piece</option>
                      <option value="feet">feet</option>
                      <option value="inches">inches</option>
                      <option value="cm">cm</option>
                      <option value="m">m</option>
                      <option value="L">L</option>
                      <option value="kg">kg</option>
                    </select>
                  </FormGroup>

                  {/* Unit Price */}
                  <FormGroup className="form-group">
                    <Form.Label htmlFor="unit_price">Unit Price</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="unit_price"
                      name="unit_price"
                      placeholder="Unit Price"
                      onChange={changeHandler}
                      value={unit_price}
                      onKeyDown={pressEnter}
                    />
                  </FormGroup>

                  {/* Description */}
                  <FormGroup className="form-group">
                    <Form.Label htmlFor="description">Description</Form.Label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      placeholder="Description"
                      onChange={changeHandler}
                      value={description}
                      onKeyDown={pressEnter}
                      rows="3"
                    />
                  </FormGroup>

                  {/* Active Checkbox */}
                  <FormGroup className="form-group">
                    <Form.Label className="custom-switch ps-0">
                      <span className="custom-switch-description me-2">
                        Active
                      </span>
                      <Form.Control
                        type="checkbox"
                        name="active"
                        className="custom-switch-input"
                        checked={active}
                        onChange={changeHandler}
                      />
                      <span className="custom-switch-indicator"></span>
                    </Form.Label>
                  </FormGroup>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => ItemUpdate(id_item, data, setSelect)}
        >
          Save
        </Button>
        <Button variant="secondary" onClick={() => viewDemoClose("select")}>
          Close
        </Button>
      </Modal.Footer>
    </>
  );
}

UpdateItem.propTypes = {};

UpdateItem.defaultProps = {};

UpdateItem.layout = "Contentlayout";

export default UpdateItem;

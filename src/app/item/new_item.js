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
  Modal,
} from "react-bootstrap";
import apiBaseUrl from "../../../utils/comp/ip";
import ItemSave from "./item_save";

function NewItem({ setSelect }) {
  const [data, setData] = useState({
    item_name: "",
    unit_of_measure: "piece",
    unit_price: "",
    description: "",
  });

  const { item_name, unit_of_measure, unit_price, description } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const pressEnter = (e) => {
    const tFP = e.target.id;
    if (e.keyCode === 13) {
      tFP == "item_name"
        ? document.getElementById("unit_of_measure").focus()
        : tFP == "unit_of_measure"
        ? document.getElementById("unit_price").focus()
        : tFP == "unit_price"
        ? document.getElementById("description").focus()
        : tFP == "description"
        ? () => ItemSave(data)
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

  React.useEffect(() => {
    // Set focus on the text field
    const textField = document.getElementById("item_name") || ref.current;
    if (textField) {
      textField.focus();
    }
  }, []);

  return (
    <>
      <Modal.Header>
        <Modal.Title>
          <Card.Header>
            <h4 className="card-title mb-1">New Item</h4>
            <p className="mb-2">You can save new item.</p>
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
              <Card.Body className=" pt-0">
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
                      onChange={changeHandler}
                      defaultValue={item_name}
                      onKeyDown={pressEnter}
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
                      onKeyDown={pressEnter}
                      onChange={changeHandler}
                      defaultValue={unit_of_measure}
                      onSelect={changeHandler}
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

                  <FormGroup className="form-group">
                    <Form.Label htmlFor="unit_price">Cost of unit</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="unit_price"
                      name="unit_price"
                      placeholder="Unit Price"
                      onChange={changeHandler}
                      defaultValue={unit_price}
                      onKeyDown={pressEnter}
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
                      onChange={changeHandler}
                      defaultValue={description}
                      onKeyDown={pressEnter}
                      rows="3"
                    />
                  </FormGroup>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => ItemSave(data, setSelect)}>
          Save
        </Button>
        <Button variant="secondary" onClick={() => viewDemoClose("select")}>
          Close
        </Button>
      </Modal.Footer>
    </>
  );
}

NewItem.propTypes = {};

NewItem.defaultProps = {};

NewItem.layout = "Contentlayout";

export default NewItem;

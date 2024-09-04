import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Row,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import apiBaseUrl from "../../../utils/comp/ip";
import Savetable from "./comp/invoice_table";
import fetchItems from "../item/comp/item_selecter_array";
import SaveGRN from "./comp/save_invoice";
import Select from "react-select";

export const GRNItemTable = ({
  bill_no,
  supplier_name,
  supplier_address,
  supplier_tp,
  purchase_date,
  po_number,
  job_number,
}) => {
  const [tableData, setTableData] = useState([]);
  const [qData, setQData] = useState({
    id_item: "",
    item: null,
    description: "",
    qnty: "",
    qnty_type: "piece",
    c_unit: "",
    unit: "",
    amount: 0,
  });
  const { id_item, item, qnty, qnty_type, c_unit, unit, amount } = qData;

  const [items, setItems] = useState([]);
  const selectRef = useRef(null);
  const [isCashPriceEnabled, setIsCashPriceEnabled] = useState(false);
  const [isCheckPriceEnabled, setIsCheckPriceEnabled] = useState(false);
  const [isCreditPriceEnabled, setIsCreditPriceEnabled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fetch items when the component mounts
  useEffect(() => {
    const loadItems = async () => {
      const fetchedItems = await fetchItems();
      setItems(fetchedItems);
    };

    loadItems();

    // Set isClient to true after component mounts
    setIsClient(true);
  }, []);

  // Handles input and select changes
  const changeHandler = (e) => {
    let name, value;

    if (e.target) {
      // This is for input fields
      ({ name, value } = e.target);
    } else {
      // This is for the Select component
      name = "item";
      value = e;

      setQData((prevState) => ({
        ...prevState,
        [name]: value,
        id_item: value.value, // set id_item when item is selected
      }));

      fillIdAndQType(value.value); // Fill ID and Quantity Type
      return;
    }

    setQData((prevState) => {
      const updatedQData = { ...prevState, [name]: value };

      if (name === "qnty") {
        updatedQData.amount = value * prevState.unit;
      } else if (name === "unit") {
        updatedQData.amount = value * prevState.qnty;
      }

      return updatedQData;
    });
  };

  // Handles key presses to move between inputs
  const pressEnter = (e) => {
    const tFP = e.target.id;
    if (e.keyCode === 13) {
      if (tFP === "item") {
        document.getElementById("qnty").focus();
      } else if (tFP === "description") {
        document.getElementById("qnty").focus();
      } else if (tFP === "qnty") {
        document.getElementById("unit").focus();
      } else if (tFP === "unit") {
        handleAddTableData();
      }
    }
  };
  const handleSelectFocus = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };
  // Adds a row to the table
  const handleAddTableData = () => {
    if (!qData["item"]) {
      Swal.fire({
        title: "Warning!",
        allowOutsideClick: false,
        confirmButtonText: "ok",
        cancelButtonColor: "#38cab3",
        text: "Item is empty. Cannot add to table data.",
      });
    } else {
      const newItem = {
        id_item: qData["id_item"],
        item: qData["item"],
        description: "",
        qnty: qData["qnty"],
        qnty_type: qData["qnty_type"],
        c_unit: qData["c_unit"],
        unit: qData["unit"],
        amount: qData["amount"],
      };

      setTableData((prevTableData) => [...prevTableData, newItem]);

      // document.getElementById("item").focus();
      selectRef.current.focus();
      setQData({
        id_item: "",
        item: null,
        description: "",
        c_unit: "",
        qnty: "",
        qnty_type: "piece",
        unit: "",
        amount: 0,
      });
    }
  };

  // Deletes a row from the table
  const handleDelete = (index) => {
    setTableData((prevTableData) =>
      prevTableData.filter((_, i) => i !== index)
    );
  };

  // Fetch item details using the selected item's ID
  const fillIdAndQType = async (id_item) => {
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
        const unitPrice = Number(fetchedData.unit_price);
        const updatedUnit = parseFloat(
          (unitPrice + unitPrice * 0.25).toFixed(2)
        );
        setQData((prevState) => ({
          ...prevState,
          id_item, // Assign the ID here
          c_unit: unitPrice,
          unit: unitPrice,
          qnty_type: fetchedData.unit_of_measure,
        }));
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

  // Handles checkbox state changes for payment methods
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    switch (id) {
      case "cash_price_cbox":
        setIsCashPriceEnabled(checked);
        if (!checked) {
          document.getElementById("cash_price").value = "";
        }
        break;
      case "check_price_cbox":
        setIsCheckPriceEnabled(checked);
        if (!checked) {
          document.getElementById("check_price").value = "";
        }
        break;
      case "credit_price_cbox":
        setIsCreditPriceEnabled(checked);
        if (!checked) {
          document.getElementById("credit_price").value = "";
        }
        break;
      default:
        break;
    }
  };

  // Prepares payment methods data
  const enabledPrices = () => {
    const paymentMethods = [];

    if (document.getElementById("cash_price_cbox").checked) {
      const price = parseFloat(document.getElementById("cash_price").value);
      if (!isNaN(price)) {
        paymentMethods.push({ method: "cash", price: price });
      }
    }

    if (document.getElementById("check_price_cbox").checked) {
      const price = parseFloat(document.getElementById("check_price").value);
      if (!isNaN(price)) {
        paymentMethods.push({ method: "check", price: price });
      }
    }

    if (document.getElementById("credit_price_cbox").checked) {
      const price = parseFloat(document.getElementById("credit_price").value);
      if (!isNaN(price)) {
        paymentMethods.push({ method: "credit", price: price });
      }
    }

    return paymentMethods;
  };

  // Handles form submission
  const handleSubmit = () => {
    const paymentMethods = enabledPrices();

    SaveGRN(
      bill_no,
      tableData,
      supplier_name,
      supplier_address,
      supplier_tp,
      purchase_date,
      po_number,
      job_number,
      paymentMethods
    );
  };

  return (
    <>
      <Row>
        {/* item */}
        <Col sm={12} md={3} className="mg-t-10 mg-md-t-0">
          <FormGroup className="control-group form-group">
            <Form.Label className="form-label">item</Form.Label>
            <div className=" SlectBox">
              {isClient && ( // Only render Select component on client side
                <Select
                  ref={selectRef}
                  defaultValue={item}
                  onChange={changeHandler}
                  options={items}
                  onFocus={handleSelectFocus} // Ensure it focuses correctly
                />
              )}
            </div>
          </FormGroup>
        </Col>
        <Col sm={12} md={1} className="mg-t-10 mg-md-t-0">
          <FormGroup className="control-group form-group">
            <Form.Label className="form-label">Qnty</Form.Label>
            <Form.Control
              type="number"
              className="form-control"
              required
              placeholder="0"
              name="qnty"
              id="qnty"
              onKeyDown={pressEnter}
              onChange={changeHandler}
              value={qnty}
            />
          </FormGroup>
        </Col>
        {/* qnty_type */}
        <Col sm={12} md={1} className="mg-t-10 mg-md-t-0">
          <FormGroup className="control-group form-group">
            <Form.Label className="form-label">Qnty Type</Form.Label>
            <Form.Control
              className="form-control"
              name="qnty_type"
              id="qnty_type"
              onKeyDown={pressEnter}
              onChange={changeHandler}
              value={qnty_type}
              disabled
            />
          </FormGroup>
        </Col>
        {/* unit */}
        <Col sm={12} md={2} className="mg-t-10 mg-md-t-0">
          <Form.Label className="form-label">Cost of unit</Form.Label>
          <InputGroup className="input-group mb-3">
            <InputGroup.Text className="input-group-text">Rs</InputGroup.Text>
            <Form.Control
              type="number"
              className="form-control"
              required
              placeholder="0"
              name="cost_of_unit"
              id="cost_of_unit"
              value={c_unit}
              disabled
            />
          </InputGroup>
        </Col>
        {/* unit */}
        <Col sm={12} md={2} className="mg-t-10 mg-md-t-0">
          <Form.Label className="form-label">Selling price of unit</Form.Label>
          <InputGroup className="input-group mb-3">
            <InputGroup.Text className="input-group-text">Rs</InputGroup.Text>
            <Form.Control
              type="number"
              className="form-control"
              required
              placeholder="0"
              name="unit"
              id="unit"
              onKeyDown={pressEnter}
              onChange={changeHandler}
              value={unit}
            />
          </InputGroup>
        </Col>
        {/* amount */}
        <Col sm={12} md={3} className="mg-t-10 mg-md-t-0">
          <Form.Label className="form-label">Amount</Form.Label>
          <InputGroup className="input-group mb-3">
            <InputGroup.Text className="input-group-text">Rs</InputGroup.Text>
            <Form.Control
              type="number"
              className="form-control"
              required
              placeholder="0"
              name="amount"
              id="amount"
              onKeyDown={pressEnter}
              onChange={changeHandler}
              value={amount}
              disabled
            />
            <Button
              variant=""
              className="btn btn-primary br-ts-0 br-bs-0"
              type="button"
              onClick={handleAddTableData}
            >
              <i className="fa fa-cart-arrow-down"></i>
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col lg={12} xl={12} md={12} sm={12}>
          <Card className="box-shadow-0">
            <Card.Body className=" pt-0">
              <div className="form-horizontal mt-3">
                <Row className="table-responsive deleted-table">
                  <Savetable
                    tableData={tableData}
                    handleDelete={handleDelete}
                  />
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <Form.Label htmlFor="cash_price">Cash Price</Form.Label>
          <InputGroup className="input-group">
            <div className="input-group-text">
              <label className="ckbox wd-16 mg-b-0">
                <input
                  className="mg-0"
                  type="checkbox"
                  id="cash_price_cbox"
                  name="cash_price_cbox"
                  onChange={handleCheckboxChange}
                />
                <span></span>
              </label>
            </div>
            <Form.Control
              className="form-control"
              placeholder="Price"
              id="cash_price"
              name="cash_price"
              type="number"
              disabled={!isCashPriceEnabled}
            />
          </InputGroup>
        </Col>
        <Col lg={4}>
          <Form.Label htmlFor="check_price">Check Price</Form.Label>
          <InputGroup className="input-group">
            <div className="input-group-text">
              <label className="ckbox wd-16 mg-b-0">
                <input
                  className="mg-0"
                  type="checkbox"
                  id="check_price_cbox"
                  name="check_price_cbox"
                  onChange={handleCheckboxChange}
                />
                <span></span>
              </label>
            </div>
            <Form.Control
              className="form-control"
              placeholder="Price"
              id="check_price"
              name="check_price"
              type="number"
              disabled={!isCheckPriceEnabled}
            />
          </InputGroup>
        </Col>
        <Col lg={4}>
          <Form.Label htmlFor="credit_price">Credit Price</Form.Label>
          <InputGroup className="input-group">
            <div className="input-group-text">
              <label className="ckbox wd-16 mg-b-0">
                <input
                  className="mg-0"
                  type="checkbox"
                  id="credit_price_cbox"
                  name="credit_price_cbox"
                  onChange={handleCheckboxChange}
                />
                <span></span>
              </label>
            </div>
            <Form.Control
              className="form-control"
              placeholder="Price"
              id="credit_price"
              name="credit_price"
              type="number"
              disabled={!isCreditPriceEnabled}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <FormGroup className="form-group mb-0 mt-3 justify-content-end">
          <div>
            <Button
              variant=""
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </FormGroup>
      </Row>
    </>
  );
};

export default GRNItemTable;

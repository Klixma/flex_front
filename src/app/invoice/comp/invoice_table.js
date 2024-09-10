import React, { useEffect, useState } from "react";
import { Button, Table, InputGroup, Form } from "react-bootstrap";

const Savetable = ({
  tableData,
  handleDelete,
  setSubTotal,
  setDiscount,
  setTotalDue,
}) => {
  const [subTotal, setSubTotalState] = useState(0);
  const [discount, setDiscountState] = useState(0);
  const [totalDue, setTotalDueState] = useState(0);

  // Handle discount input change with validation
  const handleDiscountChange = (e) => {
    let discountValue = parseFloat(e.target.value);

    // If input is empty, set discountValue to 0
    if (isNaN(discountValue)) {
      discountValue = 0;
    }

    // Ensure discount is between 0 and 100
    if (discountValue < 0) discountValue = 0;
    if (discountValue > 100) discountValue = 100;

    setDiscountState(discountValue);
    setDiscount(discountValue);

    // Calculate new total due
    const newTotalDue = subTotal - (subTotal * discountValue) / 100;
    setTotalDueState(newTotalDue);
    setTotalDue(newTotalDue);
  };

  // Calculate subtotal and total due when tableData or discount changes
  useEffect(() => {
    const calculateSubTotal = () => {
      const itemsSubTotal = tableData.reduce(
        (acc, item) => acc + parseFloat(item.amount || 0),
        0
      );
      const newTotalDue = itemsSubTotal - (itemsSubTotal * discount) / 100;
      setSubTotalState(itemsSubTotal);
      setSubTotal(itemsSubTotal);
      setTotalDueState(newTotalDue);
      setTotalDue(newTotalDue);
    };

    calculateSubTotal();
  }, [tableData, discount, setSubTotal, setTotalDue]);

  return (
    <Table className="table table-striped mg-b-0 text-md-nowrap">
      <thead>
        <tr style={{ backgroundColor: "#f46f2a", color: "white" }}>
          <th>Item</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={`${item.id_item}-${index}`}>
            <td>{item.item.label}</td>
            <td>
              {item.qnty} {item.qnty_type}
            </td>
            <td>{parseFloat(item.unit || 0).toFixed(2)}</td>
            <td className="text-end">{parseFloat(item.amount).toFixed(2)}</td>
            <td>
              <Button
                variant=""
                type="button"
                className="btn btn-icon btn-danger me-1 d-none d-sm-flex"
                onClick={() => handleDelete(index)}
              >
                <i className="fe fe-trash"></i>
              </Button>
            </td>
          </tr>
        ))}

        <tr key="sub_total">
          <td colSpan="4" className="text-end tx-20">
            <b>Sub Total (Rs:)</b>
          </td>
          <td className="text-end tx-20">
            <b>{subTotal.toFixed(2)}</b>
          </td>
        </tr>

        <tr key="discount">
          <td colSpan="4" className="text-end tx-20">
            <b>Discount</b>
          </td>
          <td className="text-end tx-20">
            <InputGroup className="input-group">
              <Form.Control
                style={{ textAlign: "right", width: "5px" }}
                className="form-control"
                placeholder="0"
                id="discount"
                name="discount"
                type="number"
                onChange={handleDiscountChange}
                value={discount}
                min="0"
                max="100"
              />
              <div className="input-group-text">
                <label className="ckbox wd-16 mg-b-0">%</label>
              </div>
            </InputGroup>
          </td>
        </tr>

        <tr key="total_due">
          <td colSpan="4" className="text-end tx-20">
            <b>Total Due (Rs:)</b>
          </td>
          <td className="text-end tx-20">
            <b>{totalDue.toFixed(2)}</b>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Savetable;

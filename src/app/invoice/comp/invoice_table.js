import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
} from "react-bootstrap";

const Savetable = ({ tableData, handleDelete }) => {
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const calculateSubTotal = () => {
      const itemsSubTotal = tableData.reduce(
        (acc, item) => acc + parseFloat(item.amount),
        0
      );
      setSubTotal(itemsSubTotal);
    };

    calculateSubTotal();
  }, [tableData]);

  return (
    <>
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
              <td>{item.item["label"]}</td>
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

          <tr key="total_due">
            <td colSpan="4" className="text-end tx-20">
              <b>Total Due (Rs:)</b>
            </td>
            <td className="text-end tx-20">
              <b>{subTotal.toFixed(2)}</b>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Savetable;

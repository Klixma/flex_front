import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button, Form, Modal, Col, Row, Card } from "react-bootstrap";
import apiBaseUrl from "../../../utils/comp/ip";
import ItemShow from "./comp/item_show";
import "mdb-ui-kit/css/mdb.min.css"; // Import MDB CSS


const StoreSearchTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemShow, setItemShow] = useState("");
  const searchInputRef = useRef(null); // Reference for search input
  const tableRef = useRef(null); // Reference for table

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/store/search_store`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setData(response.data);
          setFilteredData(response.data); // Initialize filtered data
          setPageCount(Math.ceil(response.data.length / 10));
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

  function showItemDetails(itemid) {
    setItemShow(<ItemShow itemid={itemid} />);
  }

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredResults = data.filter(
      (item) =>
        item.item_name.toLowerCase().includes(searchTerm) ||
        item.unit_of_measure.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filteredResults);
  };

  return (
    <>
      <Row>
        <Card className="custom-card overflow-hidden">
          <Card.Body>
            <div>
              <h6 className="main-content-label mb-1">Store</h6>
              <p className="text-muted card-sub-title">
                Search, ordering, and paging functionality for the table.
              </p>
            </div>

            {/* Search input field */}
            <Row className="mb-3">
              <Col md="6">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  onChange={handleSearch}
                />
              </Col>
            </Row>

            <Row className="table-responsive">
              <Col md="6">
                <table className="table" ref={tableRef}>
                  <thead className="table-dark">
                    <tr>
                      <th>Item Name</th>
                      <th></th>
                      <th style={{ textAlign: "right" }}>Cost of Unit</th>
                      <th style={{ textAlign: "right" }}>Store Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item) => (
                      <tr
                        key={item.id_item}
                        style={{
                          borderBottom: "1px solid black",
                          height: "30px",
                        }}
                        onClick={() => showItemDetails(item.id_item)}
                      >
                        <td>{item.item_name}</td>
                        <td>
                          <p>1 {item.unit_of_measure} (Rs):</p>
                        </td>
                        <td style={{ textAlign: "right" }}>{item.unit_price}</td>
                        <td style={{ textAlign: "right" }}>
                          <p style={{ padding: 0, margin: 0 }}>
                            {item.qnty} {item.unit_of_measure}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
              <Col md="6">{itemShow}</Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default StoreSearchTable;

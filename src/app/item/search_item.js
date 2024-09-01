import React from "react";
import axios from "axios";
import { Button, Form, Modal, Col, Row, Card } from "react-bootstrap";
import apiBaseUrl from "../../../utils/comp/ip";
import UpdateItem from "./update_item";

const DealerSearchTable = () => {
  const [select, setSelect] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]); // State for filtered data
  const [idItem, setIdItem] = React.useState("ttt");
  const [pageCount, setPageCount] = React.useState(0);

  const handleShowModal = (modal, id_item) => {
    if (modal === "select") {
      setIdItem(id_item);
      setSelect(true);
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
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/store/searchall`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setData(response.data);
          setFilteredData(response.data); // Initialize filtered data
          setPageCount(Math.ceil(response.data.length / 10)); // Assuming 10 items per page
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

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredResults = data.filter(
      (item) =>
        item.item_name.toLowerCase().includes(searchTerm) ||
        item.unit_of_measure.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filteredResults);
  };

  return (
    <>
      <Card className="custom-card overflow-hidden">
        <Card.Body>
          {/* Search input field */}
          <Row className="mb-3">
            <Col md="6">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                onChange={handleSearch}
              />
            </Col>
          </Row>

          {/* Table */}
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>Item Name</th>
                <th>Unit of Measure</th>
                <th>Cost of Unit</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id_item}>
                  <td>{item.item_name}</td>
                  <td>{item.unit_of_measure}</td>
                  <td>{item.unit_price}</td>
                  <td>{item.description}</td>
                  <td>
                    <Button
                      onClick={() => handleShowModal("select", item.id_item)}
                    >
                      <span className="glyphicon glyphicon-th-list"></span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for updating item */}
          <Modal show={select} onHide={() => viewDemoClose("select")}>
            <UpdateItem id_item={idItem} setSelect={setSelect} />
          </Modal>
        </Card.Body>
      </Card>
    </>
  );
};

export default DealerSearchTable;

"use client";
import React, { useState } from "react";
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
import NewItem from "./new_item";
import SearchItem from "./search_item";
import NavigationBar from "../components/Navigation";

function NSU_Item() {
  const [select, setSelect] = React.useState(false);

  const handleShowModal = (modal) => {
    if (modal === "select") {
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

  return (
    <div>
      <NavigationBar/>
      <div className="breadcrumb-header justify-content-between mt-5 pt-3">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Item</span>
        </div>
      </div>

      <Button onClick={() => handleShowModal("select", setSelect)}>
        Create new item
      </Button>

      <Row className=" row-sm">
        <Col lg={12}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">Item Search</h6>
                <p className="text-muted card-sub-title">
                  {/* Searching, ordering and paging goodness will be immediately
                  added to the table, as shown in this example. */}
                </p>
              </div>
              <div className="table-responsive">
                <SearchItem />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={select} onHide={() => viewDemoClose("select")}>
        <NewItem setSelect={setSelect} />
      </Modal>
    </div>
  );
}

export default NSU_Item;

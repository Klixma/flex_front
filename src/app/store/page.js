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
import StoreSearchTable from "./stor_table";
import NavigationBar from "../components/Navigation";

function NSU_Item() {
  const [select, setSelect] = React.useState(false);

  return (
    <div>
      <NavigationBar />
      <div className="breadcrumb-header justify-content-between mt-5 pt-3">
        <div className="left-content">
          {/* <span className="main-content-title mg-b-0 mg-b-lg-1">Item</span> */}
        </div>
      </div>

      <StoreSearchTable />
    </div>
  );
}

export default NSU_Item;

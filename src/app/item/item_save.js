import React, { useState } from "react";
import axios from "axios";
import apiBaseUrl from "../../../utils/comp/ip";
import Swal from "sweetalert2";

async function ItemSave(data, setSelect) {
  const { item_name, unit_of_measure, unit_price, description } = data;

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  try {
    const response = await axios.post(
      `${apiBaseUrl}/store/itemCreate`,
      {
        item_name: item_name,
        unit_of_measure: unit_of_measure,
        unit_price: unit_price,
        description: description,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.status === 200) {
      setSelect(false);
      swalWithBootstrapButtons
        .fire("Item!", "Your new item has been save.", "success")
        .then(() => {
          // window.location.reload(); // Reloads the page after approval
        });
    }
    console.log(response.data);
  } catch (error) {
    if (error.response) {
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);

        if (error.response.status === 500) {
          alert(error.response.data.message);
        }
      } else if (error.request) {
        console.error("No response received. Request:", error.request);
        alert("No response received from the server.");
      } else {
        console.error("Error setting up the request:", error.message);
        alert("Error: " + error.message);
      }

      console.error("Error config:", error.config);
    }
  }
}

export default ItemSave;

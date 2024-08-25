import axios from "axios";
import apiBaseUrl from "../../../utils/comp/ip";
import Swal from "sweetalert2";

async function ItemUpdate(id_item, data, setSelect) {
  const { item_name, unit_of_measure, unit_price, description, active } = data;

  try {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const activeStatus = active ? 1 : 0; // Convert boolean to 1 or 0

    const response = await axios.put(
      `${apiBaseUrl}/store/update_item?id_item=${id_item}`,
      {
        item_name,
        unit_of_measure,
        unit_price,
        description,
        active: activeStatus,
      },
      {
        headers: {
          "Content-Type": "application/json", // Use application/json for PUT requests with JSON body
        },
      }
    );

    if (response.status === 200) {
      setSelect(false);
      swalWithBootstrapButtons
        .fire("Item!", "item has been Update.", "success")
        .then(() => {
          window.location.reload(); // Reloads the page after approval
        });
      // alert(response.data.message);
    } else {
      alert("Failed to update the item.");
    }

    console.log(response.data);
  } catch (error) {
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);

      if (error.response.status === 500) {
        alert(error.response.data.message);
      } else {
        alert(
          `Error: ${error.response.status} - ${error.response.data.message}`
        );
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

export default ItemUpdate;

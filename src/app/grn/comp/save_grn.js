import axios from "axios";
import apiBaseUrl from "../../../../utils/comp/ip";
import Swal from "sweetalert2";

const SaveGRN = async (
  bill_no,
  tableData,
  supplier_name,
  supplier_address,
  supplier_tp,
  payment_methods
) => {
  const user_id = localStorage.getItem("user_id");

  // Transform the tableDataGRN to match the desired structure
  const grnItems = tableData.map((item) => ({
    id_item: item.id_item, // Ensure this is correctly populated
    unit_price: item.unit,
    qnty: parseFloat(item.qnty),
  }));

  const payload = {
    bill_no: bill_no,
    supplier_name: supplier_name,
    address: supplier_address,
    tp_no: supplier_tp,
    id_users: user_id,
    grn_item: grnItems,
    payment_methods: payment_methods,
  };

  // Log the payload to check the structure
  //   console.log("Payload being sent:", JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(
      `${apiBaseUrl}/grn/create`, // Make sure the endpoint is correct
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      Swal.fire({
        title: "Well done!",
        icon: "success",
        allowOutsideClick: false,
        confirmButtonText: "ok",
        cancelButtonColor: "#38cab3",
        text: response.data.message,
      }).then(() => {
        // Redirect to the print page
        // window.location.href = `../search_grn`; // Adjust the redirect URL
      });
    }
  } catch (error) {
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);

      if (error.response.status === 500) {
        Swal.fire({
          title: "Warning!",
          allowOutsideClick: false,
          confirmButtonText: "ok",
          cancelButtonColor: "#38cab3",
          text: error.response.data.message,
        });
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
};

export default SaveGRN;

import axios from "axios";
import apiBaseUrl from "../../../../utils/comp/ip";
import Swal from "sweetalert2";

const SaveInvoice = async (
  id_dealer,
  customer_name,
  customer_address,
  customer_tp,
  note,
  user_id,
  subTotal,
  discount,
  totalDue,
  tableData,
  payment_methods
) => {
  // Transform the tableDataGRN to match the desired structure
  const invoice_item = tableData.map((item) => ({
    id_item: item.id_item, // Ensure this is correctly populated
    unit_price: item.unit,
    qnty: parseFloat(item.qnty),
  }));

  const payload = {
    id_dealer: id_dealer,
    id_branch: "1",
    sub_total: subTotal,
    discount: discount,
    total_due: totalDue,
    notes: note,
    create_user_id: user_id,
    customer_name: customer_name,
    address: customer_address,
    tp: customer_tp,
    invoice_item: invoice_item,
    payment_methods: payment_methods,
  };

  // Log the payload to check the structure
  //   console.log("Payload being sent:", JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(
      `${apiBaseUrl}/invoice/create`, // Make sure the endpoint is correct
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
        window.location.href = `invoice/invoice_search`; // Adjust the redirect URL
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

export default SaveInvoice;

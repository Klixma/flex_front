import axios from "axios";
import apiBaseUrl from "../../../../utils/comp/ip"; // Ensure this is the correct path

export const fetchItems = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${apiBaseUrl}/store/searchall`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data.map((item) => ({
        value: item.id_item,
        label: item.item_name,
      }));
    }
  } catch (error) {
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
  return [];
};

export default fetchItems;

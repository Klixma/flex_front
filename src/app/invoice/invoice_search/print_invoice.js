import React from "react";
import axios from "axios";
import apiBaseUrl from "../../../../utils/comp/ip";

const GRN = ({ id }) => {
  const [grnData, setgrnData] = React.useState(null);
  const maxRows = 15; // Adjust this number based on your paper size and content

  React.useEffect(() => {
    const fetchgrnData = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/invoice/searchbyid?id_invoice=${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setgrnData(response.data);
        } else {
          console.error("Failed to fetch GRN data");
        }
      } catch (error) {
        console.error("Error fetching GRN data:", error);
      }
    };

    fetchgrnData();
  }, [id]);

  if (!grnData) {
    return <div>Loading...</div>;
  }

  const totalRows = grnData[1].length;
  const emptyRowsCount = maxRows - totalRows;

  return (
    <div
      style={{
        width: "95%",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        minHeight: "95vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: "20px",
      }}
    >
      <div>
        {/* Supplier information and GRN details */}
        <div
          style={{
            display: "flex",
            padding: "10px",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p>
              Invoice No: <b>{grnData[0][0]["id_invoice"]}</b>
              <br />
              date_time:{" "}
              <b>{new Date(grnData[0][0]["date_time"]).toLocaleString()}</b>
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p>
              {grnData[0][0]["customer_name"]},
              <br />
              {grnData[0][0]["address"]},
              <br />
              {grnData[0][0]["tp"]}
            </p>
          </div>
        </div>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
          flexGrow: 1,
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid black" }}>
            <th style={{ textAlign: "center" }}>No</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Description</th>
            <th style={{ textAlign: "center", padding: "8px" }}>
              Unit Price (Rs:)
            </th>
            <th style={{ textAlign: "center", padding: "8px" }}>Quantity</th>
            <th style={{ textAlign: "center", padding: "8px" }}>
              Amount (Rs:)
            </th>
          </tr>
        </thead>
        <tbody>
          {grnData[1].map((item, index) => (
            <tr
              key={`${item.id_item}-${index}`}
              style={{ borderBottom: "1px solid black", height: "30px" }}
            >
              <td style={{ textAlign: "center" }}>{index + 1}</td>
              <td style={{ paddingLeft: "8px" }}>{item.item_name}</td>
              <td style={{ textAlign: "right", paddingRight: "8px" }}>
                {item.unit_price}
              </td>
              <td style={{ textAlign: "right", paddingRight: "8px" }}>
                <p>
                  {item.qnty} {item.unit_of_measure}
                </p>
              </td>
              <td
                style={{ textAlign: "right", paddingRight: "8px" }}
                className="text-end"
              >
                {item.total_due ? Number(item.total_due).toFixed(2) : "0.00"}
              </td>
            </tr>
          ))}

          {/* Fill empty space with blank rows */}
          {Array.from({ length: emptyRowsCount }).map((_, i) => (
            <tr
              key={`empty-row-${i}`}
              style={{ borderBottom: "1px solid black", height: "30px" }}
            >
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer with total and signature */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "20px",
        }}
      >
        <div style={{ textAlign: "left" }}>
          <p>
            <span style={{ display: "block", marginBottom: "5px" }}>
              ___________
            </span>
            <span style={{ marginLeft: "10px" }}>Signature</span>
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p>Total: Rs {Number(grnData[0][0]["total_value"]).toFixed(2)}</p>
        </div>
      </div>
      <div>
        {grnData[2].map((item, index) => (
          <p key={`payment-method-${index}`}>
            {item.method} (Rs): {item.price}
          </p>
        ))}
      </div>

      <style jsx>{`
        table,
        th,
        td {
          border: 1px solid black;
        }
      `}</style>
    </div>
  );
};

export default GRN;

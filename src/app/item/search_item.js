import React from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import apiBaseUrl from "../../../utils/comp/ip";
import UpdateItem from "./update_item";

const DealerSearchTable = () => {
  const [select, setSelect] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [idItem, setIdItem] = React.useState("ttt");
  const [pageCount, setPageCount] = React.useState(0);

  // const handleShowModal = (modal, id_item) => {
  //   if (modal === "select") {
  //     setIdItem(id_item);
  //     setSelect(true);
  //   }
  // };

  // const viewDemoClose = (modal) => {
  //   switch (modal) {
  //     case "select":
  //       setSelect(false);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const COLUMNS = [
  //   {
  //     Header: "Item Name",
  //     accessor: "item_name",
  //     className: "wd-30p borderrigth",
  //   },
  //   {
  //     Header: "unit of measure",
  //     accessor: "unit_of_measure",
  //     className: "wd-15p borderrigth",
  //   },
  //   {
  //     Header: "Cost of unit",
  //     accessor: "unit_price",
  //     className: "wd-15p borderrigth",
  //   },
  //   {
  //     Header: "Description",
  //     accessor: "description",
  //     className: "wd-30p borderrigth",
  //   },
  //   {
  //     Header: " ",
  //     Cell: ({ row }) => (
  //       <Button
  //         variant=""
  //         className="icons-list-item"
  //         onClick={() => handleShowModal("select", row.original.id_item)}
  //       >
  //         <i className="zmdi zmdi-more" title="zmdi zmdi-more"></i>
  //       </Button>
  //     ),
  //     className: "wd-2p borderrigth",
  //   },
  // ];

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${apiBaseUrl}/store/searchall`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       if (response.status === 200) {
  //         setData(response.data);
  //         setPageCount(Math.ceil(response.data.length / 10)); // Assuming 10 items per page
  //       } else if (response.status === 401) {
  //         alert(response.data);
  //       }
  //     } catch (error) {
  //       if (error.response && error.response.status === 401) {
  //         alert(error.response.data.message);
  //       } else {
  //         console.error(error);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const tableInstance = useTable(
  //   {
  //     columns: React.useMemo(() => COLUMNS, []),
  //     data,
  //   },
  //   useGlobalFilter,
  //   useSortBy,
  //   usePagination
  // );

  // const {
  //   getTableProps, // table props from react-table
  //   headerGroups, // headerGroups, if your table has groupings
  //   getTableBodyProps, // table body props from react-table
  //   prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  //   state,
  //   setGlobalFilter,
  //   page, // use, page or rows
  //   nextPage,
  //   previousPage,
  //   canNextPage,
  //   canPreviousPage,
  //   pageOptions,
  //   gotoPage,
  //   setPageSize,
  // } = tableInstance;

  // const { globalFilter, pageIndex, pageSize } = state;
  return (
    <>
      {/* <div className="d-flex">
        <select
          className="mb-4 selectpage border me-1"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table {...getTableProps()} className="table table-hover mb-0">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={column.className}
                >
                  <span className="tabletitle">{column.render("Header")}</span>
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i className="fa fa-angle-down"></i>
                      ) : (
                        <i className="fa fa-angle-up"></i>
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    key={cell.column.id}
                    className="borderrigth"
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-block d-sm-flex mt-4 ">
        <span className="">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span className="ms-sm-auto ">
          <Button
            variant=""
            className="btn-default tablebutton me-2 d-sm-inline d-block my-1"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {" Previous "}
          </Button>
          <Button
            variant=""
            className="btn-default tablebutton me-2 my-1"
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            {" << "}
          </Button>
          <Button
            variant=""
            className="btn-default tablebutton me-2 my-1"
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            {" < "}
          </Button>
          <Button
            variant=""
            className="btn-default tablebutton me-2 my-1"
            onClick={nextPage}
            disabled={!canNextPage}
          >
            {" > "}
          </Button>
          <Button
            variant=""
            className="btn-default tablebutton me-2 my-1"
            onClick={nextPage}
            disabled={!canNextPage}
          >
            {" >> "}
          </Button>
          <Button
            variant=""
            className="btn-default tablebutton me-2 d-sm-inline d-block my-1"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {" Next "}
          </Button>
        </span>
      </div>

      <Modal show={select} onHide={() => viewDemoClose("select")}>
        <UpdateItem id_item={idItem} setSelect={setSelect} />
      </Modal> */}
    </>
  );
};
// const GlobalFilter = ({ filter, setFilter }) => {
//   return (
//     <span className="d-flex ms-auto">
//       <Form.Control
//         value={filter || ""}
//         onChange={(e) => setFilter(e.target.value)}
//         className="form-control mb-4"
//         placeholder="Search..."
//       />
//     </span>
//   );
// };

export default DealerSearchTable;

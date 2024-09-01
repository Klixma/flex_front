"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function NavigationBar() {
  const router = useRouter();

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const user_name = localStorage.getItem("user_name");
    if (user_id === null) {
      router.push("/login");
    } else {
      setUserName(user_name);
      setUserId(user_id);
    }
  }, [router]);

  const [userName, setUserName] = React.useState("");
  const [userId, setUserId] = React.useState("");

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <a className="navbar-brand ms-3" href="#home">
          Logo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#basic-navbar-nav"
          aria-controls="basic-navbar-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="basic-navbar-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="../">
                Home
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="basic-nav-dropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Item
              </a>
              <div
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="basic-nav-dropdown"
              >
                <a className="dropdown-item" href="../item">
                  New Item
                </a>
                <a className="dropdown-item" href="../store">
                  Store Balance
                </a>
              </div>
            </li>

            {/* <li className="nav-item">
              <a className="nav-link" href="../grn">
                GRN
              </a>
            </li> */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="basic-nav-dropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                GRN
              </a>
              <div
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="basic-nav-dropdown"
              >
                <a className="dropdown-item" href="../grn">
                  New GRN
                </a>
                <a className="dropdown-item" href="../grn/grn_search">
                  Search GRN
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div className="navbar-nav ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#notification">
                Notification
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#settings">
                Settings
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="basic-nav-dropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {userName || "Username"}
              </a>
              <div
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="basic-nav-dropdown"
              >
                <a className="dropdown-item" href="#profile">
                  User Details
                </a>
                <a className="dropdown-item" href="#settings">
                  User Settings
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/login">
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      {/* <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="position-sticky">
          <div className="list-group">
            <a
              className="list-group-item list-group-item-action active"
              aria-current="page"
            >
              Dashboard
            </a>
            <a className="list-group-item list-group-item-action">Orders</a>
            <a className="list-group-item list-group-item-action">Customers</a>
            <a className="list-group-item list-group-item-action">Products</a>
            <a className="list-group-item list-group-item-action">Reports</a>
            <a className="list-group-item list-group-item-action">
              Integrations
            </a>
          </div>
        </div>
      </nav> */}
    </>
  );
}

export default NavigationBar;

"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function Login() {
  const [emailText, setEmailText] = React.useState([]);
  const [passText, setPassText] = React.useState([]);
  const [passText1, setPassText1] = React.useState([]);
  const [stateA, setStateA] = React.useState([]);
  const router = useRouter();

  const handleEmailChange = (event) => {
    setEmailText(event.target.value);
  };
  const handlePassChange = (event) => {
    setPassText(event.target.value);
  };

  async function singInButton() {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:4000/api/user/login?user_email=${emailText}&password=${passText}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setStateA(response.status);
      if (response.status === 200) {
        localStorage.setItem("user_id", response.data[0].id_users);
        localStorage.setItem("user_name", response.data[0].user_name);

        setPassText1(response.data);
        router.push("/");
      } else if (response.status === 500) {
        setPassText1(response.data);
        alert(error.response.data.message);
      }
    } catch (error) {
      setStateA(error.response.status);
      if (error.response && error.response.status === 500) {
        alert(error.response.data.message);
      } else {
        console.error(error);
      }
    }
  }

  React.useEffect(() => {
    import("./page.module.css");
  }, []);
  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>

            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              {/*<!-- Email input -->*/}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  onChange={handleEmailChange}
                />
                <label className="form-label" htmlFor="form1Example13">
                  Email address
                </label>
              </div>

              {/*<!-- Password input -->*/}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  onChange={handlePassChange}
                />
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
              </div>

              {/*<!-- Submit button -->*/}
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                onClick={singInButton}
              >
                Sign in
              </button>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">
                  {stateA} Klixma{" "}
                  {passText1 && passText1[0]
                    ? stateA == 200
                      ? passText1[0].user_name
                      : "Error"
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;

import React from "react";
import css from "../../css/LoginForm.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../../utils/url";

const LoginForm = ({ parseddata }) => {
  const navigate = useNavigate();
  const { msg } = useParams();
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((result) => {
        if (result.msg === "success") {
          localStorage.setItem("login", result.token);
          navigate("/");
        } else {
          navigate("/login/" + result.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-6 mt-4">
          <form onSubmit={submitHandler}>
            <div className="row border shadow-sm p-3 mt-3">
              <h2 style={{ textAlign: "center" }}>Login Form</h2>
            </div>

            {msg !== "null" && (
              <div className="row border shadow-sm p-3 mt-3">
                <span
                  style={{
                    color: "orange",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {msg}
                </span>
              </div>
            )}

            <div className="row border shadow-sm p-3 mt-3">
              <div className={"col-12 mt-2 " + css["title"]}>
                Email Address
                <span className={css["span"]}> *</span>
              </div>

              <div className="col-12 mt-2">
                <input
                  className={css["input"]}
                  required
                  type="email"
                  id="email"
                  name="email"
                />
              </div>
            </div>

            <div className="row border shadow-sm p-3 mt-3">
              <div className={"col-12 mt-2 " + css["title"]}>
                Password
                <span className={css["span"]}> *</span>
              </div>

              <div className="col-12 mt-2">
                <input
                  className={css["input"]}
                  type="password"
                  id="fname"
                  required
                  name="password"
                />
              </div>
            </div>

            <div className="row border shadow-sm p-3 mt-3">
              <div className="col-12 mt-2">
                <input
                  className={css["input"] + " " + css["submit"]}
                  type="submit"
                  value="Login"
                />
              </div>
            </div>

            <div className="row  p-3 mt-3">
              <div className={"col-7 mt-2 " + css["questioning"]}>
                Don't have an account ?{" "}
                <Link to="/register/null">Register</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const LogInForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();

  const loginHandler = (e) => {
    e.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVfldNn4YD_LsZnwz4Mz0G_Op7o76cgR0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          alert.success("User logged in successfully");
          return res.json();
        } else {
          return res.json().then((data) => {
            alert.error(data.error.message);
            throw new Error("Authentication failed");
          });
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("email", email);
        navigate("/welcome");
      })
      .catch((err) => {
        console.log(err);
      });

    setEmail("");
    setPassword("");
  };

  return (
    <div style={{ height: "83vh" }}>
      <form
        onSubmit={loginHandler}
        className="d-flex flex-column w-25 mx-auto p-5"
      >
        <h3 className="d-flex justify-content-center">Login</h3>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control bg-dark text-white"
            id="formGroupExampleInput"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Passowrd
          </label>
          <input
            type="password"
            className="form-control bg-dark text-white"
            id="formGroupExampleInput2"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <a
          className="d-flex justify-content-center mt-2"
          aria-current="page"
          href="/forgotpassword"
        >
          Forgot Password
        </a>
      </form>
      <a
        className="d-flex justify-content-center nav-link"
        aria-current="page"
        href="/signup"
      >
        Don't have an account? Sign up
      </a>
    </div>
  );
};

export default LogInForm;

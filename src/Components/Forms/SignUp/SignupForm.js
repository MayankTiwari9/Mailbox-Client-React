import React, { useState } from "react";
// import { useAlert } from "react-alert";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const alert = useAlert();

  const signUpHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // alert.error("Password and Confirm Password must be same");
      return;
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVfldNn4YD_LsZnwz4Mz0G_Op7o76cgR0",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("User has successfully signed up");
          // alert.success("User has successfully signed up");
          return;
        } else {
          return res.json().then((data) => {
            // alert.error(data.error.message);
            throw new Error("Authentication Failed");
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div style={{ height: "83vh" }}>
      <form
        onSubmit={signUpHandler}
        className="d-flex flex-column w-25 mx-auto p-5"
      >
        <h3 className="d-flex justify-content-center">SignUp</h3>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
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
            className="form-control"
            id="formGroupExampleInput2"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Confirm Passowrd
          </label>
          <input
            type="password"
            className="form-control"
            id="formGroupExampleInput3"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
      <a
        className="d-flex justify-content-center nav-link"
        aria-current="page"
        href="/login"
      >
        Have an account? LogIn
      </a>
    </div>
  );
};

export default SignupForm;

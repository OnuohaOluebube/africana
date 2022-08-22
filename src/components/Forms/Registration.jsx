import React, { useState, useContext } from "react";
import ImagesContext from "../Common/stateProvider";
import "./Forms.css";
import { Link } from "react-router-dom";
import endPoints from "../services/EndPoints";
import Button from "../Common/button";

const RegForm = () => {
  const context = useContext(ImagesContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(data);
      const res = await endPoints.signup(data);
      console.log(res);
      setEmailSent(true);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  return (
    <div className="form-container">
      <div className="formleft-col">
        <img src="images/Rectangle 1.png" alt="Registration-image" />
      </div>
      <div className="formright-col">
        <h5 className="h5">Africana</h5>
        <br />
        {emailSent && (
          <div>
            <br />
            <br />
            <h2 className="h2">We have sent you an email!</h2>
            <h3 className="h3">Please confirm your account</h3>
          </div>
        )}
        {!emailSent && (
          <form className="form-reg">
            <h2 className="h2">We are happy to meet you!</h2>

            <div className="input-containers">
              <label className="first" for="firstname">
                First name
              </label>

              <input
                className="input"
                type="text"
                name="firstname"
                id="firstname"
                placeholder="first name"
                onChange={handleChange}
              />
            </div>

            <div className="input-containers">
              <label className="label" for="lastname">
                Last Name
              </label>

              <input
                className="input"
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last name"
                onChange={handleChange}
              />
            </div>

            <div className="input-containers">
              <label className="label" for="email">
                Email Address
              </label>

              <input
                className="input"
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                onChange={handleChange}
              />
            </div>

            <div className="input-containers">
              <label className="label" for="password">
                Password
              </label>

              <input
                className="input"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <div className="input-containers">
              <label className="label" for="confirmpassword">
                Confirm Password
              </label>

              <input
                className="input"
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            </div>
            <br />
            <Button
              loading={loading}
              className="button upload-btn"
              onClick={handleSubmit}
              name={"Sign Up  "}
            ></Button>
            <br />
            <p className="text">
              Already have an account?{" "}
              <Link to="/Login" className="underline">
                Login
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegForm;

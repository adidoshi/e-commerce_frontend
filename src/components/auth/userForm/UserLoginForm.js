import React, { useEffect, useState } from "react";
import "./UserForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { CircularProgress, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import TextError from "./TextError";
import { clearErrors, login } from "../../../redux/actions/authAction";
import { errorOptions, successOptions } from "../../utils/ToastStyles";

// Formik
const initialValues = {
  email: "",
  password: "",
};

// test user credentials
const savedData = {
  email: "test@example.com",
  password: "Test@123",
};

// admin credentials
const adminSavedData = {
  email: "admin@example.com",
  password: "Admin@123",
};

// Yup validation
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special character"
    ),
});

const UserLoginForm = () => {
  const [formData, setFormData] = useState(null);
  const [formData2, setFormData2] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const { error, loading, userInfo } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  // Login form submit
  const onSubmit = (values) => {
    dispatch(login(values.email, values.password));
    history.push("/account");
    toast.success("Logged in successfully", successOptions);
  };

  // password show/hide
  const showHidePass = () => {
    setShowPass(!showPass);
  };

  // redirect to account route if user logged in
  useEffect(() => {
    if (error) {
      toast.error(error, errorOptions);
      dispatch(clearErrors());
    }
    if (userInfo) {
      history.push("/account");
    }
  }, [history, userInfo, error, dispatch]);
  return (
    <>
      <div className="main">
        <div className="wrapper">
          {loading && (
            <Box display="flex" justifyContent="center" sx={{ my: 2 }}>
              <CircularProgress color="secondary" />
            </Box>
          )}
          <div className="title-text">Login</div>
          <Formik
            initialValues={formData || formData2 || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize>
            <div className="form-inner">
              <Form className="login">
                <Field
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  id="email"
                  className="inp"
                />
                <ErrorMessage name="email" component={TextError} />
                <div className="pass-box">
                  <Field
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    id="password"
                    className="inp"
                  />
                  <button
                    className="pass-show"
                    type="button"
                    onClick={showHidePass}>
                    {showPass ? <Visibility /> : <VisibilityOff />}
                  </button>
                </div>
                <ErrorMessage name="password" component={TextError} />
                <div className="pass-link">
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>
                <button
                  type="button"
                  className="btnBorder"
                  onClick={() => setFormData(savedData)}>
                  Get test user credentials
                </button>
                <button
                  type="button"
                  className="btnBorder"
                  onClick={() => setFormData2(adminSavedData)}>
                  Get admin credentials
                </button>
                <button
                  className={`btnFilled ${loading ? "btn-disabled" : ""}`}
                  disabled={loading ? true : false}
                  type="submit">
                  Login
                </button>
                <div className="signup-link">
                  Not a member? <Link to="/register">Signup now</Link>
                </div>
              </Form>
            </div>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default UserLoginForm;

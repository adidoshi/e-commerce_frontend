import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Box, CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { errorOptions, successOptions } from "../../utils/ToastStyles";
import { clearErrors, register } from "../../../redux/actions/authAction";

// Formik values
const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// Yup validation
const validationSchema = Yup.object({
  name: Yup.string().required("Required").min(3),
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const UserSignUpForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setConfirmShowPass] = useState(false);

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const history = useHistory();
  const dispatch = useDispatch();

  // password show/hide
  const showHidePass = () => {
    setShowPass(!showPass);
  };

  // confirm pass show/hide
  const showHideConfirmPass = () => {
    setConfirmShowPass(!showConfirmPass);
  };

  // register form submit
  const onSubmit = (values) => {
    dispatch(register(values.name, values.email, values.password));
  };

  // if user registered redirect to account route
  useEffect(() => {
    if (error) {
      toast.error(error, errorOptions);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      toast.success("Registered successfully", successOptions);
      history.push("/account");
    }
  }, [history, isAuthenticated, error, dispatch]);
  return (
    <>
      <Toaster />

      <div className="main">
        <div className="wrapper">
          {loading && (
            <Box display="flex" justifyContent="center" sx={{ my: 2 }}>
              <CircularProgress color="secondary" />
            </Box>
          )}

          <div className="title-text">Signup</div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            <div className="form-inner">
              <Form action="#" className="signup">
                <Field
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  id="name"
                  tabIndex="1"
                  className="inp"
                />
                <ErrorMessage name="name" component={TextError} />

                <Field
                  placeholder="Enter your email"
                  name="email"
                  id="email"
                  className="inp"
                  tabIndex="2"
                  type="text"
                />
                <ErrorMessage name="email" component={TextError} />
                <div className="pass-box">
                  <Field
                    placeholder="Password"
                    name="password"
                    id="password"
                    className="inp"
                    tabIndex="3"
                    type={showPass ? "text" : "password"}
                  />
                  <button
                    className="pass-show"
                    type="button"
                    onClick={showHidePass}>
                    {showPass ? <Visibility /> : <VisibilityOff />}
                  </button>
                </div>
                <ErrorMessage name="password" component={TextError} />
                <div className="pass-box">
                  <Field
                    placeholder="Confirm password"
                    name="confirmPassword"
                    id="confirmPassword"
                    tabIndex="4"
                    className="inp"
                    type={showConfirmPass ? "text" : "password"}
                  />
                  <button
                    className="pass-show"
                    type="button"
                    onClick={showHideConfirmPass}>
                    {showConfirmPass ? <Visibility /> : <VisibilityOff />}
                  </button>
                </div>
                <ErrorMessage name="confirmPassword" component={TextError} />

                <div style={{ marginTop: "12px" }}></div>
                <button
                  className={`btnFilled ${loading ? "btn-disabled" : ""}`}
                  disabled={loading ? true : false}
                  type="submit">
                  Register
                </button>
                <div className="signup-link">
                  Already a member? <Link to="/login">Sign In</Link>
                </div>
              </Form>
            </div>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default UserSignUpForm;

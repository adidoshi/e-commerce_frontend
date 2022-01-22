import React, { useEffect, useState } from "react";
import "./UserForm.css";
import { Box, CircularProgress } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { clearErrors, resetPassword } from "../../../redux/actions/authAction";
import { errorOptions, successOptions } from "../../utils/ToastStyles";
import TextError from "./TextError";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// Formik values
const initialValues = {
  password: "",
  confirmPassword: "",
};

// Yup validation
const validationSchema = Yup.object({
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

const ResetPasswordForm = () => {
  const params = useParams();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setConfirmShowPass] = useState(false);
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  // password show/hide
  const showHidePass = () => {
    setShowPass(!showPass);
  };

  // confirm pass show/hide
  const showHideConfirmPass = () => {
    setConfirmShowPass(!showConfirmPass);
  };

  const onSubmit = (values, { resetForm }) => {
    dispatch(
      resetPassword(params.token, values.password, values.confirmPassword)
    );
    resetForm();
  };

  useEffect(() => {
    if (error) {
      toast.error(error, errorOptions);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success(
        "Password reset success, proceed to login!",
        successOptions
      );
    }
  }, [error, dispatch, success]);
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
          <div className="title-text">Reset Password</div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize>
            <div className="form-inner">
              <Form className="login">
                <div className="pass-box">
                  <Field
                    placeholder="Password"
                    name="password"
                    id="password"
                    className="inp"
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
                <button
                  className={`btnFilled ${loading ? "btn-disabled" : ""}`}
                  disabled={loading ? true : false}
                  type="submit">
                  Change Password
                </button>
                <div className="signup-link">
                  Login now - <Link to="/login">Sign In</Link>
                </div>
              </Form>
            </div>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;

import React, { useEffect } from "react";
import "./UserForm.css";
import { Box, CircularProgress } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { clearErrors, forgotPassword } from "../../../redux/actions/authAction";
import { errorOptions, successOptions } from "../../utils/ToastStyles";
import TextError from "./TextError";
import { Link } from "react-router-dom";

// Formik
const initialValues = {
  email: "",
};

// Yup validation
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
});

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const onSubmit = (values, { resetForm }) => {
    dispatch(forgotPassword(values.email));
    resetForm();
  };

  useEffect(() => {
    if (error) {
      toast.error(error, errorOptions);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message, successOptions);
    }
  }, [error, dispatch, message]);
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
          <div className="title-text">Forgot Password?</div>
          <Formik
            initialValues={initialValues}
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
                <button
                  className={`btnFilled ${loading ? "btn-disabled" : ""}`}
                  disabled={loading ? true : false}
                  type="submit">
                  Send Email
                </button>
                <div className="signup-link">
                  Remember Password? <Link to="/login">Sign In</Link>
                </div>
              </Form>
            </div>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordForm;

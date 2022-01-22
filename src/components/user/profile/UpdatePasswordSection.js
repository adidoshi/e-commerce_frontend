import React, { useEffect, useState } from "react";
import "../../auth/userForm/UserForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Box, CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { errorOptions, successOptions } from "../../utils/ToastStyles";
import { clearErrors, updatePassword } from "../../../redux/actions/userAction";
import TextError from "../../auth/userForm/TextError";

// Formik values
const initialValues = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

// Yup validation
const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Required"),
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

const UpdatePasswordSection = () => {
  const [showOldPass, setShowOldPass] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setConfirmShowPass] = useState(false);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);
  const history = useHistory();
  const dispatch = useDispatch();

  const showHideOldPass = () => {
    setShowOldPass(!showOldPass);
  };

  // password show/hide
  const showHidePass = () => {
    setShowPass(!showPass);
  };

  // confirm pass show/hide
  const showHideConfirmPass = () => {
    setConfirmShowPass(!showConfirmPass);
  };

  // register form submit
  const onSubmit = (values, { resetForm }) => {
    dispatch(
      updatePassword(
        values.oldPassword,
        values.password,
        values.confirmPassword
      )
    );
    resetForm();
  };

  useEffect(() => {
    if (error) {
      toast.error(error, errorOptions);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Password updated successfully", successOptions);
      history.push("/account");
    }
  }, [history, isUpdated, error, dispatch]);
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

          <div className="title-text">Update Password</div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            <div className="form-inner">
              <Form action="#" className="signup">
                <div className="pass-box">
                  <Field
                    placeholder="Old Password"
                    name="oldPassword"
                    id="oldPassword"
                    className="inp"
                    tabIndex="1"
                    type={showOldPass ? "text" : "password"}
                  />
                  <button
                    className="pass-show"
                    type="button"
                    onClick={showHideOldPass}>
                    {showOldPass ? <Visibility /> : <VisibilityOff />}
                  </button>
                </div>
                <ErrorMessage name="oldPassword" component={TextError} />
                <div className="pass-box">
                  <Field
                    placeholder="Password"
                    name="password"
                    id="password"
                    className="inp"
                    tabIndex="2"
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
                    tabIndex="3"
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
                  Update
                </button>
              </Form>
            </div>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default UpdatePasswordSection;

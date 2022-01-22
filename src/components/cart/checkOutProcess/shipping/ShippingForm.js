import React, { useState } from "react";
import "../../../auth/userForm/UserForm.css";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "yup-phone";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { State } from "country-state-city";
import { useHistory } from "react-router-dom";
import { saveShippingInfo } from "../../../../redux/actions/cartAction";
import CheckoutSteps from "../checkoutSteps/CheckOutSteps";
import TextError from "../../../auth/userForm/TextError";
import { Toaster } from "react-hot-toast";
// import { Box, CircularProgress } from "@material-ui/core";

const ShippingForm = () => {
  const [formData, setFormData] = useState(null);

  // const { shippingInfo } = useSelector((state) => state.cart);
  // test user credentials
  const savedData = {
    address: "Electronics City",
    city: "Bangalore",
    pinCode: 560100,
    phoneNo: 9898989898,
    country: "IN",
    // state: "Karnataka",
  };

  // const savedData = {
  //   address: shippingInfo.address,
  //   city: shippingInfo.city,
  //   state: shippingInfo.state,
  //   country: shippingInfo.country,
  //   pinCode: shippingInfo.pinCode,
  //   phoneNo: shippingInfo.phoneNo,
  // };
  const initialValues = {
    address: "",
    city: "",
    pinCode: "",
    phoneNo: "",
    country: "",
    state: "",
  };

  // Yup validation
  const validationSchema = Yup.object({
    address: Yup.string().required("Required").min(5),
    city: Yup.string().required("Required"),
    pinCode: Yup.number()
      .typeError("pin code must be a number")
      .required("Required"),
    phoneNo: Yup.string()
      .required("Required")
      .phone("IN", true, "Phone number not valid, 10 digits required"),
    country: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(
      saveShippingInfo({
        address: values.address,
        city: values.city,
        pinCode: values.pinCode,
        phoneNo: values.phoneNo,
        country: values.country,
        state: values.state,
      })
    );
    history.push("/order/confirm");
  };

  return (
    <>
      <CheckoutSteps activeStep={0} />
      <Toaster />
      <div className="main">
        <div className="wrapper">
          <div className="title-text">Fill Shipping Details</div>
          <Formik
            initialValues={formData || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize>
            <div className="form-inner">
              <Form action="#" className="signup">
                <div className="pass-box">
                  <Field
                    placeholder="Enter your address"
                    name="address"
                    id="address"
                    className="inp"
                    type="text"
                    tabIndex="1"
                  />
                  <button className="pass-show" type="button">
                    <HomeIcon />
                  </button>
                </div>
                <ErrorMessage name="address" component={TextError} />
                <div className="pass-box">
                  <Field
                    placeholder="Enter your city"
                    name="city"
                    id="city"
                    className="inp"
                    type="text"
                    tabIndex="2"
                  />
                  <button className="pass-show" type="button">
                    <LocationCityIcon />
                  </button>
                </div>
                <ErrorMessage name="city" component={TextError} />
                <div className="pass-box">
                  <Field
                    placeholder="Enter your pin code"
                    name="pinCode"
                    id="pinCode"
                    className="inp"
                    type="text"
                    tabIndex="3"
                  />
                  <button className="pass-show" type="button">
                    <PinDropIcon />
                  </button>
                </div>
                <ErrorMessage name="pinCode" component={TextError} />
                <div className="pass-box">
                  <Field
                    placeholder="Enter your phone number"
                    name="phoneNo"
                    id="phoneNo"
                    className="inp"
                    type="text"
                    tabIndex="4"
                  />
                  <button className="pass-show" type="button">
                    <PhoneIcon />
                  </button>
                </div>
                <ErrorMessage name="phoneNo" component={TextError} />
                <div className="pass-box">
                  <Field
                    style={{ cursor: "pointer" }}
                    as="select"
                    className="inp"
                    tabIndex="5"
                    id="country"
                    name="country">
                    <option>Country</option>
                    <option key="IN" value="IN">
                      IN
                    </option>
                  </Field>

                  <button className="pass-show" type="button">
                    <PublicIcon />
                  </button>
                </div>
                <ErrorMessage name="country" component={TextError} />
                <div className="pass-box">
                  <Field
                    id="state"
                    name="state"
                    as="select"
                    tabIndex="6"
                    className="inp"
                    style={{ cursor: "pointer" }}>
                    <option>State</option>
                    {State.getStatesOfCountry("IN").map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <button className="pass-show" type="button">
                    <TransferWithinAStationIcon />
                  </button>
                </div>
                <ErrorMessage name="state" component={TextError} />
                <button
                  type="button"
                  className="btnBorder"
                  onClick={() => setFormData(savedData)}>
                  Get test shipping details
                </button>
                <button className="btnFilled" type="submit">
                  Proceed
                </button>
              </Form>
            </div>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ShippingForm;

import React from "react";
import { Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import "./CheckOutSteps.css";
import {
  AccountBalance,
  LibraryAddCheck,
  LocalShipping,
} from "@material-ui/icons";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShipping />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheck />,
    },
    { label: <Typography>Payment</Typography>, icon: <AccountBalance /> },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };
  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => {
          return (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}>
              <StepLabel
                style={{
                  color:
                    activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                }}
                icon={item.icon}>
                {item.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;

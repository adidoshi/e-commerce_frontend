import React from "react";
import profileImg from "../../../../assets/images/profileImg.png";
import { Rating } from "@material-ui/lab";
import "./ReviewCard.css";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      <div className="reviewCard">
        <img src={profileImg} alt="user" />
        <p>{review.name}</p>
        <Rating {...options} />
        <span>{review.comment}</span>
      </div>
    </>
  );
};

export default ReviewCard;

import { FormatQuote, Star, StarHalf, StarOutline } from "@material-ui/icons";
import React from "react";
import user1 from "../../../../assets/images/user-1.png";
import user2 from "../../../../assets/images/user-2.png";
import user3 from "../../../../assets/images/user-3.png";
import "./Testimonial.css";

const cutomerComments = [
  {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta consequatur blanditiis",
    name: "Sean Parker",
    img: user1,
  },
  {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta consequatur blanditiis",
    name: "Sean Parker",
    img: user2,
  },
  {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta consequatur blanditiis",
    name: "Sean Parker",
    img: user3,
  },
];

const Testimonial = () => {
  return (
    <>
      <div className="testimonial">
        <div className="small-container">
          <div className="row">
            {cutomerComments.map((elem, i) => (
              <div className="col-3" key={i}>
                <FormatQuote fontSize="large" style={{ color: "tomato" }} />
                <p>{elem.content}</p>
                <div className="rating">
                  <Star />
                  <Star />
                  <Star />
                  <StarHalf />
                  <StarOutline />
                </div>
                <img src={elem.img} alt="..." />
                <h3>{elem.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;

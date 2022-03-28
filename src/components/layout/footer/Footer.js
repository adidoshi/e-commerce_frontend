import React from "react";
import "./Footer.css";
import mylogo2 from "../../../assets/images/mylogo2.png";
import playStore from "../../../assets/images/play-store.png";
import appStore from "../../../assets/images/app-store.png";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col-1">
              <h3>Download our App</h3>
              <p>Download App for android and ios mobile phone.</p>
              <div className="app-logo">
                <img src={playStore} alt="..." />
                <img src={appStore} alt="..." />
              </div>
            </div>
            <div className="footer-col-2">
              <img src={mylogo2} alt="..." />
              <p>
                Our purpose is to sustainably make the pleasure and benfits of
                Sports Accessible to the many.
              </p>
            </div>
            <div className="footer-col-3">
              <h3>Links</h3>
              <ul>
                <li>
                  <a
                    href="https://adityadoshi.netlify.app/"
                    rel="noreferrer"
                    target="_blank"
                    no>
                    Portfolio
                  </a>
                </li>

                <li>
                  <a
                    href="https://dev.to/adidoshi"
                    rel="noreferrer"
                    target="_blank"
                    no>
                    Dev blog
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col-4">
              <h3>Socials</h3>
              <ul>
                <li>
                  <a
                    href="https://github.com/adidoshi"
                    rel="noreferrer"
                    target="_blank"
                    no>
                    Github
                  </a>
                </li>
                <a
                  href="https://twitter.com/adidoshi08"
                  rel="noreferrer"
                  target="_blank"
                  no>
                  Twitter
                </a>
              </ul>
            </div>
          </div>
          <hr />
          <p className="copyright">Copyright 2021 &copy; Aditya Doshi</p>
        </div>
      </div>
    </>
  );
};

export default Footer;

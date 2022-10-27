import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer-area footer-design-1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
              <div className="footer-wrap">
                <div className="row justify-content-between gy-5">
                  <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div className="single-widget">
                      <div className="footer-title">
                        <h3>About me</h3>
                      </div>
                      <div className="footerabout-content">
                        <p>
                        qlibrary management website 2022
                        </p>
                      </div>
                      <div className="footer-address">
                        <ul>
                          <li>
                            <i className="las la-phone-volume"></i>
                            <span>
                              <Link to="/">+1234 5678 9123</Link>
                              <br />
                              <Link to="/">+1234 5678 9123</Link>
                            </span>
                          </li>
                          <li>
                            <i className="lar la-envelope"></i>
                            <span>
                              <Link to="/">Group2@.com</Link>
                              <br />
                              <Link to="/">hutech@.com</Link>
                            </span>
                          </li>
                          <li>
                            <i className="las la-map-marker"></i>
                            <span>
                              VietName <br />
                              HCM{" "}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="single-widget text-lg-center">
                      <div className="footer-logo">
                        <Link to="/">
                          <img src="" alt="" />
                        </Link>
                      </div>
                      <div className="form-design form-design-1"></div>
                      <div className="footer-social pt-50">
                        <ul>
                          <li>
                            <Link to="/">
                              <i className="fab fa-facebook-f"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-instagram"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-linkedin-in"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-pinterest-p"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-twitter"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-12">
                    <div className="single-widget">
                      <div className="footer-title">
                        <h3>Group2</h3>
                      </div>
                      <div className="footer-link">
                        <ul>
                          <li>
                            <Link to="/">Privacy Policy</Link>
                          </li>
                          <li>
                            <Link to="/">Returns</Link>
                          </li>
                          <li>
                            <Link to="/">Terms & Conditions</Link>
                          </li>
                          <li>
                            <Link to="/">Our Support</Link>
                          </li>
                          <li>
                            <Link to="/">Terms & Service</Link>
                          </li>
                          <li>
                            <Link to="/">Checkout</Link>
                          </li>
                          <li>
                            <Link to="/">Other Issues</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 copy-right-section align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 text-lg-start text-center">
              <div className="copy-right-area">
                <p className="copy-text">
                  Copyright 2022 Group2 | Design By
                  <Link to="/">Group2-hutech</Link>
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="footer-card-support text-lg-end text-center"></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

import React, { forwardRef } from "react";
import ContactFormThree from "../ContactFormThree";


const ContactApp = (props, ref) => {
  <>
    <section className="contact-us white-bg" id="contact" >
      <div className="container">
        <div className="row">
          <div className="col-sm-6 section-heading">
            <h2 className="font-700">
              Ask us anything and we'll get back soon in a day
            </h2>
          </div>
        </div>
        <div className="row mt-50">
          <div className="col-md-8 offset-md-2">
            <ContactFormThree />
          </div>
        </div>
      </div>
    </section>
    <section className="p-0">
      <div className="container-fluid">
        <div className="row row-flex">
          <div className="col-md-4">
            <div className="col-inner spacer dark-bg">
              <div className="text-center white-color">
                <i className="icofont-google-map font-50px white-icon"></i>
                <h2>Office Address</h2>
                <p>
                  The PATH Toronto, <br />
                  ON M5B 2H1, Canada
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="col-inner spacer gradient-bg">
              <div className="text-center white-color">
                <i className="icofont-email font-50px white-icon"></i>
                <h2>Email Us</h2>
                <p className="mb-0">hello@scoda.com</p>
                <p>jobs@scoda.com</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="col-inner spacer dark-bg">
              <div className="text-center white-color">
                <i className={"icofont-google-iphone font-50px white-icon"} />
                <h2>Call Us</h2>
                <p className="mb-0">(+1) 613 555-0105</p>
                <p>(+1) 613 555-0105</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  </>
}

export default ContactApp;

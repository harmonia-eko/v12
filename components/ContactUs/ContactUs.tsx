import React, { forwardRef } from "react";
import ContactForm from "./ContactForm";
import Map from "../Maps/Map";

const ContactUs = (props, ref) => {
  <section className="contact-us white-bg" id="contact" >
    <div className="container">
      <div className="clearfix">
        <div className="bg-flex-right col-md-6 map-section">
          <Map classAppend={undefined} />
        </div>
        <div className="col-about-left col-md-6 text-left">
          <ContactForm title="Contact Us" tagline="Stay in Touch" />
        </div>
      </div>
    </div>
  </section>
}

export default ContactUs;

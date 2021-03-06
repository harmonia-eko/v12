import React, { useState } from "react";

const ContactFormFour = () => {
  const [inputs, setInputs] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <form
      name="contact-form"
      id="contact-form"
      action="php/contact.php"
      method="POST"
      className="contact-me"
    >
      <div className="messages"></div>
      <div
        className="row"
        data-aos={"fade-up"}
        data-aos-delay={100}
        data-aos-duration={700}
      >
        <div className="col-md-6 col-sm-6">
          <div className="form-floating">
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              required={true}
              placeholder="Your Name"
              data-error="Your Name is Required"
              value={inputs.name}
              onChange={handleInputChange}
            />
            <label htmlFor="name">Name</label>
            <div className="help-block with-errors mt-20"></div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="form-floating">
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="Your Email"
              required={true}
              data-error="Please Enter Valid Email"
              value={inputs.email}
              onChange={handleInputChange}
            />
            <label htmlFor="email">Email</label>
            <div className="help-block with-errors mt-20"></div>
          </div>
        </div>
      </div>
      <div
        className="form-floating"
        data-aos={"fade-up"}
        data-aos-delay={100}
        data-aos-duration={700}
      >
        <textarea
          name="message"
          className="form-control"
          id="message"
          rows={7}
          placeholder="Your Message"
          required
          data-error="Please, Leave us a message"
          value={inputs.message}
          onChange={handleInputChange}
        ></textarea>
        <label htmlFor="message">Message</label>
        <div className="help-block with-errors mt-20"></div>
      </div>
      <div className="text-center">
        <button
          type="submit"
          name="submit"
          className="btn btn-red btn-square"
          data-aos={"fade-up"}
          data-aos-delay={100}
          data-aos-duration={700}
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactFormFour;

import React from "react";
import dataServices from "../../data/Services/services-seo-data.json";


const WhoWeAreFive = () => (
  <section>
    <div className="container">
      <div className="row">
        {dataServices.map((service, i) => (
          <div
            className="col-md-3 feature-box text-center col-sm-6"
            data-aos={"zoom-in"}
            data-aos-delay={`${i}00`}
            data-aos-duration={700}
          >
            <i

              className={
                ` font-40px light-icon circle-icon fade-icon ${service.classes} icofont-${service.icon}`
              }
            />
            <h4 className="upper-case">{service.title}</h4>
            <p>{service.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhoWeAreFive;

import React from "react";
import dataSocial from "../data/social-footer.json";
import Icofont from "react-icofont";

const FooterCopyright = () => (
  <div className="footer-copyright">
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-xs-12">
          <p className="social-media">
            {dataSocial.filter((v,i) => i < 5).map((item) => (
              <p key={item.id}>
                <a href={item.link}>
                  <Icofont icon={item.icon} />
                </a>
              </p>
            ))}
          </p>
        </div>
        <div className="col-md-6 col-xs-12">
          <div className="copy-right text-right">
            © 2021 harmonia-eko<br/> All rights reserved
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FooterCopyright;

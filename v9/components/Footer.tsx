import React from "react";
import logoFooter from "../images/D21.png";
import FooterCopyright from "./FooterCopyright";

const FooterOne = () => (
  <>
    <footer className="footer" id="footer-fixed" style={{maxHeight:'30px'}}>
      <div className="footer-main">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="widget widget-text">
                <div className="logo logo-footer">
                  <a href={`${process.env.PUBLIC_URL}/`}>
                    <img className="logo logo-display"src={logoFooter}alt=""height='100px' />
                      </a>
                      
                      
                      </div>
                  
                </div>
               
              </div>
            <div className="col-sm-6 col-md-4">
              <div className="widget widget-text widget-links">
                <h5 className="widget-title">Contact Us</h5>
                  
                  <li>
                    <i className="icofont icofont-iphone"></i>
                    <a href="tel:0033970406998">+33 970 406 698 </a>
                  </li>
                  <li>
                    <i className="icofont icofont-mail"></i>
                    <a href="contact@harmonia-eko.ooo">
                      contact@harmonia-eko.ooo
                    </a>
                  </li>
                  
                
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
               <FooterCopyright />
            </div>
          </div>
        
      </div>
     </div>
    </footer>
    <div className="footer-height" style={{ height: "463px" }}></div>
  </>
);

export default FooterOne;

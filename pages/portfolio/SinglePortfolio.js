import React from "react";
import Swiper from "react-id-swiper";
import dataSocial from "../../data/Social/social-footer.json";
import Loader from "../../components/Loader/Loader";
import HeaderOne from "../../components/Header/HeaderOne";
import PageTitlePortfolio from "../../components/PageTitle/PageTitlePortfolio";
const img1 = "/images/portfolio/single-portfolio-1.jpg";
const img2 = "/images/portfolio/single-portfolio-2.jpg";
const img3 = "/images/portfolio/single-portfolio-3.jpg";

import CTAOne from "../../components/CTA/CTAOne";
import FooterOne from "../../components/Footer/FooterOne";

const SinglePortfolio = () => {
  const params = {
    navigation: {
      nextEl: ".portfolio-slider-next",
      prevEl: ".portfolio-slider-prev",
    },
    effect: "fade",
    autoplay: {
      delay: 2500,
    },
  };

  return (
    <Loader>
      <HeaderOne type={undefined} />
      <PageTitlePortfolio title="Single Portfolio" tagline={undefined} />
      <section className="pt-100 pt-100">
        <div className="container">
          <div className="row">
            <div className="col-md-9 portfolio-left">
              <div className="portfolio-slider">
                <Swiper {...params}>
                  <div className="item">
                    <img className="img-fluid" src={img1} alt="" />
                  </div>
                  <div className="item">
                    <img className="img-fluid" src={img2} alt="" />
                  </div>
                  <div className="item">
                    <img className="img-fluid" src={img3} alt="" />
                  </div>
                </Swiper>
              </div>
              <h3>Project Details</h3>
              <p className="mt-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sem
                risus, ullamcorper et cursus at, euismod fringilla nulla.
                Phasellus finibus vel ex quis blandit. Phasellus consequat nunc
                non laoreet sollicitudin. Praesent nec tincidunt erat. Ut
                lobortis interdum turpis. Mauris et pretium ex, in hendrerit
                felis. Integer vehicula ante eu mi luctus, vitae dictum ante
                pellentesque. Aliquam erat volutpat. Donec vitae turpis semper,
                lacinia est ut, dapibus justo.
              </p>
              <p className="mt-50">
                <a
                  href={process.env.PUBLIC_URL}
                  className="btn btn-color btn-rounded"
                >
                  Start a Project
                </a>
              </p>
            </div>
            <div className="col-md-3 portfolio-right">
              <ul className="project-detail-box">
                <li>
                  <strong>Customer</strong>Alex John
                </li>
                <li>
                  <strong>Date</strong>18 Feb 2020
                </li>
                <li>
                  <strong>Website URL</strong>
                  <a href={process.env.PUBLIC_URL}>www.yourdomain.com</a>
                </li>
              </ul>
              <ul className="project-type-list">
                <li>
                  <i className="icofont-diamond"></i> Design
                </li>
                <li>
                  <i className="icofont-light-bulb"></i>
                  Development
                </li>
                <li>
                  <i className="icofont-layers"></i>
                  Apps
                </li>
              </ul>
              <div className="post-controls">
                <div className="post-share">
                  <ul>
                    {dataSocial
                      .filter((social) => social.portfolio === 1)
                      .map((social) => (
                        <li key={social.id}>
                          <a href={process.env.PUBLIC_URL}>
                            <i className={`icofont-${social.icon}`}></i>
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <p className="mt-30">
                Quisque vel massa a neque fermentum aliquet. Ut vel ligula
                gravida, molestie mi sed, venenatis augue. Praesent sollicitudin
                sit amet ex sed ultrices. Curabitur lacinia non leo at dictum.
                Proin lacinia eros scelerisque nisi tempus, nec elementum lacus
                lacinia. Aenean quis ipsum nec purus rutrum faucibus. Quisque
                facilisis efficitur odio id porttitor.
              </p>
            </div>
          </div>
        </div>
      </section>
      <CTAOne
        tagline="careers"
        title="Let's write your story, together."
        textButton="Contact us"
        textLink="!#"
        bg="color"
      >
        We do not tell you our story. We write it together. Partnering with us
        means a seat at the table where you will be heard.
      </CTAOne>
      <FooterOne />
    </Loader >
  );
};

export default SinglePortfolio;

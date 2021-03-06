import React from "react";

import dataPortfolio from "../../data/Portfolio/portfolio-photography-data.json";

const PortfolioPhotography = () => (
  <section className="dark-bg pb-0 pt-0">
    <div className="container-fluid">
      <div className="row">
        <div className="portfolio-container text-center">
          <ul id="portfolio-grid" className="four-column hover-two">
            {dataPortfolio.map((item) => (
              <li
                className="portfolio-item portfolio-masonry-item"
                key={item.id}
              >
                <div className="portfolio">
                  <div className="product-wrap">
                    <img
                      src={"../../public/assets/images/" + item.image}
                      alt=""
                    />
                    <div className="product-caption">
                      <div className="product-description text-center">
                        <div className="product-description-wrap">
                          <div className="product-title">
                            <a href={item.link} className="alpha-lightbox">
                              <i className="icofont-plus font-40px"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section >
);

export default PortfolioPhotography;

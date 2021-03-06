import React, { useState, useEffect, useCallback } from "react";
import Scrollspy from "react-scrollspy";

import dataNav from "../../data/Navbar/nav-creativeone-data.json";
import AttributeNav from "../Navs/AttributeNav";
import SocialNav from "../Navs/SocialNav";
import MainLogo from "../MainLogo";
import Link from "next/link";

const HeaderTwo = ({ social, scrollToSection }) => {
  const [fixed, setFixed] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const showMenu = () => {
    setCollapse(!collapse);
    const menu = document.getElementById("navbar-menu");
    collapse ? menu.classList.remove("in") : menu.classList.add("in");
  };

  const handleScroll = useCallback(() => {
    if (window.pageYOffset > 34) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <nav
        className={
          "navbar-scrollspy navbar navbar-light navbar-expand-lg navbar-fixed white bootsnav on no-full " +
          (fixed ? "" : "navbar-transparent")
        }
        data-minus-value-desktop="70"
        data-minus-value-mobile="55"
        data-speed="1000"
      >
        <div className="container">
          <button
            type="button"
            className={"navbar-toggler " + (collapse ? "collapsed" : "")}
            data-toggle="dropdown"
            data-target="#navbar-menu"
            onClick={showMenu}
          >
            <i className="icofont-navigation-menu"></i>
          </button>
          <MainLogo showMenu={showMenu} collapse={null} />
          <div className="collapse navbar-collapse" id="navbar-menu">
            <Scrollspy
              items={[
                "home",
                "about",
                "service",
                "team",
                "work",
                "pricing",
                "contact",
              ]}
              currentClassName="active"
              className="nav navbar-nav navbar-right nav-scrollspy-onepage"
              data-in="fadeInLeft"
            >
              {dataNav.map((item) => (
                <li className="scroll navbar-item" key={item.id}>
                  <Link

                    href={item.link}

                  ><a onClick={(e) => scrollToSection(e, item.link)} className="nav-link">
                      {item.title}</a>
                  </Link>
                </li>
              ))}
            </Scrollspy>
          </div>
          <AttributeNav>
            <SocialNav items={social} />
          </AttributeNav>
        </div>
      </nav>
    </>
  );
};

export default HeaderTwo;

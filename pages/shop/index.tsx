import React from "react";
import Loader from "../../components/Loader/Loader";
import HeaderOne from "../../components/Header/HeaderOne";
import PageTitleShop from "../../components/PageTitle/PageTitleShop";
import ShopContent from "../../components/Shop/ShopContent";
import FooterOne from "../../components/Footer/FooterOne";

const ShopMasonry = () => (
  <Loader>
    <HeaderOne type={undefined} />
    <PageTitleShop title="Projects" tagline={undefined} />
    <ShopContent layout="masonry" pagination={undefined} />
    <FooterOne />
  </Loader>
);

export default ShopMasonry;

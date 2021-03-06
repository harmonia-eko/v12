import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader/Loader";
import HeaderOne from "../../components/Header/HeaderOne";
import PageTitleWidget from "../../components/PageTitle/PageTitleWidget";
import PriceTablesTwo from "../../components/PriceTables/PriceTablesTwo";
import FooterOne from "../../components/Footer/FooterOne";

const PricingTables = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <Loader>
      <HeaderOne type={undefined} />
      <PageTitleWidget title="Pricing Tables" />
      <PriceTablesTwo
        title="PRICING DEFAULT"
        tagline="Choose your plan"
        btnType="circle"
        classes="pb-0" tableType={undefined} children={undefined} />
      <PriceTablesTwo
        title="PRICING ROUNDED"
        tagline="Choose your plan"
        btnType="circle"
        tableType="rounded" classes={undefined} children={undefined} />
      <FooterOne />
    </Loader>
  );
};

export default PricingTables;

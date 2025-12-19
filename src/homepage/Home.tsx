import IphoneHomepage from "./iphone-homepage/iphoneHomepage";
import OppoHomepage from "./oppo-homepage/oppoHomepage";
import XiaomiHomepage from "./xiaomi-homepage/xiaomiHomepage";
import styles from "./Home.module.css";
import React from "react";
import Footer from "@/component/footer/Footer";

export default function Homepage() {
  return (
    <div className={styles.homePage}>
      <IphoneHomepage />
      <OppoHomepage />
      <XiaomiHomepage />
      <Footer />
    </div>
  );
}

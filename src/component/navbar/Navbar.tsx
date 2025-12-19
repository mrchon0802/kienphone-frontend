"use client";

import React from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import logo from "../../../public/logo/logo1.png";

export default function Navbar() {
  const logoImg = logo;
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Image src={logo} alt="" height={60} width={60} />
      </div>{" "}
    </div>
  );
}

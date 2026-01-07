"use client";

import React from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import logo from "../../../public/logo/logo1.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src={logo} alt="Trang chủ" width={60} height={60} priority />
        </Link>
      </div>
    </div>
  );
}

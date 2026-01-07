"use client";

import React from "react";
import styles from "./Price.module.css";
import { VariantOption } from "./type/productType";

interface PriceProps {
  variant?: VariantOption;
  buttonText?: string;
  showButton?: boolean;
  onButtonClick?: () => void;
}

export default function Price({
  variant,
  buttonText = "Mua ngay",
  showButton = true,
  onButtonClick,
}: PriceProps) {
  if (!variant) {
    return (
      <div className={styles.priceContainer}>
        <div className={styles.currentPrice}>Vui lòng chọn phiên bản</div>
      </div>
    );
  }

  const { price, discountedPrice } = variant;

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);

  const hasDiscount = discountedPrice < price;
  const discountPercentage = hasDiscount
    ? Math.round((1 - discountedPrice / price) * 100)
    : 0;

  return (
    <div className={styles.priceContainer}>
      <div className={styles.priceContent}>
        {/* Giá hiện tại */}
        <div className={styles.currentPrice}>
          {formatPrice(discountedPrice)}
        </div>

        {/* Giá gốc */}
        {hasDiscount && (
          <div className={styles.originalPriceContainer}>
            <span className={styles.originalPrice}>{formatPrice(price)}</span>
            {discountPercentage > 0 && (
              <span className={styles.discountPercent}>
                -{discountPercentage}%
              </span>
            )}
          </div>
        )}
      </div>

      {/* Nút mua */}
      {showButton && (
        <button className={styles.buyButton} onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
}

"use client";

import React from "react";
import styles from "./Price.module.css";
import { VariantOption } from "./type/productType";
import { Truck } from "lucide-react";

interface PriceProps {
  variant?: VariantOption;
  buttonText?: string;
  showButton?: boolean;
  onButtonClick?: () => void;
  productName: string | null;
  variants: VariantOption[];
}

export default function Price({
  variant,
  buttonText = "Mua ngay",
  showButton = true,
  onButtonClick,
  productName,
  variants,
}: PriceProps) {
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);

  const minVariantPrice = React.useMemo(() => {
    if (!variants || variants.length === 0) return 0;

    return Math.min(...variants.map((v) => v.discountedPrice ?? v.price));
  }, [variants]);

  const hasVariant = Boolean(variant);
  const price = variant?.price ?? 0;
  const discountedPrice = variant?.discountedPrice ?? 0;

  const displayPrice = hasVariant
    ? variant!.discountedPrice ?? variant!.price
    : minVariantPrice;

  const hasDiscount = hasVariant && discountedPrice < price;
  const discountPercentage = hasDiscount
    ? Math.round((1 - discountedPrice / price) * 100)
    : 0;

  return (
    <div className={styles.priceContainer}>
      {/* top */}
      <div className={styles.priceInfo}>
        {productName && (
          <div className={styles.productName}>
            <strong>{productName}</strong>
          </div>
        )}

        {hasVariant ? (
          <div className={styles.priceContent}>
            <div className={styles.currentPrice}>
              {formatPrice(discountedPrice)}
            </div>

            {hasDiscount && (
              <div className={styles.originalPriceContainer}>
                <span className={styles.originalPrice}>
                  {formatPrice(price)}
                </span>
                <span className={styles.discountPercent}>
                  {" "}
                  Tiết kiệm {discountPercentage}%
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.currentPrice}>
            Chỉ từ {formatPrice(displayPrice)}
          </div>
        )}
      </div>

      {/* bottom */}
      <div className={styles.priceAction}>
        <div className={styles.shipping}>
          <Truck size={22} />

          <strong>Free Shipping</strong>
        </div>
        <div className={styles.divider} />
        <div>
          {" "}
          {showButton && (
            <button
              className={styles.buyButton}
              disabled={!hasVariant}
              onClick={onButtonClick}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

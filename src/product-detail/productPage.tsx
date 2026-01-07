"use client";

import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import styles from "./productDetail.module.css";
import Price from "./Price";
import ColorOption from "./ColorOption";
import VariantOption from "./VariantOption";
import { ProductType } from "./type/productType";

type Props = {
  product: ProductType;
};

export default function ProductPage({ product }: Props) {
  /* =======================
     UI STATE
  ======================== */
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeVariant, setActiveVariant] = useState<string | null>(null);
  const [hoverColor, setHoverColor] = useState<string | null>(null);

  /* =======================
     DERIVED DATA
  ======================== */

  // derive image từ product + activeColor
  //set anh
  const currentImage = useMemo(() => {
    if (!activeColor) return product.image;

    return (
      product.option.color.find((c) => c.name === activeColor)?.image ??
      product.image
    );
  }, [product, activeColor]);

  //set variant
  const selectedVariant = useMemo(() => {
    if (!product || !activeColor || !activeVariant) return undefined;

    return product.variant.find(
      (v) => v.color === activeColor && v.storage === activeVariant
    );
  }, [product, activeColor, activeVariant]);

  /* =======================
     HANDLER
  ======================== */
  //chon mau
  const handleSelectColor = useCallback((colorName: string) => {
    setActiveColor(colorName);
    setActiveVariant(null); // reset variant khi đổi màu
  }, []);

  //chon variant
  const handleSelectVariant = useCallback((variantValue: string) => {
    setActiveVariant(variantValue);
  }, []);

  return (
    <div className={styles.productContainer}>
      {/* IMAGE */}
      <div className={styles.productImage}>
        <div className={styles.imageWrapper}>
          {currentImage && (
            <Image
              src={currentImage}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "contain" }}
            />
          )}
        </div>
      </div>

      {/* INFO */}
      <div className={styles.productInfo}>
        <h1 className={styles.title}>{product.title}</h1>

        <ColorOption
          colors={product.option.color}
          activeColor={activeColor}
          onSelectColor={handleSelectColor}
          hoverColor={hoverColor}
          onHoverColor={setHoverColor}
        />

        <VariantOption
          variants={product.variant}
          activeVariant={activeVariant}
          onSelectVariant={handleSelectVariant}
        />

        <Price
          variant={selectedVariant}
          onButtonClick={() => console.log("Mua ngay")}
        />
      </div>
    </div>
  );
}

"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "./productPage.module.css";

import Price from "./Price";
import ColorOption from "./ColorOption";
import VariantOption from "./VariantOption";
import ProductSpec from "./ProductSpec";
import Footer from "@/component/footer/Footer";

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
  const currentImage = useMemo(() => {
    if (!activeColor) return product.image;

    return (
      product.option.color.find((c) => c.name === activeColor)?.image ??
      product.image
    );
  }, [product, activeColor]);

  const selectedVariant = useMemo(() => {
    if (!activeColor || !activeVariant) return undefined;

    return product.variant.find(
      (v) => v.color === activeColor && v.storage === activeVariant
    );
  }, [product, activeColor, activeVariant]);

  /* =======================
     HANDLERS
  ======================== */
  const handleSelectColor = useCallback((colorName: string) => {
    setActiveColor(colorName);
    setActiveVariant(null);
  }, []);

  const handleSelectVariant = useCallback((variantValue: string) => {
    setActiveVariant(variantValue);
  }, []);

  return (
    <div className={styles.productWrapper}>
      {/* ===== STICKY PRICE ===== */}
      <div className={styles.stickyPrice}>
        {/* <Price
          productName={product.title}
          variant={selectedVariant}
          variants={product.variant}
        /> */}
      </div>

      {/* ===== MAIN CONTENT ===== */}
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

        {/* INFO / BUY SECTION */}
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
            disabled={!activeColor}
          />
        </div>
      </div>

      {/* ===== SPEC ===== */}
      <ProductSpec features={product.feature} product={product} />

      <Footer />
    </div>
  );
}

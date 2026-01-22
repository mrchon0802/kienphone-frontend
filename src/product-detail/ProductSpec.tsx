"use client";

import React, { useState } from "react";
import styles from "./ProductSpec.module.css";
import { ProductFeature, ProductType } from "./type/productType";
import { Battery, Camera, Video, Smartphone } from "lucide-react";
import Specifications from "./product-spec/Specification";

interface ProductSpecsProps {
  features: ProductFeature[];
  product: ProductType;
}

const iconMapByTitle: Record<string, React.ReactNode> = {
  "Dung lượng pin": <Battery size={24} />,
  "Camera Tele Hasselblad": <Camera size={24} />,
  "Dolby Vision": <Video size={24} />,
  "ColorOS 16": <Smartphone size={24} />,
};

export default function ProductSpec({ product, features }: ProductSpecsProps) {
  const [openSpecSummary, setOpenSpecSummary] = useState(false);
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Tính năng chính</h2>
        <div className={styles.keyFeature}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <div className={styles.icon}>{iconMapByTitle[feature.title]}</div>

              <div className={styles.content}>
                <h4 className={styles.title}>{feature.title}</h4>

                {feature.description && (
                  <p className={styles.desc}>{feature.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className={styles.note}>
          *Nhấp vào Xem chi tiết để biết thêm thông tin về sản phẩm.
        </p>

        <div className={styles.actions}>
          <button className={styles.compareBtn}>So sánh</button>
          <button
            className={styles.detailBtn}
            onClick={() => setOpenSpecSummary(true)}
          >
            Xem chi tiết
          </button>
        </div>
        {openSpecSummary && <Specifications product={product} />}
      </div>
    </section>
  );
}

"use client";

import { ProductType } from "../type/productType";
import { SPEC_CONFIG } from "./specConfig";
import SpecNav from "./SpecNav";
import SpecSection from "./SpecSection";
import { useSpecScrollSpy } from "./useSpecScrollSpy";
import styles from "./Specifications.module.css";

interface SpecificationsProps {
  product: ProductType;
}

export default function Specifications({ product }: SpecificationsProps) {
  const activeKey = useSpecScrollSpy();

  return (
    <div className={styles.container}>
      <div className={styles.title}>Thông số kỹ thuật</div>
      <div className={styles.heading}>
        <SpecNav activeKey={activeKey} />
      </div>
      <div className={styles.content}>
        {SPEC_CONFIG.map((group) => (
          <SpecSection key={group.id} product={product} group={group} />
        ))}
      </div>
    </div>
  );
}

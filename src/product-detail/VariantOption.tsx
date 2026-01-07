"use client";

import { memo, useMemo } from "react";
import styles from "./VariantOption.module.css";

type Variant = {
  storage: string;
  price: number;
};

interface VariantOptionProps {
  variants: Variant[];
  activeVariant: string | null;
  onSelectVariant: (storage: string) => void;
}

function VariantOption({
  variants,
  activeVariant,
  onSelectVariant,
}: VariantOptionProps) {
  const storages = useMemo(() => {
    const map = new Map<string, number>();

    variants.forEach((v) => {
      if (!map.has(v.storage)) {
        map.set(v.storage, v.price);
      }
    });

    return Array.from(map.entries()).map(([name, price]) => ({
      name,
      price,
    }));
  }, [variants]);

  if (storages.length === 0) return null;

  return (
    <div className={styles.variantOption}>
      <p className={styles.title}>
        <strong>Dung lượng.</strong> Bạn cần bao nhiêu bộ nhớ?
      </p>

      <div className={styles.optionList}>
        {storages.map(({ name, price }) => {
          const isActive = activeVariant === name;

          return (
            <button
              key={name}
              type="button"
              aria-pressed={isActive}
              className={`${styles.optionItem} ${
                isActive ? styles.active : ""
              }`}
              onClick={() => onSelectVariant(name)}
            >
              <span className={styles.storage}>{name}</span>

              <span className={styles.price}>
                From {price.toLocaleString("vi-VN")}₫
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default memo(VariantOption);

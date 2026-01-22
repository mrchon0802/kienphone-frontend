"use client";

import { memo, useMemo } from "react";
import styles from "./VariantOption.module.css";

type Variant = {
  storage: string;
  price: number;
  discountedPrice: number;
};

interface VariantOptionProps {
  variants: Variant[];
  activeVariant: string | null;
  onSelectVariant: (storage: string) => void;
  disabled?: boolean;
}

function VariantOption({
  variants,
  activeVariant,
  onSelectVariant,
  disabled,
}: VariantOptionProps) {
  const storages = useMemo(() => {
    const map = new Map<string, number>();

    variants.forEach((v) => {
      if (!map.has(v.storage) || v.price < map.get(v.storage)!) {
        map.set(v.storage, v.discountedPrice);
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
        <strong>Dung lượng.</strong>{" "}
        <span className={styles.description}>Bạn cần bao nhiêu bộ nhớ?</span>
      </p>

      <div className={styles.optionList}>
        {storages.map(({ name, price }) => {
          const isActive = activeVariant === name;

          return (
            <button
              key={name}
              type="button"
              disabled={disabled}
              aria-disabled={disabled}
              className={`${styles.optionItem} ${
                isActive ? styles.active : ""
              } ${disabled ? styles.disabled : ""}`}
              onClick={() => onSelectVariant(name)}
            >
              <span className={styles.storage}>{name}</span>

              <span className={styles.price}>
                <span>Chỉ từ </span>
                <span>{price.toLocaleString("vi-VN")}₫</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default memo(VariantOption);

"use client";

import { ProductType } from "../type/productType";
import { SpecGroup } from "./specConfig";
import styles from "./SpecSection.module.css";

interface SpecSectionProps {
  product: ProductType;
  group: SpecGroup;
}

type SpecRow = {
  field: keyof ProductType;
  label: string;
  value: string;
};

export default function SpecSection({ product, group }: SpecSectionProps) {
  const rows = group.fields.flatMap(({ field, label }) => {
    const raw = product[field];
    if (!raw) return [];

    return [
      {
        field,
        label,
        value: Array.isArray(raw) ? raw.join(" · ") : String(raw),
      },
    ];
  });

  if (rows.length === 0) return null;

  return (
    <section id={group.id} className={styles.section}>
      <h3 className={styles.title}>{group.label}</h3>

      <div className={styles.list}>
        {rows.map((row) => (
          <div key={`${group.id}-${row.field}`} className={styles.row}>
            <span className={styles.label}>{row.label}</span>
            <span className={styles.value}>{row.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

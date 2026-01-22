"use client";

import styles from "./SpecNav.module.css";
import { SPEC_CONFIG } from "./specConfig";

interface SpecNavProps {
  activeKey: string | null;
}

export default function SpecNav({ activeKey }: SpecNavProps) {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  console.log("active key specnav:", activeKey);
  return (
    <div className={styles.nav}>
      {SPEC_CONFIG.map((group) => (
        <button
          key={group.id}
          type="button"
          className={`${styles.button} ${
            activeKey === group.id ? styles.active : ""
          }`}
          aria-current={activeKey === group.id ? "true" : undefined}
          onClick={() => handleScroll(group.id)}
        >
          {group.label}
        </button>
      ))}
    </div>
  );
}

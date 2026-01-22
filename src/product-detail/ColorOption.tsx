import { memo, useCallback } from "react";
import styles from "./ColorOption.module.css";

type Color = {
  name: string;
  code: string;
};

interface ColorOptionProps {
  colors: Color[];
  activeColor: string | null;
  hoverColor: string | null;
  onSelectColor: (color: string) => void;
  onHoverColor: (color: string | null) => void;
}

function ColorOption({
  colors,
  activeColor,
  hoverColor,
  onSelectColor,
  onHoverColor,
}: ColorOptionProps) {
  if (!colors || colors.length === 0) return null;

  const displayColor = hoverColor || activeColor;

  const handleClick = useCallback(
    (colorName: string) => {
      onSelectColor(colorName);
    },
    [onSelectColor]
  );

  return (
    <div className={styles.colorOption}>
      <p className={styles.title}>
        <strong className={styles.step}>Bước đầu.</strong>{" "}
        <span className={styles.description}>Chọn màu yêu thích của bạn.</span>
      </p>
      <strong>
        <p className={styles.subTitle}>
          Màu sắc
          {displayColor && (
            <>
              {" "}
              – <span>{displayColor}</span>
            </>
          )}
        </p>
      </strong>

      <div className={styles.colorList}>
        {colors.map((color) => {
          const isActive = activeColor === color.name;

          return (
            <button
              key={color.name}
              type="button"
              aria-label={color.name}
              aria-pressed={isActive}
              className={`${styles.colorItem} ${isActive ? styles.active : ""}`}
              style={{ "--color": color.code } as React.CSSProperties}
              onClick={() => handleClick(color.name)}
              onMouseEnter={() => onHoverColor(color.name)}
              onMouseLeave={() => onHoverColor(null)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default memo(ColorOption);

/* ================= OPTION ================= */

export interface ColorOption {
  name: string;
  code: string;
  image: string;
  availableWith: string[];
}

export interface ProductOption {
  color: ColorOption[];
}

/* ================= VARIANT ================= */

export interface VariantOption {
  variantId: string;
  color: string;
  storage: string;
  price: number;
  discountedPrice: number;
  image: string;
}

/* ================= FEATURE ================= */

export interface ProductFeature {
  title: string;
  description: string;
}

/* ================= PRODUCT ================= */

export interface ProductType {
  /* ===== BASIC INFO ===== */
  productId: string;
  brand: string;
  series: string;
  image: string;
  title: string;

  /* ===== PRICE (DEFAULT / FALLBACK) ===== */
  price: number;
  discountedPrice: number;

  /* ===== SYSTEM ===== */
  osSystem: string;
  display: string;
  refreshRate: string;
  peakBrightness: string;
  touchscreenGlass: string;

  chipset: string;
  detailChipset: string;

  /* ===== SPEC TEXT (DISPLAY ONLY) ===== */
  ram: string;
  storage: string;

  /* ===== CAMERA ===== */
  rearCameraResolution: string[];
  rearVideoRecording: string;
  rearCameraFlash: string;

  frontCameraResolution: string;
  frontVideoRecording: string;

  /* ===== BATTERY ===== */
  batteryCapacity: string;
  batteryType: string;
  chargingPower: string;
  batteryTechnology: string[];

  /* ===== CONNECTION ===== */
  mobileNetwork: string;
  sim: string;

  wifi: string[];
  gps: string;
  bluetooth: string;

  chargingPort: string;
  otherConnections: string[];

  /* ===== DESIGN ===== */
  design: string;
  material: string;
  weight: string;
  size: string;

  launchDate: string;
  waterResistance: string;

  /* ===== FEATURE (HIGHLIGHT) ===== */
  feature: ProductFeature[];

  /* ===== OPTION & VARIANT ===== */
  option: ProductOption;
  variant: VariantOption[];
}

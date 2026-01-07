export interface ColorOption {
  name: string;
  code: string;
  image: string;
  availableWith: string[];
}

export interface ProductOption {
  color: ColorOption[];
}

export interface VariantOption {
  variantId: string;
  color: string;
  storage: string;
  ram: string;
  price: number;
  discountedPrice: number;
  image: string;
}

export interface ProductType {
  productId: string;
  brand: string;
  series: string;
  image: string;
  title: string;

  price: number;
  discountedPrice: number;

  osSystem: string;
  display: string;
  refreshRate: string;
  peakBrightness: string;
  touchscreenGlass: string;

  chipset: string;
  detailChipset: string;

  ram: string;
  storage: string;

  rearCameraResolution: string[];
  rearVideoRecording: string;
  rearCameraFlash: string;

  frontCameraResolution: string;
  frontVideoRecording: string;

  batteryCapacity: string;
  batteryType: string;
  chargingPower: string;
  batteryTechnology: string[];

  mobileNetwork: string;
  sim: string;

  wifi: string[];
  gps: string;
  bluetooth: string;

  chargingPort: string;
  otherConnections: string[];

  design: string;
  material: string;
  weight: string;
  size: string;

  launchdate: string;
  waterResistance: string;

  option: ProductOption;
  variant: VariantOption[];
}

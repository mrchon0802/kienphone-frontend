// specConfig.ts
import { ProductType } from "../type/productType";

type SpecValue = string | string[];

type SpecFieldKey = {
  [K in keyof ProductType]: ProductType[K] extends SpecValue ? K : never;
}[keyof ProductType];

export type SpecField = {
  field: SpecFieldKey;
  label: string;
};

export type SpecGroup = {
  id: string;
  label: string;
  fields: SpecField[];
};

export const SPEC_CONFIG: SpecGroup[] = [
  {
    id: "display",
    label: "Màn hình",
    fields: [
      { field: "display", label: "Công nghệ & độ phân giải" },
      { field: "refreshRate", label: "Tần số quét" },
      { field: "peakBrightness", label: "Độ sáng tối đa" },
      { field: "touchscreenGlass", label: "Kính bảo vệ" },
    ],
  },

  {
    id: "performance",
    label: "Hiệu năng",
    fields: [
      { field: "chipset", label: "Vi xử lý" },
      { field: "detailChipset", label: "Chi tiết CPU" },
      { field: "ram", label: "RAM" },
      { field: "storage", label: "Bộ nhớ trong" },
      { field: "osSystem", label: "Hệ điều hành" },
    ],
  },

  {
    id: "camera",
    label: "Camera",
    fields: [
      { field: "rearCameraResolution", label: "Camera sau" },
      { field: "rearVideoRecording", label: "Quay video sau" },
      { field: "rearCameraFlash", label: "Đèn flash" },
      { field: "frontCameraResolution", label: "Camera trước" },
      { field: "frontVideoRecording", label: "Quay video trước" },
    ],
  },

  {
    id: "battery",
    label: "Pin & Sạc",
    fields: [
      { field: "batteryCapacity", label: "Dung lượng pin" },
      { field: "batteryType", label: "Loại pin" },
      { field: "chargingPower", label: "Công suất sạc" },
      { field: "batteryTechnology", label: "Công nghệ sạc" },
    ],
  },

  {
    id: "connectivity",
    label: "Kết nối",
    fields: [
      { field: "mobileNetwork", label: "Mạng di động" },
      { field: "sim", label: "SIM" },
      { field: "wifi", label: "Wi-Fi" },
      { field: "bluetooth", label: "Bluetooth" },
      { field: "gps", label: "GPS" },
      { field: "chargingPort", label: "Cổng sạc" },
      { field: "otherConnections", label: "Kết nối khác" },
    ],
  },

  {
    id: "design",
    label: "Thiết kế & Chất liệu",
    fields: [
      { field: "design", label: "Thiết kế" },
      { field: "material", label: "Chất liệu" },
      { field: "size", label: "Kích thước" },
      { field: "weight", label: "Trọng lượng" },
    ],
  },

  {
    id: "durability",
    label: "Độ bền & Ra mắt",
    fields: [
      { field: "waterResistance", label: "Kháng nước / bụi" },
      { field: "launchDate", label: "Thời điểm ra mắt" },
    ],
  },
];

"use client";

import { useEffect, useState, useRef } from "react";
import { SPEC_CONFIG } from "./specConfig";

export function useSpecScrollSpy() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Dùng ref để lưu observer, tiện cho việc cleanup
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Hàm tìm kiếm elements
    const getSections = () => {
      return SPEC_CONFIG.map((g) => document.getElementById(g.id)).filter(
        (el): el is HTMLElement => el !== null
      );
    };

    let sections = getSections();

    // 🛠️ FIX: Nếu chưa tìm thấy element nào (do data load chậm),
    // thử lại sau một chút hoặc cần một dependency khác từ parent để trigger lại.
    // Ở đây mình dùng cách đơn giản là nếu sections rỗng thì không chạy observer,
    // nhưng lý tưởng nhất là bạn nên truyền một biến "isLoaded" vào hook này.
    if (sections.length === 0) {
      // Tùy chọn: Có thể set một timeout nhỏ hoặc MutationObserver nếu cần thiết
      // Nhưng tốt nhất là đảm bảo hook này chỉ chạy khi content đã render.
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);

        if (visible.length > 0) {
          // Tìm phần tử nằm cao nhất trong vùng quan sát
          const topMost = visible.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top
              ? prev
              : curr
          );

          // ⚡ TỐI ƯU: Chỉ set state nếu giá trị thay đổi
          setActiveKey((prevKey) => {
            if (prevKey !== topMost.target.id) {
              return topMost.target.id;
            }
            return prevKey;
          });
        }
      },
      {
        root: null,
        // Giữ nguyên kỹ thuật này vì nó rất tốt
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observerRef.current?.observe(section));

    return () => observerRef.current?.disconnect();

    // Nếu SPEC_CONFIG có thể thay đổi, hãy thêm vào deps
    // Nếu trang load data async, hãy thêm biến dependency (ví dụ data) vào đây
  }, []);

  return activeKey;
}

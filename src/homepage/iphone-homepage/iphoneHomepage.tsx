"use client";

import styles from "./iphoneHomepage.module.css";
import Image from "next/image";
import { HomepageType, HomepageButton } from "../type/homepageType";
import { useEffect, useState } from "react";

export default function IphoneHomepage() {
  const [data, setData] = useState<HomepageType | null>(null);
  const [loading, setLoading] = useState(true); // Khởi tạo là true
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // API URL của bạn
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log("API URL from env:", apiUrl); // Debug

        if (!apiUrl) {
          throw new Error("API URL is not defined in environment variables");
        }

        // Xóa slash cuối nếu có để tránh double slash
        const baseUrl = apiUrl.replace(/\/$/, "");
        const endpoint = `${baseUrl}/iphonehomepages`;

        console.log("Fetching from:", endpoint); // Debug

        const response = await fetch(endpoint, {
          // Thêm headers để tránh CORS issue
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          // Thêm mode nếu cần
          mode: "cors",
        });

        console.log("Response status:", response.status); // Debug

        if (!response.ok) {
          // Thử đọc response text để debug
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result: HomepageType[] = await response.json();
        console.log("Data received:", result); // Debug

        if (Array.isArray(result) && result.length > 0) {
          setData(result[0]); // Chỉ lấy object đầu tiên
        } else {
          setData(null);
        }
      } catch (err) {
        console.error("Fetch error details:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Thêm nút retry
  const handleRetry = () => {
    window.location.reload(); // hoặc gọi lại fetchData
  };

  // Render states
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading iPhone homepage...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <h3>Error Loading Content</h3>
          <p>{error}</p>
          <div className={styles.debugInfo}>
            <p>API URL: {process.env.NEXT_PUBLIC_API_URL}</p>
            <p>
              Full URL: {process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")}
              /iphonehomepages
            </p>
          </div>
          <button onClick={handleRetry} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Kiểm tra data có tồn tại không
  if (!data) {
    return (
      <div className={styles.container}>
        <div className={styles.noData}>
          <p>No data available</p>
          <button onClick={handleRetry}>Reload</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Image Section */}
      <div className={styles.imageWrapper}>
        {data.image ? (
          <Image
            src={data.image}
            alt={data.title || "iPhone Homepage"}
            fill
            className={styles.image}
            priority
            onError={(e) => {
              console.error("Image failed to load:", data.image);
              // Có thể set fallback image ở đây
              e.currentTarget.src = "/fallback-image.jpg";
            }}
          />
        ) : (
          <div className={styles.imagePlaceholder}>No Image Available</div>
        )}
      </div>

      {/* Content Section */}
      <div className={styles.content}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.description}>{data.description}</p>

        {/* Buttons */}
        {data.buttons && data.buttons.length > 0 ? (
          <div className={styles.buttons}>
            {data.buttons.map((button: HomepageButton, index: number) => {
              const isOrderNow = button.label === "Mua ngay";

              return (
                <a
                  key={index}
                  href={button.link}
                  className={`${styles.button} ${
                    isOrderNow ? styles.orderNow : styles.learnMore
                  }`}
                  target={button.link.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                >
                  {button.label}
                </a>
              );
            })}
          </div>
        ) : (
          <p className={styles.noButtons}>No buttons available</p>
        )}
      </div>
    </div>
  );
}

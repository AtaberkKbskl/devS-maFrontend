// src/components/StarRating.tsx
import React, { useState } from "react";

interface StarRatingProps {
  type: string;                 // "camera" | "image" | "video"
  userName: string;             // Örn. giriş yapılan kullanıcı adı
  onRate: (stars: number) => void; // Yıldız sayısını parent sayfaya iletecek callback
  isSubmitting?: boolean;       // (Opsiyonel) form gönderimi esnasında disable için
}

const StarRating: React.FC<StarRatingProps> = ({
  type,
  userName,
  onRate,
  isSubmitting = false,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedStars, setSelectedStars] = useState<number>(0);

  const handleClick = (stars: number) => {
    if (isSubmitting) return;
    setSelectedStars(stars);
    onRate(stars);
  };

  return (
    <div style={{ display: "inline-block", marginTop: "1rem" }}>
      <div style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
        <strong>Oy ver ({type}):</strong>
      </div>
      <div style={{ display: "flex", cursor: isSubmitting ? "not-allowed" : "pointer" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              fontSize: "2rem",
              color:
                hoverIndex !== null
                  ? star <= hoverIndex
                    ? "#ffd700"
                    : "#ccc"
                  : star <= selectedStars
                  ? "#ffa500"
                  : "#ccc",
              transition: "color 0.2s",
            }}
            onMouseEnter={() => setHoverIndex(star)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => handleClick(star)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default StarRating;

// src/components/FeedbackForm.tsx
import React, { useState } from "react";

interface FeedbackFormProps {
  type: string;                              // "camera" | "image" | "video"
  userName: string;                          // giriş yapan kullanıcı adı
  rating: number;                            // zaten seçilmiş yıldız değeri (star rating)
  isSubmitting?: boolean;                    // gönderim esnasında formu disable etmek için
  onSubmitFeedback: (info: {
    username: string;
    type: string;
    rating: number;
    comment: string;
  }) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  type,
  userName,
  rating,
  isSubmitting = false,
  onSubmitFeedback,
}) => {
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Lütfen bir yorum girin.");
      return;
    }
    onSubmitFeedback({
      username: userName,
      type,
      rating,
      comment: comment.trim(),
    });
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", marginTop: "1rem" }}
    >
      <label style={{ fontWeight: "500", marginBottom: "0.25rem" }}>
        Geri Bildirim Yaz:
      </label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        disabled={isSubmitting}
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          resize: "vertical",
        }}
        placeholder="Görüşlerinizi buraya yazın..."
      />
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          marginTop: "0.5rem",
          padding: "8px 16px",
          backgroundColor: "#3f51b5",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: isSubmitting ? "not-allowed" : "pointer",
        }}
      >
        Gönder
      </button>
    </form>
  );
};

export default FeedbackForm;

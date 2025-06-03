// src/components/FeedbackForm.tsx
import React, { useState } from "react";

interface FeedbackFormProps {
  type: string;    // "camera" | "image" | "video"
  rating: number;  // Seçilmiş yıldız değeri
  isSubmitting?: boolean;
  onSubmitFeedback: (info: {
    username: string;
    type: string;
    rating: number;
    comment: string;
  }) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  type,
  rating,
  isSubmitting = false,
  onSubmitFeedback,
}) => {
  // Artık kullanıcı adını form içinde giriyor
  const [username, setUsername] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      alert("Lütfen kullanıcı adınızı girin.");
      return;
    }
    if (!comment.trim()) {
      alert("Lütfen bir yorum girin.");
      return;
    }
    onSubmitFeedback({
      username: username.trim(),
      type,
      rating,
      comment: comment.trim(),
    });
    // Formu temizle
    setUsername("");
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "1rem",
      }}
    >
      {/* Kullanıcı Adı Input */}
      <label
        htmlFor="username"
        style={{ fontWeight: "500", marginBottom: "0.25rem", color: "#fff" }}
      >
        Kullanıcı Adı:
      </label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isSubmitting}
        placeholder="Adınızı girin..."
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginBottom: "0.75rem",
          fontSize: "1rem",
        }}
      />

      {/* Yorum Metni */}
      <label
        htmlFor="comment"
        style={{ fontWeight: "500", marginBottom: "0.25rem", color: "#fff" }}
      >
        Geri Bildirim Yaz:
      </label>
      <textarea
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        disabled={isSubmitting}
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          resize: "vertical",
          marginBottom: "0.75rem",
          fontSize: "1rem",
          color: "#333",     /* Yorum metnini koyu yapabiliriz */
        }}
        placeholder="Görüşlerinizi buraya yazın..."
      />

      {/* Gönder Butonu */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          marginTop: "0.5rem",
          padding: "10px 16px",
          backgroundColor: "#3f51b5",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          fontSize: "1rem",
          transition: "background-color 0.2s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#303f9f")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#3f51b5")
        }
      >
        Gönder
      </button>
    </form>
  );
};

export default FeedbackForm;

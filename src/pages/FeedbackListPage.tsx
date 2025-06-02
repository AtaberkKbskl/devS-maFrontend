// src/pages/FeedbackListPage.tsx
import React, { useEffect, useState } from "react";
import { getAllFeedbacks } from "../api";

export interface FeedbackItem {
  id: number;
  username: string;
  type: string;
  rating: number;
  comment: string;
}

const FeedbackListPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedbacks = async () => {
    try {
      const data = await getAllFeedbacks();
      setFeedbacks(data);
    } catch (err) {
      console.error(err);
      setError("Geri bildirimler alınamadı.");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
      <h2>Tüm Geri Bildirimler</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && feedbacks.length === 0 && <p>Henüz geri bildirim yok.</p>}

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {feedbacks.map((fb) => (
          <li
            key={fb.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>#{fb.id}</strong> — <em>{fb.username}</em>  
                &nbsp;|&nbsp; <u>{fb.type}</u>
              </div>
              <div style={{ fontSize: "1.2rem", color: "#ffa500" }}>
                {"★".repeat(fb.rating) + "☆".repeat(5 - fb.rating)}
              </div>
            </div>
            <p style={{ marginTop: "8px" }}>{fb.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackListPage;

// src/pages/FeedbackListPage.tsx
import React, { useEffect, useState } from "react";
import { getAllFeedbacks } from "../api";
import "./FeedbackListPage.css";


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

  // Bir `rating` değerini, örneğin 3 ise "★★★☆☆" gibi bir string'e çeviren yardımcı fonksiyon:
  const renderStars = (rating: number) => {
    const fullStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return fullStars + emptyStars;
  };

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "0 1rem" }}>
      <h2 style={{ marginBottom: "1rem", color: "#0f4c81" }}>Feedback Listesi</h2>

      {error && (
        <p style={{ color: "red", fontWeight: 500 }}>{error}</p>
      )}

      {!error && feedbacks.length === 0 && (
        <p>Henüz geri bildirim yok.</p>
      )}

      {!error && feedbacks.length > 0 && (
        <table className="feedback-table" style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <thead>
            <tr style={{ backgroundColor: "#0f4c81", color: "white" }}>
              <th style={tableHeaderStyle}>#</th>
              <th style={tableHeaderStyle}>Kullanıcı Adı</th>
              <th style={tableHeaderStyle}>Tip</th>
              <th style={tableHeaderStyle}>Puan</th>
              <th style={tableHeaderStyle}>Yorum</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb) => (
              <tr key={fb.id} style={tableRowStyle}>
                <td style={tableCellStyle}>{fb.id}</td>
                <td style={tableCellStyle}>{fb.username}</td>
                <td style={tableCellStyle}>{fb.type}</td>
                <td style={{ ...tableCellStyle, fontSize: "1.1rem", color: "#ffa500" }}>
                  {renderStars(fb.rating)}
                </td>
                <td style={tableCellStyle}>{fb.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Tekrar kullanılabilen stil objeleri
const tableHeaderStyle: React.CSSProperties = {
  padding: "12px",
  border: "1px solid #ddd",
  textAlign: "left",
};

const tableCellStyle: React.CSSProperties = {
  padding: "12px",
  border: "1px solid #ddd",
};

const tableRowStyle: React.CSSProperties = {
  backgroundColor: "#fff",
};

export default FeedbackListPage;

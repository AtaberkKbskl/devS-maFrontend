// src/api/index.ts
export interface FeedbackPayload {
    username: string;
    type: string;    // "camera" | "image" | "video"
    rating: number;  // 1..5
    comment: string;
  }
  
  // Yeni feedback & rating kaydetme
  export async function postFeedback(payload: FeedbackPayload): Promise<void> {
    await fetch("http://localhost:8080/api/feedback/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }
  
  // Tüm feedback’leri listele
  export interface FeedbackItem {
    id: number;
    username: string;
    type: string;
    rating: number;
    comment: string;
  }
  export async function getAllFeedbacks(): Promise<FeedbackItem[]> {
    const res = await fetch("http://localhost:8080/api/feedback/all");
    if (!res.ok) throw new Error("Feedback alınamadı");
    return res.json();
  }
  
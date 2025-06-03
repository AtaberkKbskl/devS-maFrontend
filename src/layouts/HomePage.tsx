// src/layouts/HomePage.tsx
import React from "react";
import "./HomePage.css"; // Daha önceki adımlarda oluşturduğunuz CSS

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <div className="info-card">
        <h2 className="card-title">Projenin Amacı</h2>
        <p className="card-text">
          Bu uygulama ile gerçek zamanlı görüntülerde yüz anonimleştirme
          işlemleri yapabilirsiniz. Amaç, hem statik hem de dinamik
          (video/live camera) ortamlarda, kişisel verileri koruyarak yüz
          tanıma sistemlerinin önünü kapatmaktır.
        </p>
      </div>

      <div className="info-card">
        <h2 className="card-title">Nasıl Çalışır?</h2>
        <ul className="card-list">
          <li>
            <strong>Image Upload:</strong> Buradan bir fotoğraf seçip “Upload”
            ve “Process” butonlarıyla anonimleştirilmiş halini görebilirsiniz.
          </li>
          <li>
            <strong>Video Upload:</strong> Bir video yükleyip, anonimleştirilmiş
            video çıktısını indirebilir, tarayıcınızda izleyebilirsiniz.
          </li>
          <li>
            <strong>Live Camera:</strong> Gerçek zamanlı kamera yayını alarak,
            her 2 saniyede bir kareyi anonimleştirilmiş şekilde görebilirsiniz.
          </li>
          <li>
            <strong>Feedback Listesi:</strong> Yıldızlı puanlama ve yorumları
            tablo halinde görüntüleyebilirsiniz.
          </li>
        </ul>
      </div>

      <div className="info-card">
        <h2 className="card-title">Kullanım Talimatları</h2>
        <ol className="card-list">
          <li>
            <strong>Öncelikle:</strong> “Register/Login” sayfasından sisteme
            giriş yapın.
          </li>
          <li>
            <strong>Ardından:</strong> Sol menüden yapmak istediğiniz işlemi
            (Image, Video, Live Camera, Feedbacks) seçin.
          </li>
          <li>
            <strong>Her sayfada:</strong> Aşağıdaki adımları takip edin:
            <ol className="card-list">
              <li>
                <strong>Image Sayfası:</strong> “Choose File” ile bir resim
                seçin, “Upload”a tıklayın, ardından “Process” ile
                anonimleştirilmiş fotoğrafı alın.
              </li>
              <li>
                <strong>Video Sayfası:</strong> “Choose File” ile bir video
                seçin, “Upload”a tıklayın, ardından “Process” ile
                anonimleştirilmiş videoyu indirin veya oynatın.
              </li>
              <li>
                <strong>Live Camera:</strong> Tarayıcınızın kamera erişimini
                onaylayın. “Start Camera” ile gerçek zamanlı akışı başlatın;
                her 2 saniyede bir kare anonimleştirilir.
              </li>
              <li>
                <strong>Feedback Listesi:</strong> Her sayfada “Rating” ile
                yıldız puanlama yapıp, “Feedback” formunu doldurarak yorum
                bırakın. Ardından bu sayfada tablo halinde tüm geri
                bildirimleri görebilirsiniz.
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default HomePage;

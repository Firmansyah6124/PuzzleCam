import React from 'react';
import { sfx } from '../utils/audio';

export default function GestureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="kawaii-badge">KONTROL KAMERA AI</span>
            <h2 className="modal-title">Panduan Sensor Gestur Tangan (ATM)</h2>
          </div>
          <button
            className="btn-close-modal"
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="gesture-grid">
            {/* 1. Frame Gesture */}
            <div className="gesture-card highlighted">
              <div className="gesture-icon-wrap">
                <span className="gesture-emoji">🫶</span>
              </div>
              <div className="gesture-info">
                <div className="gesture-tag">UTAMA • AMBIL FOTO</div>
                <h3 className="gesture-title">Bingkai Dua Tangan (Hand Frame)</h3>
                <p className="gesture-desc">
                  Bentuk bingkai kotak di depan kamera menggunakan telunjuk dan jempol kedua tanganmu. Kamera otomatis menghitung mundur 3 detik untuk mengambil foto!
                </p>
              </div>
            </div>

            {/* 2. Pinch Gesture */}
            <div className="gesture-card">
              <div className="gesture-icon-wrap">
                <span className="gesture-emoji">🤏</span>
              </div>
              <div className="gesture-info">
                <div className="gesture-tag">PUZZLE MINIGAME</div>
                <h3 className="gesture-title">Mencubit (Pinch to Drag)</h3>
                <p className="gesture-desc">
                  Satukan ujung telunjuk dan jempol untuk menjepit kepingan pecahan puzzle foto, lalu geser tanganmu di udara untuk memindahkannya ke slot yang tepat.
                </p>
              </div>
            </div>

            {/* 3. Fist Gesture */}
            <div className="gesture-card">
              <div className="gesture-icon-wrap">
                <span className="gesture-emoji">✊</span>
              </div>
              <div className="gesture-info">
                <div className="gesture-tag">KUNCI & SIMPAN</div>
                <h3 className="gesture-title">Kepalan Tangan (Fist Lock)</h3>
                <p className="gesture-desc">
                  Setelah kepingan puzzle tersusun rapi, kepalkan tanganmu dan tahan ~1 detik. Meteran penguncian akan terisi dan foto langsung disimpan!
                </p>
              </div>
            </div>

            {/* 4. Peace Sign & Palm */}
            <div className="gesture-card">
              <div className="gesture-icon-wrap">
                <span className="gesture-emoji">✌️</span>
              </div>
              <div className="gesture-info">
                <div className="gesture-tag">POSE ALTERNATIF</div>
                <h3 className="gesture-title">Peace Sign (V) & 🖐️ Telapak</h3>
                <p className="gesture-desc">
                  Pose foto klasik Purikura Jepang! Cocok jika Anda hanya ingin menggunakan satu tangan di depan kamera.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn-kawaii btn-primary"
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
          >
            <span>Sudah Paham, Siap Foto! 🌸</span>
          </button>
        </div>
      </div>
    </div>
  );
}

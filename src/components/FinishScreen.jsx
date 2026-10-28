import React, { useEffect } from 'react';
import { sfx } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function FinishScreen({ finalStripDataUrl, onRestart }) {
  useEffect(() => {
    sfx.playSuccess();
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.5 }
    });
  }, []);

  function handleDownload() {
    sfx.playSuccess();
    const link = document.createElement('a');
    link.download = `purikura-kawaii-${Date.now()}.png`;
    link.href = finalStripDataUrl;
    link.click();
  }

  return (
    <section className="finish-section">
      <div className="finish-card kawaii-card">
        <div className="finish-header">
          <span className="kawaii-badge">プリクラ完成 • MASTERPIECE READY</span>
          <h2 className="finish-title">Foto Purikura Siap Diunduh! 🌸</h2>
          <p className="finish-desc">Hasil jepretan dan dekorasi fotomu telah berhasil dicetak.</p>
        </div>

        <div className="finish-preview-box">
          <img src={finalStripDataUrl} alt="Hasil Purikura Strip" className="finish-strip-img" />
        </div>

        <div className="finish-actions-row">
          <button className="btn-kawaii btn-primary btn-lg" onClick={handleDownload}>
            <span>📥 Download Foto HD (PNG)</span>
          </button>
          <button className="btn-kawaii btn-secondary btn-lg" onClick={onRestart}>
            <span>🔄 Ambil Foto Baru (Restart)</span>
          </button>
        </div>
      </div>
    </section>
  );
}

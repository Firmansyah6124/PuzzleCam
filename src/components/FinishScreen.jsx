import React, { useEffect } from 'react';
import { sfx } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function FinishScreen({
  finalStripDataUrl,
  onRestart,
  driveLink,
  onOpenDrive
}) {
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

        {/* Cloud Storage Status Banner if Saved */}
        {driveLink && (
          <div className="finish-cloud-banner">
            <span className="material-symbols-outlined text-emerald-600 text-sm">cloud_done</span>
            <span>Tersimpan di Google Drive:</span>
            <a
              href={driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="finish-drive-link"
            >
              Lihat di Drive ↗
            </a>
          </div>
        )}

        <div className="finish-preview-box">
          <img src={finalStripDataUrl} alt="Hasil Purikura Strip" className="finish-strip-img" />
        </div>

        <div className="finish-actions-row">
          <button className="btn-kawaii btn-primary btn-lg" onClick={handleDownload}>
            <span>📥 Download Foto HD (PNG)</span>
          </button>

          {onOpenDrive && (
            <button
              className="btn-kawaii btn-secondary btn-lg"
              onClick={() => {
                sfx.playClick();
                onOpenDrive();
              }}
            >
              <span>☁️ {driveLink ? 'Pengaturan Drive' : 'Simpan ke Drive'}</span>
            </button>
          )}

          <button className="btn-kawaii btn-secondary btn-lg" onClick={onRestart}>
            <span>🔄 Ambil Foto Baru (Restart)</span>
          </button>
        </div>
      </div>
    </section>
  );
}

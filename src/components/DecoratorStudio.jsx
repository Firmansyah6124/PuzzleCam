import React, { useEffect, useRef, useState } from 'react';
import { sfx } from '../utils/audio';
import { STICKERS, FRAME_STYLES, FILTERS, getStickerDataUrl } from '../utils/stickers';

const BRUSH_COLORS = [
  { id: 'sakura', color: '#FF7597', name: 'Sakura Pink' },
  { id: 'sky', color: '#70C1B3', name: 'Sky Mint' },
  { id: 'matcha', color: '#7EBD75', name: 'Matcha Green' },
  { id: 'butter', color: '#FFD166', name: 'Butter Yellow' },
  { id: 'lavender', color: '#B39DDB', name: 'Lavender' },
  { id: 'charcoal', color: '#3D3534', name: 'Charcoal' }
];

export default function DecoratorStudio({
  layout,
  photos,
  frameStyle,
  setFrameStyle,
  filter,
  setFilter,
  onFinishStudio
}) {
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState('stickers'); // stickers | pen | frames | filters
  const [brushColor, setBrushColor] = useState('#FF7597');
  const [brushSize, setBrushSize] = useState(6);
  const [customText, setCustomText] = useState('');

  const studioStateRef = useRef({
    baseCanvas: null,
    stickers: [], // { id, img, x, y, width, height, rotation }
    doodles: [], // { points: [], color, size }
    currentStroke: null,
    selectedSticker: null,
    dragStart: { x: 0, y: 0 },
    isDrawing: false,
    isDraggingSticker: false
  });

  useEffect(() => {
    buildCompositeStrip();
  }, [layout, photos, frameStyle, filter]);

  function buildCompositeStrip() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dimensions for photo strip
    let totalW = 440;
    let totalH = 920;
    if (layout === 'grid_2x2') {
      totalW = 600;
      totalH = 740;
    } else if (layout === 'polaroid_1') {
      totalW = 500;
      totalH = 640;
    } else if (layout === 'strip_4') {
      totalW = 440;
      totalH = 1100;
    }

    canvas.width = totalW;
    canvas.height = totalH;

    const base = document.createElement('canvas');
    base.width = totalW;
    base.height = totalH;
    const ctx = base.getContext('2d');

    const currentFrame = FRAME_STYLES.find(f => f.id === frameStyle) || FRAME_STYLES[0];
    const currentFilter = FILTERS.find(f => f.id === filter) || FILTERS[0];

    // 1. Draw rich thematic frame graphics
    drawThemedFrame(ctx, currentFrame, totalW, totalH);

    // 2. Draw Photo Slots with aspect-ratio preserving cover fit
    const padX = 32;
    const padY = 54;
    const photoW = totalW - padX * 2;

    if (layout === 'strip_3' || layout === 'strip_4') {
      const count = layout === 'strip_3' ? 3 : 4;
      const slotH = (totalH - padY - 75 - (count - 1) * 16) / count;

      for (let i = 0; i < count; i++) {
        const sy = padY + i * (slotH + 16);
        drawSlotPhoto(ctx, photos[i], padX, sy, photoW, slotH, currentFilter.css);
      }
    } else if (layout === 'grid_2x2') {
      const gw = (totalW - padX * 2 - 16) / 2;
      const gh = (totalH - padY - 75 - 16) / 2;
      const coords = [
        { x: padX, y: padY },
        { x: padX + gw + 16, y: padY },
        { x: padX, y: padY + gh + 16 },
        { x: padX + gw + 16, y: padY + gh + 16 }
      ];
      for (let i = 0; i < 4; i++) {
        drawSlotPhoto(ctx, photos[i], coords[i].x, coords[i].y, gw, gh, currentFilter.css);
      }
    } else {
      // Polaroid solo - Natural 4:3 proportion with ample bottom note area
      const pW = totalW - padX * 2;
      const pH = Math.round(pW * 0.85); // 370px natural ratio
      drawSlotPhoto(ctx, photos[0], padX, padY + 12, pW, pH, currentFilter.css);
    }

    // 3. Footer date & watermark
    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}   kawaii memories ♡`;
    ctx.fillStyle = currentFrame.accent || '#A89D9B';
    ctx.font = 'bold 12px "Zen Maru Gothic", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(dateStr, totalW / 2, totalH - 24);

    studioStateRef.current.baseCanvas = base;
    renderStudioCanvas();
  }

  // ================= THEMED FRAME GRAPHICS =================
  function drawThemedFrame(ctx, frame, w, h) {
    ctx.save();
    // Solid / Pastel Background
    ctx.fillStyle = frame.bg || '#FFF0F5';
    ctx.fillRect(0, 0, w, h);

    // Outer double border
    ctx.strokeStyle = frame.border || '#FF7597';
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, w - 16, h - 16);

    ctx.strokeStyle = frame.accent || '#FF4D79';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(13, 13, w - 26, h - 26);

    // Themed Header and Corner Accents
    if (frame.id === 'sakura_blossom') {
      drawHeaderBadge(ctx, w, '🌸 桜の思い出 • SAKURA PURIKURA 🌸', '#FF4D79');
      // Corner cherry blossoms
      drawSakuraFlower(ctx, 24, 24, 10);
      drawSakuraFlower(ctx, w - 24, 24, 10);
      drawSakuraFlower(ctx, 24, h - 24, 10);
      drawSakuraFlower(ctx, w - 24, h - 24, 10);
    } else if (frame.id === 'kawaii_ribbon') {
      drawHeaderBadge(ctx, w, '🎀 SWEET MEMORIES • だいすき 🎀', '#FF1493');
      // Corner bow ties
      drawMiniBow(ctx, 24, 24);
      drawMiniBow(ctx, w - 24, 24);
      drawMiniHeart(ctx, 24, h - 24);
      drawMiniHeart(ctx, w - 24, h - 24);
    } else if (frame.id === 'neko_paw') {
      drawHeaderBadge(ctx, w, '🐾 NEKO CAFE • にゃんこ 🐾', '#8B5A2B');
      // Cat ears at top center
      drawCatEars(ctx, w / 2, 14);
      // Paw prints in corners
      drawMiniPaw(ctx, 24, h - 24);
      drawMiniPaw(ctx, w - 24, h - 24);
    } else if (frame.id === 'kyoto_matcha') {
      drawHeaderBadge(ctx, w, '🍵 京都 • 記念写真 • KYOTO TEA 🍵', '#387032');
      // Bamboo corner brackets
      drawCornerBrackets(ctx, w, h, '#7EBD75');
    } else if (frame.id === 'y2k_sparkle') {
      drawHeaderBadge(ctx, w, '✨ ✧ PURIKURA 2026 ✧ ✨', '#7E57C2');
      drawSparkle(ctx, 24, 24);
      drawSparkle(ctx, w - 24, 24);
      drawSparkle(ctx, 24, h - 24);
      drawSparkle(ctx, w - 24, h - 24);
    } else {
      // Minimal White
      drawHeaderBadge(ctx, w, '★ プリクラ • PURIKURA STUDIO ★', '#5C5251');
    }
    ctx.restore();
  }

  function drawHeaderBadge(ctx, totalW, text, color) {
    ctx.fillStyle = color;
    ctx.font = 'bold 13px "Zen Maru Gothic", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, totalW / 2, 34);
  }

  function drawSakuraFlower(ctx, cx, cy, r) {
    ctx.save();
    ctx.fillStyle = '#FFB6C1';
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5;
      const px = cx + Math.cos(angle) * r;
      const py = cy + Math.sin(angle) * r;
      ctx.beginPath();
      ctx.arc(px, py, r * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#FF4D79';
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawMiniBow(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = '#FF69B4';
    ctx.beginPath();
    ctx.ellipse(x - 6, y, 7, 4, -0.2, 0, Math.PI * 2);
    ctx.ellipse(x + 6, y, 7, 4, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FF1493';
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawMiniHeart(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = '#FF69B4';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('♡', x, y);
    ctx.restore();
  }

  function drawMiniPaw(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = '#E0A96D';
    ctx.beginPath();
    ctx.ellipse(x, y + 2, 7, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    [-5, -2, 2, 5].forEach(dx => {
      ctx.beginPath();
      ctx.arc(x + dx, y - 5, 2, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  function drawCatEars(ctx, cx, cy) {
    ctx.save();
    ctx.fillStyle = '#E0A96D';
    ctx.strokeStyle = '#8B5A2B';
    ctx.lineWidth = 1.5;
    // Left ear
    ctx.beginPath();
    ctx.moveTo(cx - 35, cy + 10);
    ctx.lineTo(cx - 24, cy - 6);
    ctx.lineTo(cx - 13, cy + 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Right ear
    ctx.beginPath();
    ctx.moveTo(cx + 13, cy + 10);
    ctx.lineTo(cx + 24, cy - 6);
    ctx.lineTo(cx + 35, cy + 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawCornerBrackets(ctx, w, h, col) {
    ctx.save();
    ctx.strokeStyle = col;
    ctx.lineWidth = 2.5;
    const len = 14;
    // 4 brackets
    [[18, 18, 1, 1], [w - 18, 18, -1, 1], [18, h - 18, 1, -1], [w - 18, h - 18, -1, -1]].forEach(([x, y, sx, sy]) => {
      ctx.beginPath();
      ctx.moveTo(x + len * sx, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + len * sy);
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawSparkle(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = '#B39DDB';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦', x, y);
    ctx.restore();
  }

  // ================= ASPECT-RATIO PRESERVING PHOTO DRAWER =================
  function drawSlotPhoto(ctx, photo, x, y, w, h, activeFilterCss) {
    ctx.save();
    // Soft shadow
    ctx.shadowColor = 'rgba(92, 82, 81, 0.14)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;

    // White polaroid border around each photo
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(x - 5, y - 5, w + 10, h + 10, 14);
    ctx.fill();

    if (photo) {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 10);
      ctx.clip();

      // Apply active filter if requested
      if (activeFilterCss && activeFilterCss !== 'none') {
        ctx.filter = activeFilterCss;
      }

      // Aspect-ratio preserving cover fit (NO SQUISHING / GEPENG!)
      const iw = photo.width || 1280;
      const ih = photo.height || 720;
      const targetRatio = w / h;
      const imgRatio = iw / ih;

      let sx, sy, sw, sh;
      if (imgRatio > targetRatio) {
        // Image is wider than slot -> crop sides
        sh = ih;
        sw = ih * targetRatio;
        sx = (iw - sw) / 2;
        sy = 0;
      } else {
        // Image is taller than slot -> crop top/bottom
        sw = iw;
        sh = iw / targetRatio;
        sx = 0;
        sy = (ih - sh) / 2;
      }

      ctx.drawImage(photo, sx, sy, sw, sh, x, y, w, h);
    } else {
      ctx.fillStyle = '#FAF4EE';
      ctx.fillRect(x, y, w, h);
    }
    ctx.restore();
  }

  // ================= MAIN RENDER LOOP =================
  function renderStudioCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = studioStateRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (s.baseCanvas) {
      ctx.drawImage(s.baseCanvas, 0, 0);
    }

    // Render brush doodles
    s.doodles.forEach(stroke => {
      if (!stroke.points || stroke.points.length < 2) return;
      ctx.save();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
      ctx.restore();
    });

    // Render active drawing stroke
    if (s.currentStroke && s.currentStroke.points.length > 1) {
      ctx.save();
      ctx.strokeStyle = s.currentStroke.color;
      ctx.lineWidth = s.currentStroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(s.currentStroke.points[0].x, s.currentStroke.points[0].y);
      for (let i = 1; i < s.currentStroke.points.length; i++) {
        ctx.lineTo(s.currentStroke.points[i].x, s.currentStroke.points[i].y);
      }
      ctx.stroke();
      ctx.restore();
    }

    // Render placed stickers
    s.stickers.forEach(stk => {
      ctx.save();
      ctx.translate(stk.x + stk.width / 2, stk.y + stk.height / 2);
      ctx.rotate(stk.rotation || 0);

      // Selected highlight ring
      if (s.selectedSticker === stk) {
        ctx.strokeStyle = '#FF1493';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(-stk.width / 2 - 4, -stk.height / 2 - 4, stk.width + 8, stk.height + 8);
      }

      ctx.drawImage(stk.img, -stk.width / 2, -stk.height / 2, stk.width, stk.height);
      ctx.restore();
    });
  }

  // ================= POINTER / TOUCH HANDLERS =================
  function getPointerCanvasPos(e) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function handlePointerDown(e) {
    const { x, y } = getPointerCanvasPos(e);
    const s = studioStateRef.current;

    // Check sticker selection
    let clickedStk = null;
    for (let i = s.stickers.length - 1; i >= 0; i--) {
      const stk = s.stickers[i];
      if (x >= stk.x && x <= stk.x + stk.width && y >= stk.y && y <= stk.y + stk.height) {
        clickedStk = stk;
        break;
      }
    }

    if (clickedStk) {
      s.selectedSticker = clickedStk;
      s.isDraggingSticker = true;
      s.dragStart = { x: x - clickedStk.x, y: y - clickedStk.y };
      renderStudioCanvas();
      return;
    }

    s.selectedSticker = null;

    if (activeTab === 'pen') {
      s.isDrawing = true;
      s.currentStroke = {
        color: brushColor,
        size: brushSize,
        points: [{ x, y }]
      };
    }
  }

  function handlePointerMove(e) {
    const { x, y } = getPointerCanvasPos(e);
    const s = studioStateRef.current;

    if (s.isDraggingSticker && s.selectedSticker) {
      s.selectedSticker.x = x - s.dragStart.x;
      s.selectedSticker.y = y - s.dragStart.y;
      renderStudioCanvas();
    } else if (s.isDrawing && s.currentStroke) {
      s.currentStroke.points.push({ x, y });
      renderStudioCanvas();
    }
  }

  function handlePointerUp() {
    const s = studioStateRef.current;
    if (s.isDrawing && s.currentStroke) {
      s.doodles.push(s.currentStroke);
      s.currentStroke = null;
    }
    s.isDrawing = false;
    s.isDraggingSticker = false;
  }

  function addSticker(stk) {
    sfx.playStamp();
    const canvas = canvasRef.current;
    const img = new Image();
    img.src = getStickerDataUrl(stk.svg);
    img.onload = () => {
      const size = stk.category === 'speech' ? 90 : 70;
      const w = stk.category === 'speech' ? 120 : size;
      const h = stk.category === 'speech' ? 52 : size;

      studioStateRef.current.stickers.push({
        id: stk.id + '_' + Date.now(),
        img,
        x: (canvas.width - w) / 2 + (Math.random() - 0.5) * 40,
        y: (canvas.height - h) / 2 + (Math.random() - 0.5) * 40,
        width: w,
        height: h,
        rotation: (Math.random() - 0.5) * 0.15
      });
      renderStudioCanvas();
    };
  }

  function addCustomTextStamp() {
    if (!customText.trim()) return;
    sfx.playStamp();
    const canvas = canvasRef.current;
    const txt = customText.trim();

    const svg = `<svg viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="152" height="42" rx="21" fill="#FFF0F5" stroke="#FF7597" stroke-width="3"/>
      <text x="80" y="32" font-family="'Zen Maru Gothic', sans-serif" font-weight="900" font-size="16" fill="#FF4D79" text-anchor="middle">♡ ${txt} ♡</text>
    </svg>`;

    const img = new Image();
    img.src = getStickerDataUrl(svg);
    img.onload = () => {
      studioStateRef.current.stickers.push({
        id: 'custom_text_' + Date.now(),
        img,
        x: (canvas.width - 130) / 2,
        y: canvas.height / 2 - 25,
        width: 130,
        height: 44,
        rotation: -0.05
      });
      renderStudioCanvas();
    };
    setCustomText('');
  }

  function clearAllDecorations() {
    sfx.playClick();
    studioStateRef.current.doodles = [];
    studioStateRef.current.stickers = [];
    studioStateRef.current.selectedSticker = null;
    renderStudioCanvas();
  }

  function finishAndSave() {
    sfx.playSuccess();
    const canvas = canvasRef.current;
    if (!canvas) return;
    studioStateRef.current.selectedSticker = null;
    renderStudioCanvas();

    const finalDataUrl = canvas.toDataURL('image/png');
    onFinishStudio(finalDataUrl);
  }

  return (
    <section className="studio-section">
      <div className="studio-container">
        {/* Strip Preview Desk */}
        <div className="studio-desk kawaii-card">
          <canvas
            ref={canvasRef}
            className="studio-canvas"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          />
        </div>

        {/* Tools Palette Sidebar */}
        <aside className="studio-tools kawaii-card">
          {/* Tool Tabs */}
          <div className="tool-tabs">
            <button
              className={`tab-btn ${activeTab === 'stickers' ? 'active' : ''}`}
              onClick={() => {
                sfx.playClick();
                setActiveTab('stickers');
              }}
            >
              🌸 Stiker
            </button>
            <button
              className={`tab-btn ${activeTab === 'pen' ? 'active' : ''}`}
              onClick={() => {
                sfx.playClick();
                setActiveTab('pen');
              }}
            >
              ✏️ Kuas
            </button>
            <button
              className={`tab-btn ${activeTab === 'frames' ? 'active' : ''}`}
              onClick={() => {
                sfx.playClick();
                setActiveTab('frames');
              }}
            >
              🖼️ Bingkai
            </button>
            <button
              className={`tab-btn ${activeTab === 'filters' ? 'active' : ''}`}
              onClick={() => {
                sfx.playClick();
                setActiveTab('filters');
              }}
            >
              🎨 Filter
            </button>
          </div>

          {/* TAB 1: STICKERS */}
          {activeTab === 'stickers' && (
            <div className="tab-body">
              <span className="tool-hint">Klik stiker untuk menempelkan ke foto:</span>
              <div className="stickers-grid">
                {STICKERS.map(stk => (
                  <button
                    key={stk.id}
                    className="btn-sticker-item"
                    onClick={() => addSticker(stk)}
                    title={stk.name}
                  >
                    <div
                      className="sticker-thumb"
                      dangerouslySetInnerHTML={{ __html: stk.svg }}
                    />
                    <span className="sticker-name">{stk.name}</span>
                  </button>
                ))}
              </div>

              {/* Custom Text Stamp */}
              <div className="custom-stamp-box">
                <span className="tool-hint">Tulis Teks Stempel Kustom:</span>
                <div className="stamp-input-wrap">
                  <input
                    type="text"
                    value={customText}
                    onChange={e => setCustomText(e.target.value)}
                    placeholder="BESTIES 2026"
                    maxLength={15}
                    className="stamp-input"
                  />
                  <button className="btn-kawaii btn-primary btn-sm" onClick={addCustomTextStamp}>
                    + Tempel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PASTEL BRUSH */}
          {activeTab === 'pen' && (
            <div className="tab-body">
              <span className="tool-hint">Pilih Warna Coretan Pastel:</span>
              <div className="color-swatches-grid">
                {BRUSH_COLORS.map(c => (
                  <button
                    key={c.id}
                    className={`color-swatch ${brushColor === c.color ? 'active' : ''}`}
                    style={{ backgroundColor: c.color }}
                    onClick={() => {
                      sfx.playClick();
                      setBrushColor(c.color);
                    }}
                    title={c.name}
                  />
                ))}
              </div>

              <div className="brush-size-group">
                <span className="tool-hint">Ketebalan Kuas: {brushSize}px</span>
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={brushSize}
                  onChange={e => setBrushSize(parseInt(e.target.value, 10))}
                  className="range-input"
                />
              </div>

              <button className="btn-kawaii btn-secondary btn-sm" onClick={clearAllDecorations} style={{ marginTop: '12px' }}>
                <span>Hapus Semua Coretan & Stiker 🗑️</span>
              </button>
            </div>
          )}

          {/* TAB 3: THEMED FRAMES */}
          {activeTab === 'frames' && (
            <div className="tab-body">
              <span className="tool-hint">Ganti Tema Bingkai Strip:</span>
              <div className="frames-list">
                {FRAME_STYLES.map(fr => (
                  <button
                    key={fr.id}
                    className={`frame-option-btn ${frameStyle === fr.id ? 'active' : ''}`}
                    onClick={() => {
                      sfx.playClick();
                      setFrameStyle(fr.id);
                    }}
                  >
                    <span className="frame-icon-badge">{fr.icon}</span>
                    <div className="frame-meta">
                      <strong>{fr.name}</strong>
                      <small>{fr.sub}</small>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CAMERA PHOTO FILTERS */}
          {activeTab === 'filters' && (
            <div className="tab-body">
              <span className="tool-hint">Ganti Efek Warna Foto (Live Filter):</span>
              <div className="frames-list">
                {FILTERS.map(f => (
                  <button
                    key={f.id}
                    className={`frame-option-btn ${filter === f.id ? 'active' : ''}`}
                    onClick={() => {
                      sfx.playClick();
                      setFilter(f.id);
                    }}
                  >
                    <span className="frame-icon-badge">{f.icon}</span>
                    <div className="frame-meta">
                      <strong>{f.name}</strong>
                      <small>{f.sub}</small>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Finish & Save Button */}
          <div className="studio-footer-cta">
            <button className="btn-kawaii btn-primary btn-finish-strip" onClick={finishAndSave}>
              <span>Selesai & Simpan Foto 🌸</span>
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

# プリクラ ★ Purikura Studio — Japanese Kawaii Cam (React + Vite)

Aplikasi bilik foto (*photobooth*) interaktif berbasis **React.js + Vite** dengan estetika **Clean Modern Japanese Kawaii (プリクラ・スタジオ)** — meninggalkan gaya gelap/neon cyberpunk dan beralih ke nuansa pastel sakura yang lembut, bersih, manis, dan elegan, dikendalikan secara nirkabel dengan gestur tangan AI (**Google MediaPipe Hands**).

---

## 🔬 PENDEKATAN KONSEP A.T.M (AMATI - TIRU - MODIFIKASI)

| Aspek | 1. AMATI (`puzzle_cam`) | 2. TIRU (Fondasi) | 3. MODIFIKASI (`purikura_cam` React) |
| :--- | :--- | :--- | :--- |
| **Framework & Arsitektur** | Vanilla HTML/JS modul statis. | Logika webcam canvas dan tracking tangan real-time. | **React 19 + Vite**: Struktur komponen modular (`Header`, `Lobby`, `Booth`, `Minigame`, `DecoratorStudio`, `FinishScreen`) dengan *state management* reaktif dan *Hot Module Replacement (HMR)* super cepat. |
| **Tema & Gaya Visual** | Nuansa kertas cokelat scrapbook (*paper & tape*). | Format strip foto vertikal dan grid kuadran. | **Clean Modern Japanese Kawaii**: Menggunakan palet lembut *Sakura Pink* (#FF7597), *Warm Milk Cream* (#FFFDF9), *Matcha Green* (#7EBD75), tipografi bulat Jepang (*Zen Maru Gothic*), floating sakura petals, dan kartu glassmorphism modern. |
| **Kontrol Gestur AI (Google MediaPipe)** | Gestur **Frame** (🫶) untuk foto, **Pinch** (🤏) untuk geser kepingan puzzle, dan **Fist** (✊) untuk mengunci foto. | **Disamakan Persis!** Menggunakan **Google MediaPipe Hands** murni: gestur **Frame** (🫶) untuk foto, **Pinch** (🤏) untuk mengambil & menggeser kepingan puzzle, dan **Fist** (✊) untuk mengunci (*lock & save*). | Ditambahkan opsi pose **Peace Sign (✌️)** dan **Open Palm (🖐️)** sebagai alternatif cepat, serta kerangka tangan pastel *sakura beads*. |
| **Fase Minigame Interaktif** | Wajib *3x3 Sliding Puzzle*. | Konsep permainan penyusunan kepingan pecahan foto interaktif. | **Opsi Alur Fleksibel:**<br>1. 🧩 **3x3 Photo Puzzle (ATM Utama)** (Susun kepingan foto dengan Pinch 🤏 dan kunci dengan Fist ✊).<br>2. ⚡ **Direct to Studio** (Lewati minigame langsung ke studio dekorasi). |
| **Efek Audio (SFX)** | Hening / tanpa efek suara. | - | **Kawaii Web Audio API Synthesizer**: Suara marimba lembut, jepretan kamera manis, nada *pop*, *snap* puzzle, dan melodi selebrasi kemenangan Do-Mi-Sol-Do Jepang tanpa ketergantungan file audio eksternal. |
| **Studio Dekorasi** | Stiker flat standar. | Manipulasi canvas drag-and-drop. | **Kawaii Japanese Sticker Studio**: Stiker SVG khas Jepang (Sakura 桜, Neko Paw 肉球, Onigiri 🍙, Dango だんご, Ribbon 🎀, Usagi 🐰, teks stempel Jepang 「だいすき♡」, 「カワイイ！」), kuas pastel lembut (*Sakura, Mint, Matcha, Butter, Lavender*), dan bingkai strip pastel. |

---

## 🎮 KONTROL GESTUR TANGAN (GOOGLE MEDIAPIPE HANDS)

1. **Jepret Foto Otomatis (Hands-Free):**
   - 🫶 **Pose Bingkai Dua Tangan (Hand Frame):** Bentuk bingkai kotak menggunakan telunjuk & jempol kedua tangan di depan kamera untuk memicu hitung mundur foto 3 detik.
   - ✌️ **Pose Peace Sign (V) & 🖐️ Telapak Terbuka:** Pose foto alternatif manis khas Purikura Jepang jika hanya menggunakan satu tangan.
2. **Minigame Interaktif:**
   - 🤏 **Gestur Mencubit (Pinch):** Satukan ujung telunjuk dan jempol di atas kepingan pecahan puzzle fotomu, lalu geser di udara untuk memindahkannya ke slot yang diinginkan.
   - ✊ **Gestur Kepalan Tangan (Fist):** Setelah kepingan puzzle tersusun rapi, kepalkan tanganmu dan tahan ~1 detik untuk mengunci (*lock & save*) foto.
   - 🧩 **Tombol Selesaikan & ⏩ Lewati:** Tersedia tombol pintas untuk langsung menyelesaikan puzzle jika sedang terburu-buru.

---

## 🚀 CARA MENJALANKAN SECARA LOKAL

### 1. Jalankan Dev Server (Vite):
```bash
npm run dev
```

Akses di browser kesayangan Anda:
```text
http://localhost:5173
```

---

## 🛠️ TEKNOLOGI

- **React 19**
- **Vite 8**
- **Google MediaPipe Tasks Vision (`@mediapipe/tasks-vision`)**
- **Web Audio API Synthesizer**
- **HTML5 Canvas 2D API**
- **Canvas Confetti**
- **Pure Modern CSS (Clean Modern Japanese Kawaii Design System)**
- **Google Fonts (Zen Maru Gothic & Nunito)**

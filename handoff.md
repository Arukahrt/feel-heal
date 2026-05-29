# Feel & Heal — Session Handoff

> Dokumen serah-terima untuk AI agent / developer yang melanjutkan proyek ini.
> Dibagi per fase agar bisa dikerjakan granular. Baca **Bagian A–D** dulu (konteks), lalu kerjakan **Bagian E** (roadmap) sesuai prioritas user.

---

## A. Snapshot Proyek

| Hal | Detail |
|---|---|
| **Nama** | Feel & Heal |
| **Apa ini** | Website layanan pendampingan emosional reflektif (Kelompok 8). Layanan inti: Emotional Check-Up, Guided Healing Session, Follow-Up Support, Roleplay Session. |
| **Audiens** | Mahasiswa (18–25) & pekerja muda di Indonesia. |
| **Bahasa** | Bahasa Indonesia (semua copy). |
| **Sumber konten** | `uploads/Kelompok 8 Feel & Heal.pdf` (24 halaman). Salinan teks bisa dibaca via `uploads/feel-heel.pdf`. SEMUA copy berasal dari sini — jangan mengarang materi baru tanpa konfirmasi user. |
| **Gaya visual** | "Playful / Gen-Z" — sage green, sudut membulat, blob, highlight stabilo, sticker pill, font display Bricolage Grotesque. Dipilih user dari 3 sample. |
| **Tech** | HTML + CSS + vanilla JS murni. TANPA framework/build step. Multi-halaman, mobile-first. |
| **Status** | Situs 4 halaman selesai & terverifikasi (desktop + mobile). Mini check-up interaktif berfungsi. |

---

## B. Peta File

| File | Peran | Catatan |
|---|---|---|
| `index.html` | **Beranda** | Hero, tentang singkat, untuk siapa, layanan, alur, keunggulan, CTA, footer. |
| `layanan.html` | **Layanan** | Detail 4 layanan, **Mini Emotional Check-Up** (`#checkup`), paket, langkah penggunaan. |
| `tentang.html` | **Tentang** | Latar belakang, target market, konsep & output klien, keunggulan. |
| `kontak.html` | **Kontak** | Saluran resmi, panel hubungi admin (`#admin`). |
| `site.css` | **Stylesheet tunggal** | Semua token + komponen + responsif. Mobile-first. |
| `site.js` | **Semua interaksi** | Nav drawer, scroll-reveal, mini check-up + logika AI/fallback. |
| `Feel & Heal Hero Samples.html` | Arsip eksplorasi | 3 sample hero awal (canvas). + `styles.css`, `heroes.jsx`, `design-canvas.jsx`. **JANGAN dipakai untuk produksi** — hanya referensi pilihan visual. |
| `styles.css`, `heroes.jsx`, `design-canvas.jsx` | Pendukung arsip hero | Terpisah dari situs utama. Aman diabaikan. |

> ⚠️ **Jangan tertukar**: situs produksi pakai `site.css` + `site.js`. File `styles.css`/`heroes.jsx` hanya untuk arsip sample hero.

---

## C. Design System (acuan saat mengedit)

### Token warna (`:root` di `site.css`)
```
--cream #f5f3ec   --cream-2 #efe9db   --beige #e8e2d4   --beige-deep #ddd3c0
--sage #9caf88    --sage-soft #b5c4a3 --sage-2 #88a072
--sage-deep #6c8454  --sage-deeper #52683f
--ink #2c3829 (teks utama)  --ink-2 #48543f  --muted #7b836f  --line #d7d2c4
```
- Background section dirotasi pakai class: `.bg-sage`, `.bg-cream2`, `.bg-ink` (+ `.on-sage` untuk konteks teks di atas sage).
- **Jangan menambah warna baru** di luar token. Kalau perlu turunan, pakai `oklch()` dengan chroma rendah agar selaras.

### Tipografi (Google Fonts, di-`<link>` tiap halaman)
- **Display / heading**: `Bricolage Grotesque` (700/800).
- **Body / UI**: `Plus Jakarta Sans` (400–800).
- **Mono / aksen kecil**: `Spline Sans Mono` (label, progress).

### Komponen utama (class di `site.css`)
- `.btn` + varian: `.btn-primary` (ink), `.btn-cream`, `.btn-sage`, `.btn-ghost`.
- `.eyebrow` (pill label kecil), `.hl` (highlight stabilo), `.sticker` (chip).
- `.card`, `.svc` (kartu layanan bernomor), `.adv` (keunggulan), `.price` (paket, `.feat` = unggulan).
- `.flow` (langkah vertikal berdot), `.steps`/`.stepc` (langkah bernomor).
- `.checkup` + state check-up (lihat Bagian D).
- `.nav` + `.drawer` (mobile), `.footer`.
- `[data-reveal]` → animasi muncul saat scroll (opsional `data-reveal-d="1|2|3"` untuk delay).

### Konvensi penting
- **Mobile-first**: base style untuk HP; breakpoint `@media (min-width:720px)` & `(min-width:980px)`. Nav inline + burger-hidden mulai 980px.
- **Layout pakai flex/grid + `gap`** (jangan margin antar-sibling). Grid helper: `.grid`, `.grid-2`, `.grid-3`.
- **HTML kanonik**: tutup semua tag, atribut pakai kutip ganda — supaya editor visual bisa direct-edit.
- Placeholder gambar: `<div class="ph"><span>label</span></div>` (striped + label mono). Ganti dengan `<img>` saat aset tersedia.
- Setiap halaman menduplikasi `<header class="nav">`, `.drawer`, dan `<footer>`. **Kalau mengubah nav/footer, ubah di KEEMPAT halaman** (tidak ada include server-side).

---

## D. Fitur Mini Emotional Check-Up (penting)

Lokasi: `layanan.html` (`<div class="checkup" data-checkup>`) + logika di `site.js` → `initCheckup()`.

- **10 pertanyaan** (`QUESTIONS` array). Tiap opsi: `{t: teks, e: emoji, tag: kode}`.
- Tag per pertanyaan dipakai untuk insight & pemilihan hasil. Q0 menentukan tema utama (anxious/burnout/lost/relationship).
- Alur: pilih opsi → Lanjut → setelah Q10 → `renderResult()` → loading → kartu hasil.

### Saklar AI ⚙️ (BACA INI)
Di `initCheckup()` ada:
```js
var USE_AI = false;   // ← saat ini NON-AI (permintaan user)
```
- **`false`** (sekarang): hasil dibuat dari `fallback()` — pakai `RESULTS` (judul/summary/langkah per tema) + `INSIGHT` (insight dinamis dari jawaban tidur/energi/coping/dll). Badge: "✓ Check-up selesai". Tidak ada klaim AI.
- **`true`**: memanggil `window.claude.complete(prompt)` untuk refleksi **live** (badge "✦ Powered by AI"). Prompt sudah disusun di `renderResult()` dan meminta output JSON `{title, summary, insights[], steps[], affirmation}`.

### ⚠️ Catatan hosting AI
`window.claude` HANYA tersedia di environment preview ini (model Claude bawaan). **Di hosting sendiri, helper itu tidak ada.** Maka:
- Kode sudah aman: kalau `USE_AI=true` tapi `window.claude` tidak ada / error / JSON gagal di-parse → otomatis `fallback()` (non-AI). Tidak crash.
- Untuk AI live di produksi: butuh **API key sendiri** (Anthropic/OpenAI/Gemini) + **backend kecil** (serverless) sebagai proxy. JANGAN menaruh API key di JS sisi-klien. Ganti isi `renderResult()` agar `fetch()` ke endpoint backend itu (output JSON sama → `renderCard()` tinggal dipakai).

---

## E. Roadmap Berfase (granular)

> Tiap fase berdiri sendiri. Konfirmasi prioritas ke user sebelum mulai. Setelah selesai tiap fase: cek di preview (mobile + desktop), pastikan tidak ada error console, lalu lapor.

### Fase 0 — Orientasi (wajib sebelum apa pun)
- [ ] Baca dokumen ini + skim `site.css` (token & komponen) dan `site.js` (`initCheckup`).
- [ ] Buka keempat halaman di preview, jalankan check-up sampai hasil.
- **Selesai bila**: paham peta file, design system, dan saklar `USE_AI`.

### Fase 1 — Aset & Data Asli (prioritas tinggi untuk go-live)
- [ ] Ganti semua `.ph` placeholder dengan `<img>` asli (hero, kartu). Pertahankan rasio & `border-radius`.
- [ ] Ganti kontak dummy → asli: `08xx-xxxx-xxxx` (WA), `@feelandheal.id` (IG), link landing. Cari di keempat halaman + footer + `kontak.html` (`#admin`).
- [ ] Sambungkan tombol WA/IG ke URL nyata (`https://wa.me/62...`, `https://instagram.com/...`).
- [ ] Tambahkan favicon + logo brand asli (saat ini logo = inisial "F").
- **Selesai bila**: tidak ada placeholder/nomor dummy tersisa; semua CTA mengarah ke tujuan nyata.

### Fase 2 — Polish Konten & Meta
- [ ] Tambah `<meta name="description">`, Open Graph (`og:title/description/image`) tiap halaman.
- [ ] Cek ejaan/konsistensi istilah (Emotional Check-Up vs check-up, dll).
- [ ] `<title>` unik & deskriptif per halaman (sudah ada, tinjau ulang).
- **Selesai bila**: tiap halaman punya meta SEO + share preview yang benar.

### Fase 3 — Penyempurnaan Check-Up (non-AI)
- [ ] Tambah **skor/persentase per dimensi** (mis. tingkat cemas, energi, dukungan) sebagai bar ringkas di hasil — perkaya `fallback()`.
- [ ] Tambah tombol **"Simpan / screenshot hasil"** atau ringkasan yang bisa di-share.
- [ ] (Opsional) Variasikan `RESULTS`/`INSIGHT` agar lebih kaya & tidak repetitif.
- **Selesai bila**: hasil non-AI terasa lebih personal & dapat dibagikan, tanpa mengaku AI.

### Fase 4 — Aktivasi AI Live (saat user siap produksi)
- [ ] Putuskan provider + buat backend proxy (mis. Vercel/Netlify Function) yang menyimpan API key di env var.
- [ ] Ubah `renderResult()` agar memanggil endpoint backend (bukan `window.claude`), kontrak JSON tetap sama.
- [ ] Set `USE_AI = true`, uji termasuk skenario gagal (harus fallback mulus).
- [ ] Tambah rate-limit/guard di backend agar kuota aman.
- **Selesai bila**: hasil AI live jalan di hosting nyata, dan tetap aman saat API gagal.

### Fase 5 — Section Tambahan (jika diminta user)
- [ ] **Testimoni** (placeholder dulu) — pola kartu `.card` + sticker.
- [ ] **FAQ** — accordion sederhana (vanilla JS, ikuti gaya komponen).
- [ ] Tautkan dari nav/footer bila jadi halaman terpisah.
- **Selesai bila**: section baru konsisten dengan design system & responsif.

### Fase 6 — Aksesibilitas & Performa
- [ ] `alt` untuk semua gambar; cek kontras teks pada `.bg-sage`/`.bg-ink`.
- [ ] Fokus keyboard untuk nav drawer, opsi check-up, tombol (state `:focus-visible`).
- [ ] `aria-*` pada burger/drawer & progress check-up.
- [ ] Optimasi gambar (ukuran, lazy-load), cek `prefers-reduced-motion` (sudah dihormati untuk reveal).
- **Selesai bila**: navigasi keyboard penuh, kontras lolos, gambar teroptimasi.

### Fase 7 — Hosting & Rilis
- [ ] Build tidak diperlukan — cukup unggah semua file `.html` + `site.css` + `site.js` + folder aset.
- [ ] Pastikan path relatif tetap (file di root). `index.html` = halaman utama.
- [ ] Uji di domain nyata: navigasi antar-halaman, anchor (`#checkup`, `#admin`), check-up, mobile.
- **Selesai bila**: situs live, semua tautan & fitur berfungsi di domain produksi.

---

## F. Gotchas / Jangan Lupa
1. **Nav & footer diduplikasi** di 4 halaman — sinkronkan manual saat berubah.
2. **`window.claude` ≠ portable** — hanya di environment ini (lihat Bagian D).
3. **Kelas aktif nav** (`.active`) berbeda per halaman — set sesuai halaman.
4. **Jangan pakai `scrollIntoView`** untuk fitur produksi yang mengubah scroll utama; pakai anchor `href="#id"` + `scroll-behavior:smooth` (sudah aktif).
5. **Konten = dari PDF.** Tambahan materi baru → konfirmasi user dulu.
6. Animasi reveal: elemen dengan `[data-reveal]` mulai `opacity:0`. Kalau menambah section, ingat tambahkan/atau JANGAN tambahkan atribut ini sesuai kebutuhan (tanpa JS aktif, mereka tetap tampil karena fallback observer).

---

*Terakhir diperbarui: Mei 2026. Status: 4 halaman live di preview, check-up mode NON-AI (`USE_AI=false`), kode AI dipertahankan & siap diaktifkan.*

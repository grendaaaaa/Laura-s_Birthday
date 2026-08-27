# "A Little Surprise For You" — Interactive Birthday Surprise Website

Sebuah website interaktif romantis, elegan, dan cinematic yang dirancang khusus sebagai kado digital ulang tahun pacar (GF) Anda. 

Website ini dirancang menggunakan HTML5, CSS3, dan Vanilla JavaScript murni tanpa membutuhkan backend (server-less), sehingga sangat mudah di-hosting dan dapat dijalankan langsung secara lokal.

---

## 📂 Struktur Folder Proyek

Untuk melengkapi aset, letakkan file foto dan lagu sesuai dengan struktur di bawah ini:

```text
birthday-surprise/
│
├── index.html
├── style.css
├── script.js
│
├── assets/
│   ├── photos/
│   │   ├── photo1.jpg   (Foto 1)
│   │   ├── photo2.jpg   (Foto 2)
│   │   ├── photo3.jpg   (Foto 3)
│   │   ├── photo4.jpg   (Foto 4)
│   │   ├── photo5.jpg   (Foto 5)
│   │   ├── photo6.jpg   (Foto 6)
│   │   ├── photo7.jpg   (Foto 7)
│   │   └── photo8.jpg   (Foto 8)
│   │
│   └── music/
│       └── our-song.mp3  (Lagu romantis pilihan Anda)
│
└── README.md
```

> 💡 **Fallback Cerdas**: Jika file foto (`.jpg`) atau lagu (`.mp3`) tidak ditemukan atau belum dimasukkan, website tidak akan crash. Website akan secara otomatis mendeteksi error dan menampilkan placeholder visual bergradasi romantis dengan ikon hati yang indah untuk foto, serta menampilkan instruksi toast agar Anda tahu lokasi penempatan file lagu.

---

## ⚙️ Kustomisasi (Cara Mengubah Konten)

Buka file [script.js](file:///d:/web%20gf/script.js). Di bagian paling atas terdapat konfigurasi utama (`CONFIG`) dan data foto (`PHOTOS`). Anda hanya perlu menyesuaikan nilai di bawah ini:

### 1. Informasi Utama (`CONFIG`)
* **`girlfriendName`**: Nama pacar Anda yang akan tampil di halaman.
* **`secretPin`**: PIN/Kode rahasia (contoh: tanggal jadian, tanggal lahir) untuk membuka kejutan pertama.
* **`birthdayDate`**: Target waktu ulang tahun (format ISO dengan Timezone Asia/Jakarta `+07:00` / WIB). Jika waktu saat ini sudah melewati target, website akan otomatis memicu transisi ulang tahun secara instan tanpa menghitung mundur ke angka negatif.
* **`music`**: Judul lagu, artis, dan file path untuk lagu background.
* **`birthdayMessage`**: Pesan ulang tahun utama yang akan diketik otomatis dengan efek typewriter.
* **`loveLetter`**: Isi surat cinta panjang Anda yang berada di dalam amplop 3D.

### 2. Caption Foto (`PHOTOS`)
Sesuaikan teks caption pada masing-masing item di array `PHOTOS` agar sesuai dengan memori atau momen di setiap foto.

---

## 🎨 Fitur-Fitur Unggulan

1. **Ambient Night Atmosphere**: Background bergradasi gelap midnight dengan orbs bercahaya yang bergerak lambat, canvas partikel bintang berkilau, dan subtle grain/noise filter.
2. **Interactive PIN Pad**: Keyboard khusus di layar dengan respons visual dinamis dan getar (shake) jika PIN salah.
3. **Real-time UTC+7 Countdown**: Penghitung mundur akurat yang sinkron dengan WIB.
4. **SVG Blowable Candle**: Lilin interaktif yang ditiup menggunakan microphone (meminta izin browser) atau dimatikan dengan sekali tap/klik (menampilkan asap).
5. **Typewriter Message**: Pesan romantis yang muncul huruf demi huruf secara natural dengan kursor berkedip.
6. **Polaroid Parallax Gallery**: Foto-foto tersebar acak secara artistik pada desktop dengan rotasi bervariasi dan efek melayang, yang berubah menjadi grid responsif pada mobile. Dilengkapi dengan full lightbox modal (navigasi ESC, panah kanan/kiri).
7. **3D Love Letter Envelope**: Surat cinta dengan efek membuka tutup lipatan amplop 3D yang sangat halus.
8. **Fixed Mini Player**: Audio player melayang yang elegan di pojok bawah lengkap dengan progress bar, pengatur volume, detail lagu, dan mock visualizer equalizer bars.
9. **Easter Eggs**: 3 buah hati kecil tersembunyi yang jika ditemukan/diklik akan memunculkan pesan pemberitahuan khusus.

---

## 🚀 Cara Menjalankan

1. Buka folder proyek ini di browser Anda (klik dua kali `index.html`).
2. Agar mic-blowing (fitur tiup lilin dengan mikrofon) berfungsi sepenuhnya di beberapa browser, disarankan menjalankan menggunakan server lokal ringan (seperti ekstensi **Live Server** di VS Code, atau `npx http-server` via terminal).

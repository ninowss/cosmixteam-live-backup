# Handover — COSMIXTEAM live backup

Tanggal: **28 Oktober 2026 (WIB)**. Pemilik repo: **ninowss / Nino**.

**Pembaruan 29 Oktober 2026:** Nino telah meminta go-live setelah menerima persetujuan Iki. V6 dari commit `f23b914020b48b5aeb714ab3c52e5b21772ad0fa` kini live di `/cosmixteam/`. Catatan menunggu instruksi di bawah menjelaskan kondisi saat snapshot 28 Oktober. Backup awal, arsip, checksum dan tag tetap tidak berubah. Detail: [GO-LIVE-20261029.md](GO-LIVE-20261029.md).

## Tujuan dan status

Nino meminta repo backup terpisah yang mudah dicari, public, lengkap dengan handover, sebagai persiapan bila Iki meminta preview menggantikan halaman utama. Repo ini menyimpan versi produksi lama sebelum penggantian tersebut.

- Sumber backup: folder Hostinger `public_html/cosmixteam/`, bukan hasil build lokal atau folder preview.
- URL produksi saat pengambilan: `https://ninows.pro/cosmixteam/`.
- Waktu arsip diunduh: 28 Oktober 2026, 22:05 WIB.
- Arsip asli: `archives/cosmixteam-live-20261028-2205-WIB.zip`.
- Hasil ekstraksi: `snapshot/cosmixteam/` (69 file; 10.583.805 byte).
- Tag acuan rollback: `live-before-preview-20261028`.
- Tidak ada upload, restore, atau penggantian halaman produksi dalam pekerjaan backup ini.

## Pekerjaan preview yang sudah selesai

Preview terbaru: `https://ninows.pro/cosmixteam-preview/?qa=booking-space-20261028#contact`.

Source berada di repo `https://github.com/ninowss/ninows-pro`, branch `codex/cosmix-preview-handoff-20261027`, commit `bbfead5fdc679a0a825d6eddaaf8e605a06572a1`. Baca `AGENTS.md` dan `docs/cosmix-preview-handoff.md` di repo tersebut sebelum melanjutkan perubahan.

Versi preview memakai tema editorial Jepang putih/hitam/biru muda; heading Portfolio.; empat blok foto berurutan Iki/Nayota/Iki/Nayota; crop dan proporsi foto yang sudah disetujui; gambar responsif; serta easter egg Inosuke dengan dialog opt-in. Revisi 28 Oktober sudah online di route preview dan sudah di-push ke GitHub:

- Pembersihan mulai POV DATA: hapus Behind the frames., nama Jepang dan RIZKI, bio, serta rate notes 01–05.
- Hapus lingkaran kecil di dekat judul profil dan di kartu event 150K.
- Hapus SOLO ROUTE · LOWKEYIKI di footer.
- Perbaiki spasi “Info & booking.” pada mobile.
- Rate event tetap 100K/15 menit dan 150K/30 menit; project memakai DM UNTUK RATE.

Foto asli tidak ditimpa. Desain, urutan foto, crop, proporsi dan bagian atas yang disetujui harus dipertahankan. Nino OS, Gym dan route lain di luar permintaan tidak boleh ikut diubah.

## Sebelum promosi preview ke halaman utama

Status saat handover: **menunggu instruksi eksplisit Nino untuk go-live**. Permintaan membuat backup belum merupakan instruksi deploy.

Jika promosi kemudian diminta:

1. Periksa status Git dan handoff terbaru. Jangan reset atau menimpa perubahan lokal yang belum di-commit.
2. Periksa apakah halaman live berubah setelah snapshot ini. Jika berubah, buat snapshot tambahan sebelum menimpa; pertahankan tag backup awal.
3. Siapkan paket hanya untuk route `/cosmixteam/`, dengan semua gambar responsif yang direferensikan. Periksa URL canonical, metadata, link dan path aset untuk route tujuan. Jangan menyalin `.htaccess` root atau folder route lain.
4. Jalankan pemeriksaan preview yang diwajibkan repo sumber dan tinjau desktop serta mobile. Pertahankan preview tersendiri agar tetap dapat ditinjau.
5. Setelah upload yang diminta, verifikasi URL publik `/cosmixteam/`, gambar, booking link dan easter egg. Push Git saja bukan bukti deployment berhasil.
6. Catat tanggal deploy, commit source dan hasil pemeriksaan. Bila perlu rollback, gunakan langkah di bawah.

## Restore versi live lama

Jalankan hanya setelah Nino meminta restore. Langkah ini mengganti isi route `/cosmixteam/` dengan snapshot 28 Oktober.

1. Clone atau download repo ini pada tag `live-before-preview-20261028`.
2. Periksa checksum arsip atau file. Contoh Windows:

   ```powershell
   Get-FileHash -Algorithm SHA256 -LiteralPath .\archives\cosmixteam-live-20261028-2205-WIB.zip
   .\Verify-Backup.ps1
   ```

   Hash ZIP harus `26f431b94ffa9a04836bb26e12d4d3392155549bf29738c8613939e06ef0a1fa`. Script hanya membaca dan memeriksa file lokal.

3. Backup isi `/cosmixteam/` yang sedang live pada saat restore, sehingga versi itu tetap bisa dipulihkan juga.
4. Di Hostinger File Manager, masuk tepat ke **`public_html/cosmixteam/`**. Pastikan breadcrumb benar. Jangan ekstrak di root `public_html/`.
5. Upload ZIP asli ke folder tujuan lalu ekstrak di sana, atau upload **isi** `snapshot/cosmixteam/`. Struktur akhirnya harus `public_html/cosmixteam/index.html` dan `public_html/cosmixteam/assets/…`, tanpa folder `cosmixteam/cosmixteam/`.
6. Konfirmasi overwrite hanya berkas dalam folder tujuan. Upload aset terlebih dahulu, HTML terakhir bila upload terpisah. Hindari menghapus aset tambahan sebelum halaman hasil restore diperiksa.
7. Hapus cache yang relevan lewat kontrol hosting jika tersedia, lalu buka URL dengan query baru. Periksa desktop dan mobile: hero, menu, kedua POV, galeri/lightbox, rate, jadwal dan link booking. Jadwal event dalam snapshot adalah konten lama dan mungkin perlu revisi terpisah setelah restore.
8. Bandingkan `index.html`, CSS/JS dan path aset dengan manifest. Respons gambar publik bisa berbeda byte dari file sumber, sebagaimana tercatat pada snapshot; gunakan file Hostinger sebagai acuan pemulihan byte.
9. Setelah selesai, pindahkan atau hapus ZIP upload dari webroot melalui tindakan file yang sesuai, dan tulis catatan restore beserta hasil verifikasi.

## Batas backup dan bukti integritas

69 file dalam arsip cocok dengan hasil ekstraksi. Semua 69 URL publik mengembalikan HTTP 200 saat pemeriksaan; 58 byte hash cocok, 11 PNG/JPG berbeda. HTML, kedua CSS, dan JavaScript semuanya cocok. Detail per file terdapat di `manifest.json`; `sha256` adalah hash sumber Hostinger, `publicSha256` adalah hash respons HTTP yang diamati. Tidak ada perubahan pada file sumber untuk menyamakan respons publik.

Backup tidak mencakup root `.htaccess`, DNS/SSL, akun hosting, database atau font eksternal. Isi folder yang diunduh hanya HTML, CSS, JavaScript dan gambar; tidak ada file `.env`, kredensial atau sesi browser. Foto disimpan apa adanya, tanpa kompresi ulang. Jangan menambahkan token atau informasi login ke catatan publik ini.

## Menambah backup berikutnya

Jangan force-push atau memindahkan tag snapshot awal. Tambahkan snapshot baru dengan tanggal berbeda dan tag baru, lalu dokumentasikan sumber dan checksum. Jangan memakai repo backup sebagai pipeline deploy otomatis.

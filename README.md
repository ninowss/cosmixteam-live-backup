# COSMIXTEAM — backup halaman live

Snapshot folder produksi **`public_html/cosmixteam/`** dari Hostinger, diambil **28 Oktober 2026, 22:05 WIB (UTC+7)**, sebelum rencana penggantian dengan preview baru.

Ini versi live lama di [ninows.pro/cosmixteam/](https://ninows.pro/cosmixteam/), dengan heading “Two POVs. One Party.”, galeri Iki/Nayota, jadwal event dan lightbox. Repo ini public atas permintaan Nino.

## Ambil backup

- [ZIP asli dari Hostinger](archives/cosmixteam-live-20261028-2205-WIB.zip) — sekitar 10 MB, siap diekstrak.
- [File hasil ekstraksi](snapshot/cosmixteam/) — 69 file, total 10.583.805 byte. HTML, CSS, JavaScript dan seluruh gambar dalam folder produksi; termasuk aset yang sedang tidak dipakai.
- [Handover dan panduan restore](HANDOVER.md).
- [Manifest file dan hasil pemeriksaan HTTP](manifest.json), serta [SHA-256 tiap file](SHA256SUMS.txt).

SHA-256 ZIP asli:

```text
26f431b94ffa9a04836bb26e12d4d3392155549bf29738c8613939e06ef0a1fa
```

Tag snapshot: **`live-before-preview-20261028`**. Gunakan tag ini sebagai acuan rollback yang tetap.

## Restore singkat

Setelah Nino meminta restore, upload **isi** `snapshot/cosmixteam/` ke **`public_html/cosmixteam/`**. ZIP asli berisi `index.html` dan `assets/` langsung di tingkat teratas: ekstrak **di dalam** folder tujuan tersebut, bukan di `public_html/`. Baca langkah lengkap di [HANDOVER.md](HANDOVER.md) sebelum menjalankan restore.

## Cakupan dan verifikasi

Backup disalin langsung dari folder Hostinger, tanpa mengubah berkas sumber atau mengompres ulang foto. Semua 69 path diperiksa lewat URL publik dan merespons HTTP 200. HTML, CSS dan JavaScript cocok byte demi byte; total 58 file cocok dengan respons publik. Sebelas gambar PNG/JPG memiliki byte respons publik berbeda dari file dalam arsip Hostinger. Penyebab perbedaan belum dipastikan; backup mempertahankan file sumber Hostinger, bukan menggantinya dengan respons HTTP. Nilai kedua hash tersedia di manifest.

ZIP dan hasil ekstraksi dicocokkan lagi sebelum commit. `.gitattributes` mempertahankan byte snapshot saat checkout, termasuk line ending.

Ini backup satu folder statis. Konfigurasi akun Hostinger, DNS, SSL, konfigurasi server di luar folder, dan font Google tidak diarsipkan. Font Google tetap memerlukan koneksi internet. Tidak ada kredensial atau file sesi browser dalam repo ini. Kepemilikan foto dan karya tetap pada pemiliknya; repo public ini tidak menambahkan lisensi penggunaan ulang.

## Preview baru

Preview yang disetujui ada di [ninows.pro/cosmixteam-preview/](https://ninows.pro/cosmixteam-preview/). Source aktif:

- Repo: [ninowss/ninows-pro](https://github.com/ninowss/ninows-pro).
- Branch: `codex/cosmix-preview-handoff-20261027`.
- Commit terakhir saat backup: [`bbfead5fdc679a0a825d6eddaaf8e605a06572a1`](https://github.com/ninowss/ninows-pro/commit/bbfead5fdc679a0a825d6eddaaf8e605a06572a1).
- Source: `public/cosmixteam-preview/`.

Pada saat snapshot 28 Oktober, penggantian `/cosmixteam/` masih menunggu instruksi Nino. **Update 29 Oktober 2026:** Nino kemudian memberikan instruksi go-live setelah mendapat persetujuan Iki; preview v6 dari commit `f23b914020b48b5aeb714ab3c52e5b21772ad0fa` sudah diterbitkan ke halaman utama. Snapshot dan tag backup lama tetap utuh untuk rollback. Lihat [catatan go-live](GO-LIVE-20261029.md).

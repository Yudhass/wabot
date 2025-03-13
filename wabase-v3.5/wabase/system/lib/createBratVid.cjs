const { createCanvas } = require("canvas");
const crypto = require("crypto");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

module.exports = (text, opts) => {
  const getRandomName = () => crypto.randomBytes(7).toString("hex");

  const width = opts?.width || 600;
  const height = opts?.height || 600;

  // Buat folder untuk menyimpan gambar (jika belum ada)
  const framesDir = path.join(process.cwd(), "system/data/images/brats");
  if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir, { recursive: true });
  }

  // Fungsi membagi teks menjadi grup 2 kata per baris, 2 baris per gambar
  function splitTextIntoFrames(text) {
    const words = text.split(/\s+/); // Pisahkan kata berdasarkan spasi
    let frames = [];

    for (let i = 0; i < words.length; i += 4) {
      let line1 = words.slice(i, i + 2).join(" "); // Baris pertama (2 kata)
      let line2 = words.slice(i + 2, i + 4).join(" "); // Baris kedua (2 kata)
      frames.push([line1, line2].filter(Boolean)); // Hapus baris kosong jika kurang dari 4 kata
    }

    return frames;
  }

  // Fungsi mendapatkan ukuran font maksimal berdasarkan width
  function getMaxFontSize(ctx, lines, maxWidth) {
    let fontSize = Math.floor(width * 0.2); // Mulai dari 15% dari lebar
    ctx.font = `${fontSize}px Arial`;

    while (
      lines.some((line) => ctx.measureText(line).width > maxWidth) &&
      fontSize > 10
    ) {
      fontSize--; // Kurangi jika terlalu lebar
      ctx.font = `${fontSize}px Arial`;
    }

    return fontSize;
  }

  // Fungsi menggambar teks pada canvas dan menyimpannya sebagai gambar
  function createImage(lines, index) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Latar belakang putih
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);

    // Warna teks hitam
    ctx.fillStyle = "#000";
    let maxWidth = width * 0.9;
    let centerX = width / 2;

    // Tentukan ukuran font optimal
    let fontSize = getMaxFontSize(ctx, lines, maxWidth);
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Posisi untuk 2 baris
    let lineHeight = fontSize * 1.5;
    let startY = height / 2 - (lines.length - 1) * (lineHeight / 2);

    // Gambar teks di tengah
    lines.forEach((line, i) => {
      ctx.fillText(line, centerX, startY + i * lineHeight);
    });

    // Simpan gambar
    let filePath = path.join(framesDir, `${getRandomName()}_${index}.png`);
    fs.writeFileSync(filePath, canvas.toBuffer("image/png"));
    console.log(`Frame ${index} disimpan: ${filePath}`);
    return filePath;
  }

  // Proses pembuatan semua gambar dari teks
  function generateFrames(text) {
    let frames = splitTextIntoFrames(text);
    let frameFiles = [];

    frames.forEach((lines, index) => {
      frameFiles.push(createImage(lines, index));
    });

    return frameFiles;
  }

  // Fungsi menggabungkan semua gambar menjadi video menggunakan FFmpeg
  function createVideoFromFrames(frameFiles) {
    const outputVideo = path.join(framesDir, `${getRandomName()}.mp4`);

    // Buat file daftar gambar untuk FFmpeg
    const listFile = path.join(framesDir, `${getRandomName()}.txt`);
    fs.writeFileSync(
      listFile,
      frameFiles.map((file) => `file '${file}'\nduration 1`).join("\n") + "\n",
    ); // 3 detik per frame

    // Jalankan FFmpeg untuk membuat video
    const ffmpegCommand = `ffmpeg -f concat -safe 0 -i ${listFile} -vf "scale=${width}:${height},format=yuv420p" -c:v libx264 -r 30 -y ${outputVideo}`;

    return new Promise((resolve, reject) =>
      exec(ffmpegCommand, (error) => {
        fs.unlinkSync(listFile);
        frameFiles.forEach((file) => fs.unlinkSync(file));
        if (error) reject(err);
        const buffer = fs.readFileSync(outputVideo);
        fs.unlinkSync(outputVideo);
        resolve(buffer);
      }),
    );
  }

  const frameFiles = generateFrames(text);
  return createVideoFromFrames(frameFiles);
};

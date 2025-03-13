const { createCanvas } = require("canvas");

module.exports = (text, opts) => {
  const width = opts?.width || 600;
  const height = opts?.height || 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Fungsi membagi teks menjadi maksimal dua kata per baris
  function splitTextIntoLines(text) {
    const words = text.split(" ");
    let lines = [];

    for (let i = 0; i < words.length; i += 2) {
      let line = words[i];
      if (i + 1 < words.length) {
        line += " " + words[i + 1];
      }
      lines.push(line);
    }

    return lines;
  }

  // Fungsi mendapatkan ukuran font maksimal berdasarkan width
  function getMaxFontSize(ctx, lines, maxWidth) {
    let fontSize = Math.floor(width * 0.2); // Mulai dari 20% width
    ctx.font = `${fontSize}px Arial`;

    // Cek apakah ada baris yang melebihi lebar maksimal
    while (
      lines.some((line) => ctx.measureText(line).width > maxWidth) &&
      fontSize > 10
    ) {
      fontSize--; // Kurangi jika terlalu lebar
      ctx.font = `${fontSize}px Arial`;
    }

    return fontSize;
  }

  // Fungsi menggambar teks dengan ukuran font mengikuti lebar & posisinya terpusat
  function drawCenteredText(ctx, text, x, y) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
  }

  // Fungsi utama menggambar teks ke dalam canvas
  function drawTextOnCanvas(text) {
    // Latar belakang putih
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);

    // Warna teks hitam
    ctx.fillStyle = "#000";

    // Hitung batas maksimal lebar teks (dengan sedikit padding)
    let maxWidth = width * 0.9;

    // Membagi teks menjadi beberapa baris dengan maksimal 2 kata per baris
    let lines = splitTextIntoLines(text);
    let centerX = width / 2;

    // Tentukan ukuran font yang optimal untuk semua baris
    let fontSize = getMaxFontSize(ctx, lines, maxWidth);
    ctx.font = `${fontSize}px Arial`;

    let textHeight = fontSize * 1; // Tinggi teks termasuk spasi antar baris
    let totalHeight = lines.length * textHeight;
    let startY = (height - totalHeight) / 2 + textHeight / 2; // Pusatkan vertikal

    // Gambar setiap baris
    lines.forEach((line, index) => {
      drawCenteredText(ctx, line, centerX, startY + index * textHeight);
    });

    return canvas.toBuffer("image/png");
  }

  return new Promise((resolve) => {
    const buffer = drawTextOnCanvas(text);
    resolve(buffer);
  });
};

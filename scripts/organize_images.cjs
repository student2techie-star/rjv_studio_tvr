const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'src', 'assets', 'images');

const mappings = [
  // Anniversary / Weddings
  { src: 'WhatsApp Image 2026-09-12 at 11.56.42 PM (1).jpeg', dest: 'weddings/anniversary-01.jpg' },
  { src: 'WhatsApp Image 2026-09-12 at 11.56.42 PM (2).jpeg', dest: 'weddings/anniversary-02.jpg' },
  { src: 'WhatsApp Image 2026-09-12 at 11.56.43 PM.jpeg', dest: 'weddings/anniversary-04.jpg' },

  // Maternity & Baby / Kids
  { src: 'WhatsApp Image 2026-09-12 at 11.56.29 PM.jpeg', dest: 'kids/maternity-01.jpg' },
  { src: 'WhatsApp Image 2026-09-12 at 11.56.30 PM.jpeg', dest: 'kids/maternity-02.jpg' },
  { src: 'WhatsApp Image 2026-09-12 at 11.56.30 PM (1).jpeg', dest: 'kids/maternity-03.jpg' },
  { src: 'WhatsApp Image 2026-09-12 at 11.56.31 PM.jpeg', dest: 'kids/maternity-04.jpg' },
  { src: 'WhatsApp Image 2026-09-12 at 11.56.35 PM.jpeg', dest: 'kids/maternity-05.jpg' },
  { src: 'WhatsApp Image 2026-09-12 at 11.56.36 PM (1).jpeg', dest: 'kids/maternity-06.jpg' },
  { src: 'WhatsApp Image 2026-09-12 at 11.56.36 PM (2).jpeg', dest: 'kids/maternity-07.jpg' },
  { src: 'WhatsApp Image 2026-09-12 at 11.56.37 PM.jpeg', dest: 'kids/maternity-08.jpg' },

  { src: 'WhatsApp Image 2026-09-12 at 11.56.32 PM.jpeg', dest: 'kids/babyshoot-03.jpg' },
  { src: 'WhatsApp Image 2026-09-12 at 11.56.36 PM.jpeg', dest: 'kids/babyshoot-04.jpg' },
  { src: 'WhatsApp Image 2026-09-12 at 11.56.37 PM (1).jpeg', dest: 'kids/babyshoot-murugan.jpg' },
  { src: 'WhatsApp Image 2026-09-12 at 11.56.41 PM.jpeg', dest: 'kids/babyshoot-05.jpg' },
  { src: 'WhatsApp Image 2026-09-12 at 11.56.42 PM.jpeg', dest: 'kids/babyshoot-bubbles.jpg' },

  // Portraits & Ceremonies
  { src: 'WhatsApp Image 2026-09-12 at 11.56.38 PM.jpeg', dest: 'portraits/bridal-red.jpg' },
  { src: 'WhatsApp Image 2026-09-12 at 11.56.38 PM (1).jpeg', dest: 'ceremonies/thali-macro.jpg' },
  { src: 'WhatsApp Image 2026-09-12 at 11.56.38 PM (2).jpeg', dest: 'portraits/bridal-purple.jpg' },
  { src: 'WhatsApp Image 2026-09-12 at 11.56.39 PM.jpeg', dest: 'portraits/couple-studio.jpg' },
  { src: 'WhatsApp Image 2026-09-12 at 11.56.39 PM (1).jpeg', dest: 'portraits/bridal-green.jpg' },
];

mappings.forEach(({ src, dest }) => {
  const srcPath = path.join(baseDir, src);
  const destPath = path.join(baseDir, dest);
  const destDir = path.dirname(destPath);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} -> ${dest}`);
  } else {
    console.warn(`Source file not found: ${srcPath}`);
  }
});

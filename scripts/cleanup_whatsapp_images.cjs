const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'src', 'assets', 'images');

fs.readdirSync(targetDir).forEach((file) => {
  if (file.startsWith('WhatsApp Image')) {
    const filePath = path.join(targetDir, file);
    fs.unlinkSync(filePath);
    console.log(`Removed raw image: ${file}`);
  }
});

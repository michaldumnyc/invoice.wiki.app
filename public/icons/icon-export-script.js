// Script to convert SVG to PNG icons
// This is a Node.js script that uses the 'sharp' library to convert SVG to PNG
// To use this script:
// 1. Install sharp: npm install sharp
// 2. Run this script: node icon-export-script.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Path to the SVG icon
const svgPath = path.join(__dirname, 'icon-generator.svg');
const svgBuffer = fs.readFileSync(svgPath);

// Generate icons of different sizes
const sizes = [192, 512];

async function generateIcons() {
  try {
    for (const size of sizes) {
      const outputPath = path.join(__dirname, `icon-${size}x${size}.png`);
      
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`Generated: icon-${size}x${size}.png`);
    }
    
    // Also generate apple-touch-icon
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(__dirname, 'apple-touch-icon.png'));
    
    console.log(`Generated: apple-touch-icon.png`);
    
    // Generate favicon (16x16)
    await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toFile(path.join(__dirname, '../favicon.ico'));
    
    console.log(`Generated: favicon.ico`);
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons(); 
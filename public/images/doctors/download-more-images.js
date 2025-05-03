const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

// Define more image sources - using different reliable sources for diversity
const images = [
  {
    url: 'https://img.freepik.com/free-photo/portrait-doctor_144627-39390.jpg',
    filename: 'doctor9.jpg',
    description: 'Female doctor with glasses'
  },
  {
    url: 'https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg',
    filename: 'doctor10.jpg',
    description: 'Smiling male doctor with beard'
  },
  {
    url: 'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg',
    filename: 'doctor11.jpg',
    description: 'Female doctor in hospital'
  },
  {
    url: 'https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg',
    filename: 'doctor12.jpg',
    description: 'Male doctor with stethoscope'
  },
  {
    url: 'https://img.freepik.com/free-photo/attractive-young-female-doctor-with-clipboard-white_1301-7807.jpg',
    filename: 'doctor13.jpg',
    description: 'Young female doctor with clipboard'
  },
  {
    url: 'https://img.freepik.com/free-photo/male-doctor-standing-with-arms-crossed-white-coat_114579-14874.jpg',
    filename: 'doctor14.jpg',
    description: 'Male doctor with arms crossed'
  },
  {
    url: 'https://img.freepik.com/free-photo/female-doctor-hospital_23-2148827775.jpg',
    filename: 'doctor15.jpg',
    description: 'Female doctor in hospital corridor'
  }
];

function downloadImage(imageConfig) {
  return new Promise((resolve, reject) => {
    const { url, filename, description } = imageConfig;
    const filePath = path.join(__dirname, filename);
    
    // Determine if we need http or https
    const requester = url.startsWith('https') ? https : http;
    
    const request = requester.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const newUrl = response.headers.location;
        console.log(`Redirecting to ${newUrl}`);
        imageConfig.url = newUrl;
        downloadImage(imageConfig).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: Status code ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        // Check if the file size is reasonable
        const stats = fs.statSync(filePath);
        if (stats.size < 1000) { // Less than 1KB is probably an error
          fs.unlinkSync(filePath); // Delete the file
          reject(new Error(`Downloaded file ${filename} is too small (${stats.size} bytes), likely an error`));
          return;
        }
        console.log(`Successfully downloaded ${filename} - ${description} (${stats.size} bytes)`);
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete the file if there's an error
        reject(err);
      });
    });
    
    request.on('error', (err) => {
      reject(new Error(`Request error for ${filename}: ${err.message}`));
    });
    
    // Set a timeout
    request.setTimeout(30000, () => {
      request.abort();
      reject(new Error(`Request timeout for ${filename}`));
    });
  });
}

async function downloadAllImages() {
  console.log('Starting download of additional doctor images...');
  
  for (const image of images) {
    try {
      await downloadImage(image);
      // Add a delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(error.message);
    }
  }
  
  console.log('All downloads completed!');
}

downloadAllImages();

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

// Define image sources with transparent backgrounds
const images = [
  {
    url: 'https://www.freepnglogos.com/uploads/doctor-png/doctor-bulk-billing-doctors-chapel-hill-health-care-medical-3.png',
    filename: 'doctor-transparent1.png',
    description: 'Male doctor with transparent background'
  },
  {
    url: 'https://www.freepnglogos.com/uploads/doctor-png/doctor-png-transparent-doctor-images-pluspng-10.png',
    filename: 'doctor-transparent2.png',
    description: 'Female doctor with transparent background'
  },
  {
    url: 'https://www.freepnglogos.com/uploads/doctor-png/png-woman-doctor-transparent-woman-doctor-images-5.png',
    filename: 'doctor-transparent3.png',
    description: 'Female doctor with stethoscope transparent background'
  },
  {
    url: 'https://www.freepnglogos.com/uploads/doctor-png/doctor-png-transparent-images-download-clip-14.png',
    filename: 'doctor-transparent4.png',
    description: 'Male doctor with arms crossed transparent background'
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
  console.log('Starting download of transparent doctor images...');
  
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

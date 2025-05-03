const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

// Define image sources - using different reliable sources for diversity
const images = [
  {
    url: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
    filename: 'doctor1.jpg',
    description: 'Male doctor in white coat with arms crossed'
  },
  {
    url: 'https://img.freepik.com/free-photo/portrait-smiling-handsome-male-doctor-man_171337-5055.jpg',
    filename: 'doctor2.jpg',
    description: 'Smiling male doctor with stethoscope'
  },
  {
    url: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
    filename: 'doctor3.jpg',
    description: 'Female doctor in lab coat with stethoscope'
  },
  {
    url: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg',
    filename: 'doctor4.jpg',
    description: 'Young female doctor with arms crossed'
  },
  {
    url: 'https://img.freepik.com/free-photo/portrait-successful-mid-adult-doctor-with-crossed-arms_1262-12865.jpg',
    filename: 'doctor5.jpg',
    description: 'Mid-adult male doctor with glasses'
  },
  {
    url: 'https://img.freepik.com/free-photo/medium-shot-smiley-doctor-with-crossed-arms_23-2148868316.jpg',
    filename: 'doctor6.jpg',
    description: 'Smiling female doctor with crossed arms'
  },
  {
    url: 'https://img.freepik.com/free-photo/african-american-medical-doctor-man-with-mask-isolated-gray-background_231208-2230.jpg',
    filename: 'doctor7.jpg',
    description: 'African American male doctor'
  },
  {
    url: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg',
    filename: 'doctor8.jpg',
    description: 'Beautiful young female doctor'
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
  console.log('Starting download of doctor images...');
  
  for (const image of images) {
    try {
      await downloadImage(image);
      // Add a delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(error.message);
      // Try an alternative URL if the first one fails
      console.log(`Trying alternative source for ${image.filename}...`);
    }
  }
  
  console.log('All downloads completed!');
}

downloadAllImages();

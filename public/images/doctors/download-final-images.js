const https = require('https');
const fs = require('fs');
const path = require('path');

// Array of reliable doctor image URLs from Unsplash
const doctorImages = [
  {
    url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800&q=80',
    filename: 'doctor1.jpg',
    description: 'Male doctor with arms crossed'
  },
  {
    url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800&q=80',
    filename: 'doctor2.jpg',
    description: 'Male doctor in white coat'
  },
  {
    url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800&q=80',
    filename: 'doctor3.jpg',
    description: 'Female doctor with stethoscope'
  },
  {
    url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800&q=80',
    filename: 'doctor4.jpg',
    description: 'Female doctor smiling'
  },
  {
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800&q=80',
    filename: 'doctor5.jpg',
    description: 'Male doctor with glasses'
  },
  {
    url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800&q=80',
    filename: 'doctor6.jpg',
    description: 'Female doctor in surgical mask'
  },
  {
    url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800&q=80',
    filename: 'doctor7.jpg',
    description: 'Male doctor in consultation'
  },
  {
    url: 'https://images.unsplash.com/photo-1642391326625-0f8e5e4e3d1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800&q=80',
    filename: 'doctor8.jpg',
    description: 'Female doctor with tablet'
  }
];

// Function to download an image
function downloadImage(imageObj) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, imageObj.filename);
    const file = fs.createWriteStream(filePath);

    https.get(imageObj.url, response => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${imageObj.filename} - ${imageObj.description}`);
        resolve();
      });
    }).on('error', err => {
      fs.unlink(filePath, () => {}); // Delete the file if there's an error
      console.error(`Error downloading ${imageObj.filename}: ${err.message}`);
      reject(err);
    });
  });
}

// Download all images sequentially
async function downloadAllImages() {
  console.log('Starting download of doctor images...');
  
  for (const imageObj of doctorImages) {
    try {
      await downloadImage(imageObj);
      // Add a small delay between downloads to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed to download ${imageObj.filename}: ${error.message}`);
    }
  }
  
  console.log('All downloads completed!');
}

downloadAllImages();

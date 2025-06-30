// Admin service for fetching movie data directly from localStorage (admin panel)

// Default movie images by genre
const defaultMovieImages = {
  'Action': [
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497124401559-3e75ec2ed794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'Comedy': [
    'https://images.unsplash.com/photo-1543584756-31dc0e74f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1528495612343-9ca9f4a9f67c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1543418219-44e30b057fea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'Drama': [
    'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581822261290-991b38693d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'Horror': [
    'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555354921-a3fb5af6a177?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509248961158-e54f6934749c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'Sci-Fi': [
    'https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'Thriller': [
    'https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1604631806268-79e1e3a0a261?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'default': [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512070679279-8988d32161be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ]
};

// Default backdrop images by genre (wider format for hero sections)
const defaultBackdropImages = {
  'Action': [
    'https://images.unsplash.com/photo-1549221306-9e1a7de9e4e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1559125148-415a1dfb53c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1598899246709-c8273815f5ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  ],
  'Comedy': [
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  ],
  'Drama': [
    'https://images.unsplash.com/photo-1532800783378-1bed60adaf58?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1493804714600-6edb1cd93080?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  ],
  'Horror': [
    'https://images.unsplash.com/photo-1533923156502-be31530547c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1476900543704-4312b78632f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  ],
  'Sci-Fi': [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  ],
  'Thriller': [
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1504376379689-8d54347b26c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  ],
  'default': [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  ]
};

// Gallery images for movie details by theme
const galleryImagesByTheme = {
  // Action movie themes
  'superhero': [
    'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535443274868-756b0f070b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'spy': [
    'https://images.unsplash.com/photo-1568277556340-f16eeab7f552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504376379689-8d54347b26c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'war': [
    'https://images.unsplash.com/photo-1547483238-2cbf88a68efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580130732478-4e339fb6836f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  
  // Sci-Fi themes
  'space': [
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581822261290-991b38693d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'future': [
    'https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'robot': [
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  
  // Drama themes
  'family': [
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'romance': [
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1537261131936-3cdff36a1ac9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'historical': [
    'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563804447971-6e113ab80713?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1577083552431-6e5fd01aa1b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ]
};

// Generic gallery images for any movie
const genericGalleryImages = [
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1559125148-415a1dfb53c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1594908900066-3f47337549d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1585951237313-1979e4df7385?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
];

// Movie title keywords to themes mapping
const movieKeywordsToThemes = {
  // Action keywords
  'avenger': 'superhero',
  'hero': 'superhero',
  'marvel': 'superhero',
  'batman': 'superhero',
  'superman': 'superhero',
  'wonder': 'superhero',
  'captain': 'superhero',
  'mission': 'spy',
  'spy': 'spy',
  'agent': 'spy',
  'bond': 'spy',
  'bourne': 'spy',
  'war': 'war',
  'soldier': 'war',
  'battle': 'war',
  'army': 'war',
  
  // Sci-Fi keywords
  'star': 'space',
  'space': 'space',
  'galaxy': 'space',
  'planet': 'space',
  'alien': 'space',
  'future': 'future',
  'cyber': 'future',
  'tech': 'future',
  'robot': 'robot',
  'android': 'robot',
  'machine': 'robot',
  'ai': 'robot',
  
  // Drama keywords
  'family': 'family',
  'father': 'family',
  'mother': 'family',
  'son': 'family',
  'daughter': 'family',
  'love': 'romance',
  'romance': 'romance',
  'wedding': 'romance',
  'relationship': 'romance',
  'history': 'historical',
  'king': 'historical',
  'queen': 'historical',
  'century': 'historical',
  'ancient': 'historical'
};

// Title-specific movie poster images
const titleSpecificPosters = {
  'interstellar': [
    'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1543722530-d2c3201371e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'inception': [
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1500417148159-68083bd7333a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504333638930-c8787321eee0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'avatar': [
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'avengers': [
    'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535443274868-756b0f070b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'titanic': [
    'https://images.unsplash.com/photo-1582779898239-cdc53c2a6e08?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551781066-15814a3496e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'star wars': [
    'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546561892-65bf811416b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'jurassic': [
    'https://images.unsplash.com/photo-1569053956329-bf9f6d5afa84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1569053956329-bf9f6d5afa84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1569053956329-bf9f6d5afa84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'matrix': [
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'lord of the rings': [
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  'harry potter': [
    'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1479740030693-66ad10f3a7b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ]
};

// Title-specific movie backdrop images
const titleSpecificBackdrops = {
  'interstellar': [
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  ],
  'inception': [
    'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1520034475321-cbe63696469a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  ],
  'avatar': [
    'https://images.unsplash.com/photo-1518050947974-4be8c7469f0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  ],
  'avengers': [
    'https://images.unsplash.com/photo-1556707752-481d500a2c58?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  ]
};

// Helper function to get title-specific image
const getTitleSpecificImage = (movie, imageType = 'poster') => {
  if (!movie.title) return null;
  
  const title = movie.title.toLowerCase();
  const collection = imageType === 'poster' ? titleSpecificPosters : titleSpecificBackdrops;
  
  // Check if any part of the title matches our specific image collections
  for (const [keyword, images] of Object.entries(collection)) {
    if (title.includes(keyword)) {
      // Return a random image from the collection
      return images[Math.floor(Math.random() * images.length)];
    }
  }
  
  return null;
};

// Helper function to determine movie theme based on title
const getMovieTheme = (movie) => {
  if (!movie.title) return null;
  
  const title = movie.title.toLowerCase();
  
  // Check if any keywords in the title match our theme mapping
  for (const [keyword, theme] of Object.entries(movieKeywordsToThemes)) {
    if (title.includes(keyword)) {
      return theme;
    }
  }
  
  // If no specific theme found, return null to use genre-based images
  return null;
};

// Helper function to add images to movies if they don't have one
const addImagesToMovies = (movies) => {
  return movies.map((movie, index) => {
    let updatedMovie = { ...movie };
    
    // Try to determine a specific theme for this movie
    const movieTheme = getMovieTheme(updatedMovie);
    
    // Add poster image if not present
    if (!updatedMovie.poster || updatedMovie.poster === '') {
      // First try to get a title-specific poster
      const titleSpecificPoster = getTitleSpecificImage(updatedMovie, 'poster');
      if (titleSpecificPoster) {
        updatedMovie.poster = titleSpecificPoster;
      } else {
        // Fall back to genre-based poster
        const genreImages = defaultMovieImages[updatedMovie.genre] || defaultMovieImages['default'];
        const imageIndex = index % genreImages.length;
        updatedMovie.poster = genreImages[imageIndex];
      }
    }
    
    // Add backdrop image if not present
    if (!updatedMovie.backdrop || updatedMovie.backdrop === '') {
      // First try to get a title-specific backdrop
      const titleSpecificBackdrop = getTitleSpecificImage(updatedMovie, 'backdrop');
      if (titleSpecificBackdrop) {
        updatedMovie.backdrop = titleSpecificBackdrop;
      } else {
        // Fall back to genre-based backdrop
        const backdropImages = defaultBackdropImages[updatedMovie.genre] || defaultBackdropImages['default'];
        const backdropIndex = index % backdropImages.length;
        updatedMovie.backdrop = backdropImages[backdropIndex];
      }
    }
    
    // Add gallery images if not present
    if (!updatedMovie.gallery || !Array.isArray(updatedMovie.gallery) || updatedMovie.gallery.length === 0) {
      // If we have a specific theme for this movie, use those images
      if (movieTheme && galleryImagesByTheme[movieTheme]) {
        updatedMovie.gallery = [...galleryImagesByTheme[movieTheme]];
      } else {
        // Otherwise use generic gallery images
        const shuffledGallery = [...genericGalleryImages].sort(() => 0.5 - Math.random());
        updatedMovie.gallery = shuffledGallery.slice(0, 4); // Take 4 random gallery images
      }
    }
    
    // Add related images for the movie detail page
    if (!updatedMovie.relatedImages || !Array.isArray(updatedMovie.relatedImages) || updatedMovie.relatedImages.length === 0) {
      // Combine images from theme and genre for more variety
      let relatedImagePool = [];
      
      // Add theme-specific images if available
      if (movieTheme && galleryImagesByTheme[movieTheme]) {
        relatedImagePool = [...relatedImagePool, ...galleryImagesByTheme[movieTheme]];
      }
      
      // Add genre-specific images
      if (updatedMovie.genre && defaultMovieImages[updatedMovie.genre]) {
        relatedImagePool = [...relatedImagePool, ...defaultMovieImages[updatedMovie.genre]];
      }
      
      // Add some generic images if we don't have enough
      if (relatedImagePool.length < 6) {
        relatedImagePool = [...relatedImagePool, ...genericGalleryImages];
      }
      
      // Shuffle and take 6 unique images
      const shuffledRelated = [...new Set(relatedImagePool)].sort(() => 0.5 - Math.random());
      updatedMovie.relatedImages = shuffledRelated.slice(0, 6);
    }
    
    return updatedMovie;
  });
};

// Fetch featured movies from admin localStorage
export const fetchFeaturedMoviesFromAdmin = () => {
  try {
    const moviesData = localStorage.getItem('movies');
    if (!moviesData) {
      return [];
    }
    
    const allMovies = JSON.parse(moviesData);
    // Featured movies are those with status 'active' or 'Now Showing' and highest ratings
    const featuredMovies = allMovies
      .filter(movie => movie.status === 'active' || movie.status === 'Now Showing')
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);
      
    return addImagesToMovies(featuredMovies);
  } catch (error) {
    console.error('Error fetching featured movies from admin:', error);
    return [];
  }
};

// Fetch latest/now playing movies from admin localStorage
export const fetchLatestMoviesFromAdmin = () => {
  try {
    const moviesData = localStorage.getItem('movies');
    if (!moviesData) {
      return [];
    }
    
    const allMovies = JSON.parse(moviesData);
    // Latest movies are those with status 'active' or 'Now Showing'
    const latestMovies = allMovies
      .filter(movie => movie.status === 'active' || movie.status === 'Now Showing')
      .slice(0, 4);
      
    return addImagesToMovies(latestMovies);
  } catch (error) {
    console.error('Error fetching latest movies from admin:', error);
    return [];
  }
};

// Fetch coming soon movies from admin localStorage
export const fetchComingSoonMoviesFromAdmin = () => {
  try {
    const moviesData = localStorage.getItem('movies');
    if (!moviesData) {
      return [];
    }
    
    const allMovies = JSON.parse(moviesData);
    // Coming soon movies are those with status 'upcoming' or 'Coming Soon'
    const comingSoonMovies = allMovies
      .filter(movie => movie.status === 'upcoming' || movie.status === 'Coming Soon')
      .slice(0, 4);
      
    return addImagesToMovies(comingSoonMovies);
  } catch (error) {
    console.error('Error fetching coming soon movies from admin:', error);
    return [];
  }
};

// Fetch all movies from admin localStorage
export const fetchAllMoviesFromAdmin = () => {
  try {
    const moviesData = localStorage.getItem('movies');
    if (!moviesData) {
      return [];
    }
    
    const allMovies = JSON.parse(moviesData);
    return addImagesToMovies(allMovies);
  } catch (error) {
    console.error('Error fetching all movies from admin:', error);
    return [];
  }
};

// Update a movie in localStorage
export const updateMovieInAdmin = (movieId, updates) => {
  try {
    const moviesData = localStorage.getItem('movies');
    if (!moviesData) {
      return false;
    }
    
    const allMovies = JSON.parse(moviesData);
    const movieIndex = allMovies.findIndex(movie => movie.id === parseInt(movieId));
    
    if (movieIndex === -1) {
      return false;
    }
    
    // Update the movie with the provided updates
    allMovies[movieIndex] = {
      ...allMovies[movieIndex],
      ...updates
    };
    
    // Save the updated movies back to localStorage
    localStorage.setItem('movies', JSON.stringify(allMovies));
    return true;
  } catch (error) {
    console.error(`Error updating movie with ID ${movieId}:`, error);
    return false;
  }
};

// Add a trailer to a specific movie
export const addTrailerToMovie = (movieId, trailer) => {
  try {
    const moviesData = localStorage.getItem('movies');
    if (!moviesData) {
      return false;
    }
    
    const allMovies = JSON.parse(moviesData);
    const movieIndex = allMovies.findIndex(movie => movie.id === parseInt(movieId));
    
    if (movieIndex === -1) {
      return false;
    }
    
    // Get current movie
    const movie = allMovies[movieIndex];
    
    // Initialize trailers array if it doesn't exist
    if (!movie.trailers || !Array.isArray(movie.trailers)) {
      movie.trailers = [];
    }
    
    // Add the new trailer
    movie.trailers.push(trailer);
    
    // Save the updated movies back to localStorage
    localStorage.setItem('movies', JSON.stringify(allMovies));
    return true;
  } catch (error) {
    console.error(`Error adding trailer to movie with ID ${movieId}:`, error);
    return false;
  }
};

// Export the addImagesToMovies function so it can be imported elsewhere
export { addImagesToMovies };

// Fetch a single movie by ID from admin localStorage
export const fetchMovieByIdFromAdmin = (id) => {
  try {
    const moviesData = localStorage.getItem('movies');
    if (!moviesData) {
      return null;
    }
    
    const allMovies = JSON.parse(moviesData);
    const movie = allMovies.find(movie => movie.id === parseInt(id)) || null;
    
    if (movie) {
      let updatedMovie = { ...movie };
      
      // Try to determine a specific theme for this movie
      const movieTheme = getMovieTheme(updatedMovie);
      
      // Use imageUrl from admin panel if available
      if (updatedMovie.imageUrl) {
        updatedMovie.poster = updatedMovie.imageUrl;
      }
      // Add poster image if not present
      else if (!updatedMovie.poster || updatedMovie.poster === '') {
        const genreImages = defaultMovieImages[updatedMovie.genre] || defaultMovieImages['default'];
        const imageIndex = updatedMovie.id % genreImages.length;
        updatedMovie.poster = genreImages[imageIndex];
      }
      
      // Use imageUrl from admin panel for backdrop if available
      if (updatedMovie.imageUrl) {
        updatedMovie.backdrop = updatedMovie.imageUrl;
      }
      // Add backdrop image if not present
      else if (!updatedMovie.backdrop || updatedMovie.backdrop === '') {
        const backdropImages = defaultBackdropImages[updatedMovie.genre] || defaultBackdropImages['default'];
        const backdropIndex = updatedMovie.id % backdropImages.length;
        updatedMovie.backdrop = backdropImages[backdropIndex];
      }
      
      // Add gallery images if not present
      if (!updatedMovie.gallery || !Array.isArray(updatedMovie.gallery) || updatedMovie.gallery.length === 0) {
        // If we have a specific theme for this movie, use those images
        if (movieTheme && galleryImagesByTheme[movieTheme]) {
          updatedMovie.gallery = [...galleryImagesByTheme[movieTheme]];
        } else {
          // Otherwise use generic gallery images
          const shuffledGallery = [...genericGalleryImages].sort(() => 0.5 - Math.random());
          updatedMovie.gallery = shuffledGallery.slice(0, 4);
        }
      }
      
      // Movie genre to trailer mapping
      const genreTrailers = {
        'action': [
          { embedId: 'qSqVVswa420', title: 'Action Movie Trailer', description: 'High-octane action sequence', duration: '2:15' },
          { embedId: 'ue80QwXMRHg', title: 'Action Teaser', description: 'Explosive preview', duration: '1:30' }
        ],
        'comedy': [
          { embedId: 'XGQevaXj3tQ', title: 'Comedy Film Trailer', description: 'Hilarious moments', duration: '2:20' },
          { embedId: 'zCeQJP-vCog', title: 'Comedy Teaser', description: 'Laugh-out-loud preview', duration: '1:45' }
        ],
        'drama': [
          { embedId: 'KAOdjqyG37A', title: 'Drama Film Trailer', description: 'Emotional journey', duration: '2:45' },
          { embedId: 'zSWdZVtXT7E', title: 'Drama Teaser', description: 'Powerful moments', duration: '1:55' }
        ],
        'horror': [
          { embedId: 'xhJ5P7Up3jA', title: 'Horror Film Trailer', description: 'Terrifying scenes', duration: '2:10' },
          { embedId: 'AlugldzO9zY', title: 'Horror Teaser', description: 'Spine-chilling preview', duration: '1:40' }
        ],
        'sci-fi': [
          { embedId: 'gCcx85zbxz4', title: 'Sci-Fi Film Trailer', description: 'Futuristic adventure', duration: '2:30' },
          { embedId: 'LbfMDwc4azU', title: 'Sci-Fi Teaser', description: 'Space exploration preview', duration: '1:50' }
        ],
        'thriller': [
          { embedId: '5iaYLCiq5RM', title: 'Thriller Film Trailer', description: 'Suspenseful moments', duration: '2:25' },
          { embedId: 'YF1eYbeBPs8', title: 'Thriller Teaser', description: 'Edge-of-your-seat preview', duration: '1:35' }
        ],
        'default': [
          { embedId: 'dQw4w9WgXcQ', title: 'Official Trailer', description: 'Watch the official trailer', duration: '2:30' },
          { embedId: 'dQw4w9WgXcQ', title: 'Teaser Trailer', description: 'A glimpse of what\'s to come', duration: '1:45' }
        ]
      };

      // Movie theme to trailer mapping
      const themeTrailers = {
        'superhero': [
          { embedId: 'TcMBFSGVi1c', title: 'Superhero Film Trailer', description: 'Epic superhero adventure', duration: '2:40' },
          { embedId: '6ZfuNTqbHE8', title: 'Superhero Teaser', description: 'Heroes unite', duration: '1:55' }
        ],
        'spy': [
          { embedId: 'U9FPqF6_Ops', title: 'Spy Film Trailer', description: 'International espionage', duration: '2:35' },
          { embedId: 'DUd5RPVDjPY', title: 'Spy Teaser', description: 'Covert operations', duration: '1:40' }
        ],
        'space': [
          { embedId: 'zSWdZVtXT7E', title: 'Space Adventure Trailer', description: 'Interstellar journey', duration: '2:50' },
          { embedId: 'KAOdjqyG37A', title: 'Space Teaser', description: 'Cosmic exploration', duration: '1:45' }
        ],
        'romance': [
          { embedId: 'FUS_Q7FsfqU', title: 'Romance Film Trailer', description: 'Love story', duration: '2:20' },
          { embedId: 'SsJvkJC2Jv0', title: 'Romance Teaser', description: 'Heartwarming moments', duration: '1:35' }
        ]
      };

      // Use trailer from admin panel if available
      if (updatedMovie.trailerUrl) {
        // Create a trailer object from the uploaded trailer
        if (!updatedMovie.trailers || !Array.isArray(updatedMovie.trailers)) {
          updatedMovie.trailers = [];
        }
        
        // Check if we already have this trailer in the array
        const trailerExists = updatedMovie.trailers.some(trailer => 
          trailer.url === updatedMovie.trailerUrl || 
          trailer.title === `${updatedMovie.title} - Official Trailer`
        );
        
        // If not, add it to the beginning of the array
        if (!trailerExists) {
          updatedMovie.trailers.unshift({
            title: `${updatedMovie.title} - Official Trailer`,
            url: updatedMovie.trailerUrl,
            description: `Official trailer for ${updatedMovie.title}`,
            duration: '2:30'
          });
        }
      }
      
      // Add default trailers if not present
      if (!updatedMovie.trailers || !Array.isArray(updatedMovie.trailers) || updatedMovie.trailers.length === 0) {
        // Determine which trailers to use based on movie theme or genre
        const movieTheme = getMovieTheme(updatedMovie);
        let trailerSet;
        
        if (movieTheme && themeTrailers[movieTheme]) {
          // Use theme-specific trailers if available
          trailerSet = themeTrailers[movieTheme];
        } else if (updatedMovie.genre && genreTrailers[updatedMovie.genre.toLowerCase()]) {
          // Otherwise use genre-specific trailers
          trailerSet = genreTrailers[updatedMovie.genre.toLowerCase()];
        } else {
          // Fallback to default trailers
          trailerSet = genreTrailers['default'];
        }
        
        // Create trailer objects with movie-specific titles
        const trailers = trailerSet.map((trailer, index) => ({
          title: index === 0 
            ? `${updatedMovie.title} - ${trailer.title}` 
            : `${updatedMovie.title} - ${trailer.title}`,
          url: `https://www.youtube.com/embed/${trailer.embedId}`,
          description: `${trailer.description} for ${updatedMovie.title}`,
          duration: trailer.duration
        }));
        
        // Add a behind-the-scenes trailer for highly rated movies
        if (updatedMovie.rating && updatedMovie.rating >= 4) {
          trailers.push({
            title: `${updatedMovie.title} - Behind The Scenes`,
            url: 'https://www.youtube.com/embed/GO6qs83CHpc',
            description: `Go behind the scenes of ${updatedMovie.title} and discover how this amazing film was made.`,
            duration: '4:15'
          });
        }
        
        updatedMovie.trailers = trailers;
      }
      
      // Add related images for the movie detail page
      if (!updatedMovie.relatedImages || !Array.isArray(updatedMovie.relatedImages) || updatedMovie.relatedImages.length === 0) {
        // Combine images from theme and genre for more variety
        let relatedImagePool = [];
        
        // Add theme-specific images if available
        if (movieTheme && galleryImagesByTheme[movieTheme]) {
          relatedImagePool = [...relatedImagePool, ...galleryImagesByTheme[movieTheme]];
        }
        
        // Add genre-specific images
        if (updatedMovie.genre && defaultMovieImages[updatedMovie.genre]) {
          relatedImagePool = [...relatedImagePool, ...defaultMovieImages[updatedMovie.genre]];
        }
        
        // Add some generic images if we don't have enough
        if (relatedImagePool.length < 6) {
          relatedImagePool = [...relatedImagePool, ...genericGalleryImages];
        }
        
        // Shuffle and take 6 unique images
        const shuffledRelated = [...new Set(relatedImagePool)].sort(() => 0.5 - Math.random());
        updatedMovie.relatedImages = shuffledRelated.slice(0, 6);
      }
      
      return updatedMovie;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching movie with ID ${id} from admin:`, error);
    return null;
  }
};

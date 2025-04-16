function decodeShortLink(shortCode) {
  try {
    const decoded = atob(shortCode);
    const [userId, token] = decoded.split(':');
    
    // Verify user and token
    if (isValidUser(userId, token)) {
      const userType = getUserType(userId);
      const playlistPath = userType === 'premium' ? 'playlist/premium.m3u' : 'playlist/basic.m3u';
      return playlistPath;
    }
  } catch (error) {
    console.error('Invalid short link');
  }
  return 'playlist/basic.m3u'; // Default to basic playlist if invalid
}

function isValidUser(userId, token) {
  // Add your user validation logic here
  return true; // Placeholder
}

function getUserType(userId) {
  // Add your user type checking logic here
  return 'basic'; // Placeholder
}
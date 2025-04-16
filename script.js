function getUserType() {
  return localStorage.getItem('userType') || 'basic';
}

function checkExpiration() {
  const expiryDate = new Date(localStorage.getItem('expiryDate'));
  const currentDate = new Date();
  
  if (currentDate > expiryDate) {
    localStorage.setItem('userType', 'basic');
    localStorage.removeItem('expiryDate');
    alert('Your premium subscription has expired!');
    return false;
  }
  return true;
}

function generatePlaylistUrl() {
  const userId = localStorage.getItem('userId');
  const userType = getUserType();
  const token = localStorage.getItem('token');
  
  return `${window.location.origin}/api/playlist/${userType}/${userId}/${token}/playlist.m3u`;
}

function displayPlaylistInfo() {
  const playlistUrl = generatePlaylistUrl();
  const container = document.getElementById('playlist-info');
  
  container.innerHTML = `
    <div class="playlist-url-box">
      <h3>Your IPTV Playlist URL</h3>
      <input type="text" value="${playlistUrl}" readonly id="playlist-url" class="form-control">
      <button onclick="copyPlaylistUrl()" class="btn btn-primary mt-2">Copy URL</button>
      <p class="mt-2">Use this URL in your IPTV player application</p>
    </div>
  `;
}

function copyPlaylistUrl() {
  const urlInput = document.getElementById('playlist-url');
  urlInput.select();
  document.execCommand('copy');
  alert('Playlist URL copied to clipboard!');
}

function loadPlaylist() {
  const userType = getUserType();
  
  if (userType === 'premium' && !checkExpiration()) {
    window.location.href = 'login.html';
    return;
  }

  const playlistPath = userType === 'premium' ? 'playlist/premium.m3u' : 'playlist/basic.m3u';

  fetch(playlistPath)
    .then(response => response.text())
    .then(data => {
      const lines = data.split('\n');
      const container = document.getElementById('playlist');
      let title = '';
      
      // Clear existing content
      container.innerHTML = '';

      lines.forEach(line => {
        if (line.startsWith('#EXTINF')) {
          title = line.split(',')[1];
        } else if (line.startsWith('http')) {
          const div = document.createElement('div');
          div.className = 'channel';
          div.innerHTML = `<strong>${title}</strong><br><video src="${line}" controls width="300"></video>`;
          container.appendChild(div);
        }
      });
    })
    .catch(error => {
      console.error('Error loading playlist:', error);
      document.getElementById('playlist').innerHTML = '<p>Error loading playlist. Please try again later.</p>';
    });
}

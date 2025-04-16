function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user === 'admin' && pass === '1234') {
    localStorage.setItem('auth', 'true');
    localStorage.setItem('userType', 'premium');
    
    // Generate unique user ID and token
    const userId = 'USER_' + Math.random().toString(36).substr(2, 9);
    const token = Math.random().toString(36).substr(2, 16);
    
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    
    window.location.href = 'index.html';
  } else {
    alert('Login gagal!');
  }
}

function logout() {
  localStorage.removeItem('auth');
  window.location.href = 'login.html';
}
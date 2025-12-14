const supabaseUrl = 'https://xacucaoofkkgaxbbakei.supabase.co;
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhY3VjYW9vZmtrZ2F4YmJha2VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MjI4NjIsImV4cCI6MjA4MTI5ODg2Mn0.pTLSQcjCeEwFCFoOdnyKyPEaf9rpliZwSzLbf4hBuzg'; 
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

let userId = localStorage.getItem('userId');
if (!userId) window.location.href = "index.html";

async function loadFeed() {
  const { data, error } = await supabase.from('posts').select('*, users(name)').order('timestamp', { ascending: false });
  if (error) return console.error(error);

  const feedDiv = document.getElementById('feed-posts');
  feedDiv.innerHTML = '';
  data.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post card';
    div.innerHTML = `
      <strong>${post.users.name}</strong>
      <p>${post.content}</p>
      ${post.image_url ? `<img src="${post.image_url}" style="max-width:100%;">` : ''}
    `;
    feedDiv.appendChild(div);
  });
}

function goProfile() {
  window.location.href = "profile.html";
}

window.onload = loadFeed;
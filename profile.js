const supabaseUrl = 'https://xacucaoofkkgaxbbakei.supabase.co';
const supabaseKey = 'process.env.SUPABASE_KEY'; 
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

let userId = localStorage.getItem('userId');
if (!userId) window.location.href = "index.html";

async function loadUser() {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
  if (error) return console.error(error);
  document.getElementById('username').textContent = data.name;
  if (data.avatar) document.getElementById('avatar').src = data.avatar;
}

async function createPost() {
  const content = document.getElementById('post-content').value.trim();
  const image = document.getElementById('post-image').value || null;
  if (!content) return alert("ادخل نص المنشور");

  const { data, error } = await supabase.from('posts').insert([{ user_id: userId, content, image_url: image }]);
  if (error) return console.error(error);
  document.getElementById('post-content').value = '';
  document.getElementById('post-image').value = '';
  loadPosts();
}

async function loadPosts() {
  const { data, error } = await supabase.from('posts').select('*').eq('user_id', userId).order('timestamp', { ascending: false });
  if (error) return console.error(error);

  const postsDiv = document.getElementById('posts');
  postsDiv.innerHTML = '';
  data.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post card';
    div.innerHTML = `
      <p>${post.content}</p>
      ${post.image_url ? `<img src="${post.image_url}" style="max-width:100%;">` : ''}
    `;
    postsDiv.appendChild(div);
  });
}

function logout() {
  localStorage.removeItem('userId');
  window.location.href = "index.html";
}

window.onload = async () => {
  await loadUser();
  await loadPosts();
};
// ربط Supabase
const supabaseUrl = 'https://xacucaoofkkgaxbbakei.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhY3VjYW9vZmtrZ2F4YmJha2VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MjI4NjIsImV4cCI6MjA4MTI5ODg2Mn0.pTLSQcjCeEwFCFoOdnyKyPEaf9rpliZwSzLbf4hBuzg';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// التحقق من الجلسة عند فتح الموقع
window.onload = async () => {
  const userId = localStorage.getItem('userId');
  if (userId) window.location.href = "profile.html";
};

// إنشاء مستخدم جديد
async function registerUser() {
  const name = document.getElementById('new-name').value.trim();
  const msg = document.getElementById('register-msg');
  msg.textContent = '';

  if (!name) return msg.textContent = "ادخل اسم مستخدم";

  // تحقق الاسم حصري
  const { data: existing } = await supabase.from('users').select('*').eq('name', name).single();
  if (existing) return msg.textContent = "الاسم مستخدم، اختر اسم آخر";

  // إنشاء مستخدم
  const { data, error } = await supabase.from('users').insert([{ name }]).select().single();
  if (error) return msg.textContent = "حدث خطأ";

  // حفظ ID في localStorage
  localStorage.setItem('userId', data.id);

  // توجه لصفحة Profile
  window.location.href = "profile.html";
}

// تسجيل الدخول
async function loginUser() {
  const name = document.getElementById('login-name').value.trim();
  const msg = document.getElementById('login-msg');
  msg.textContent = '';

  if (!name) return msg.textContent = "ادخل اسم المستخدم";

  const { data, error } = await supabase.from('users').select('*').eq('name', name).single();
  if (error || !data) return msg.textContent = "الاسم غير موجود";

  // حفظ ID في localStorage
  localStorage.setItem('userId', data.id);

  window.location.href = "profile.html";
}
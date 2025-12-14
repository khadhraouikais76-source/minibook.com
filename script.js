// ربط Supabase
const supabaseUrl = 'https://xacucaoofkkgaxbbakei.supabase.co';
const supabaseKey = 'process.env.SUPABASE_KEY'; // استبدله بالمفتاح العام من Supabase
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// التحقق من الجلسة عند فتح الموقع
window.onload = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    // موجود Session → توجه مباشرة للصفحة الشخصية
    window.location.href = "profile.html";
  }
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
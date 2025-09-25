firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();
async function loadHome(){
  try{ const s = await db.collection('settings').doc('site').get(); if(s.exists){ const d=s.data(); document.getElementById('site-title').textContent = d.title || 'Visionary Community'; document.getElementById('site-tag').textContent = d.tagline || ''; } }catch(e){console.log('no settings',e);}
  const posts = await db.collection('posts').orderBy('created_at','desc').limit(6).get();
  const container = document.getElementById('posts');
  if(container){ container.innerHTML=''; posts.forEach(p=>{ const d=p.data(); const el=document.createElement('div'); el.className='post'; el.innerHTML = '<h4>'+escapeHtml(d.title)+'</h4><p>'+escapeHtml(d.content).slice(0,200)+'</p><div class="small">by '+(d.authorName||'anon')+'</div>'; container.appendChild(el); }); }
}
function escapeHtml(s){ if(!s) return ''; return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
document.addEventListener('DOMContentLoaded', loadHome);

firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth(); const db = firebase.firestore();
async function sendMessage(toUid, text){ const from = auth.currentUser; if(!from) return alert('Login'); const threadId = [from.uid, toUid].sort().join('_'); await db.collection('messages').add({thread:threadId,from:from.uid,to:toUid,text,created_at:firebase.firestore.FieldValue.serverTimestamp(),participants:[from.uid,toUid]}); }
async function loadThreads(){ const user = auth.currentUser; if(!user) return; const snap = await db.collection('messages').where('participants','array-contains',user.uid).orderBy('created_at','desc').get(); const el = document.getElementById('threads'); el.innerHTML=''; snap.forEach(d=>{ const m = d.data(); const li = document.createElement('div'); li.textContent = m.text; el.appendChild(li); }); }
document.addEventListener('DOMContentLoaded', ()=>{ firebase.auth().onAuthStateChanged(u=>{ if(u) loadThreads(); }); });

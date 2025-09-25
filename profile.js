// minimal profile loader
firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth(); const db = firebase.firestore();
auth.onAuthStateChanged(async user=>{ if(!user) return; const doc = await db.collection('users').doc(user.uid).get(); const d = doc.data() || {}; document.getElementById('profileArea').innerHTML = '<img src="'+(d.photoURL||'/assets/logo.png')+'" style="width:100px"><h3>'+ (d.displayName||user.email.split('@')[0]) +'</h3><p>'+ (d.bio||'') +'</p>'; });
